import Link from "next/link";

import { useSession } from "next-auth/client";

const UserPredict = () => {
  const [session, loading] = useSession();

  return (
    <div className="flex flex-col justify-around items-center bg-offBlack text-center">
      {!session ? (
        <>
          <h2>PREDICT THE RESULTS OF THE NEXT RACE</h2>
          <div className="flex lg:flex-col w-full justify-between items-center py-2">
            <Link href="/signup">
              <button className="btn">SIGN UP</button>
            </Link>
            <p>or</p>
            <Link href="/login">
              <button className="btn">LOG IN</button>
            </Link>
          </div>
        </>
      ) : (
        <div className="p-5">
          <p>Welcome back, {session.user.name}!</p>
          <p>Points: {session.user.points}</p>
          <Link href="/predict">
            <button className="btn">VIEW YOUR PREDICTIONS</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserPredict;
