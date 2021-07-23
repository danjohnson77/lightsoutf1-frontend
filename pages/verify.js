import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";

const verify = ({ isVerified }) => {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      isVerified && countdown > 0
        ? setCountdown(countdown - 1)
        : router.push("/login");
    }, 1000);
  }, [countdown]);

  return (
    <section className="w-10/12 mx-auto">
      {isVerified ? (
        <div className="flex flex-col min-h-screen justify-center items-center">
          <h1>Thank you for verifying your email</h1>
          <p className="py-5">
            You will be redirected in {countdown} seconds...
          </p>
          <p>
            <Link href="/">Return to home</Link>
          </p>
        </div>
      ) : (
        <div>
          <h1>Your email could not be verified</h1>
          <p>
            Please <Link href="/signup">Register</Link> again
          </p>
        </div>
      )}
    </section>
  );
};

export default verify;

export async function getServerSideProps(context) {
  const result = await axios.post(`${process.env.VERCEL_URL}/api/verify`, {
    token: context.query.token,
    id: context.query.id,
  });

  return {
    props: {
      isVerified: result.data.success,
    },
  };
}
