import React from "react";
import RedLights from "./RedLights";

const Countdown = () => {
  return (
    <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-between  lg:items-start">
      <span>LIGHTS OUT IN:</span>
      <div className="flex flex-col py-5 lg:py-0">
        <p className="mb-2 text-xl ">01:22:55:27</p>
        <RedLights type="countdown-light" />
      </div>
      <span>HUNGARIAN GRAND PRIX</span>
    </div>
  );
};

export default Countdown;
