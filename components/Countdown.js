import CountdownClock from "./CountdownClock";

const Countdown = ({ race }) => {
  const { nextRace, timeTillRace } = race;

  return (
    <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-between  lg:items-start text-sm">
      <span>LIGHTS OUT IN:</span>
      <div className="flex flex-col py-5 lg:py-0 w-6/12 mx-auto text-center">
        <div>
          <CountdownClock time={timeTillRace} />
        </div>
      </div>
      <span>{nextRace.raceName}</span>
    </div>
  );
};

export default Countdown;
