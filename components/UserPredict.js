import React from "react";

const UserPredict = () => {
  return (
    <div className="flex flex-col justify-around items-center bg-offBlack text-center h-full">
      <h2>PREDICT THE RESULTS OF THE NEXT RACE</h2>
      <div className="flex lg:flex-col w-full justify-between items-center py-2">
        <button>Sign Up</button>
        <p>or</p>
        <button>Log In</button>
      </div>
    </div>
  );
};

export default UserPredict;
