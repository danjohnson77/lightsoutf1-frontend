import React from "react";
import CountdownClock from "./CountdownClock";
import RedLights from "./RedLights";

const Countdown = ({ race }) => {
  const {
    nextRace: { name },
    timeTillRace,
  } = race;
  return (
    <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-between  lg:items-start">
      <span>LIGHTS OUT IN:</span>
      <div className="flex flex-col py-5 lg:py-0 w-6/12 mx-auto text-center">
        <div className="mb-2 text-xl">
          <CountdownClock time={timeTillRace} />
        </div>
        <div className="py-5">
          <RedLights type="countdown-light" />
        </div>
      </div>
      <span>{name}</span>
    </div>
  );
};

export default Countdown;
