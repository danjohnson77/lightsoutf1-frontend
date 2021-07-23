import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";

export default NextAuth({
  pages: {
    verifyRequest: "/verify",
  },
  events: {
    async error(message) {
      console.log("NextAuth Error: ", message);
    },
  },
  session: {
    jwt: true,
  },
  // Configure one or more authentication providers
  providers: [
    // Providers.GitHub({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Username",

      credentials: {
        name: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const res = await axios.post(`${process.env.API_URL}/auth/login`, {
            name: credentials.name,
            password: credentials.password,
          });

          if (res.data.success && res.data.user) {
            return res.data.user;
          }

          return null;
        } catch (error) {
          console.log(error);
        }
      },
    }),
    // ...add more providers here
  ],

  callbacks: {
    async signIn(user, account, profile) {
      // console.log("signIn CB", user, account, profile);
      return true;
    },
    async redirect(url, baseUrl) {
      return baseUrl;
    },
    async session(session, user) {
      session.user = user;
      session.user.id = user.sub;

      return session;
    },
    async jwt(token, user, account, profile, isNewUser) {
      try {
        const currentUser = await axios.post(
          `${process.env.VERCEL_URL}/api/getUser`,
          { id: token.sub }
        );

        token.points = currentUser.data.user.points;

        token.currentPrediction = currentUser.data.user.currentPrediction;

        return token;
      } catch (error) {
        console.log(error);
      }
      return token;
    },
  },

  // A database is optional, but required to persist accounts in a database
  database: process.env.MONGO_URI,

  jwt: {},
  pages: {
    signIn: "/login",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: null, // If set, new users will be directed here on first sign in
  },
});
