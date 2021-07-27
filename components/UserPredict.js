import Link from "next/link";

import { useSession } from "next-auth/client";

const UserPredict = () => {
  const [session, loading] = useSession();

  return (
    <div className="flex flex-col justify-around items-center bg-offBlack text-center">
      {!session ? (
        <div className="flex flex-col justify-center w-full py-5">
          <h2>PREDICT THE RESULTS OF THE NEXT RACE</h2>
          <div className="flex justify-center items-center pt-5 lg:w-6/12 lg:mx-auto">
            <Link href="/signup">
              <button className="btn">SIGN UP</button>
            </Link>
            <p>or</p>
            <Link href="/login">
              <button className="btn">LOG IN</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-between py-5">
          <p>Welcome back, {session.user.name}!</p>
          <p className="my-5">Points: {session.user.points}</p>
          <Link href="/predict">
            <button className="btn">VIEW YOUR PREDICTIONS</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserPredict;
