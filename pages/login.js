import { getCsrfToken } from "next-auth/client";

const login = ({ csrfToken }) => {
  const handleLogin = async () => {
    const login = await signIn();
    login && redirect("/");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="mb-5">Sign In</h1>
      <section>
        <form
          method="post"
          action="/api/auth/callback/credentials"
          className="flex flex-col justify-center w-full"
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label>
            Username
            <input name="name" type="text" />
          </label>
          <label>
            Password
            <input name="password" type="password" />
          </label>
          <button type="submit" className="mt-5">
            Sign in
          </button>
        </form>
      </section>
    </div>
  );
};

export default login;

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
