import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";

export default NextAuth({
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
          const res = await axios.post("http://localhost:5000/auth/login", {
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
      return session;
    },
    async jwt(token, user, account, profile, isNewUser) {
      return token;
    },
  },

  // A database is optional, but required to persist accounts in a database
  database:
    "mongodb+srv://lof1db:FZmqm5yd3jz4aamk@lof1.lj2wl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",

  jwt: {},
  pages: {
    signIn: "/login",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: null, // If set, new users will be directed here on first sign in
  },
});