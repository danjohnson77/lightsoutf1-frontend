import { useState } from "react";

const Tiebreaker = ({ tiebreaker, setTiebreaker }) => {
  const [tiebreakerError, setTiebreakerError] = useState(null);

  const { hours, minutes, seconds, fractions } = tiebreaker;

  const handleTiebreakerChange = (e) => {
    const { name, value } = e.target;

    setTiebreakerError(null);

    const regex = new RegExp("^[0-9]+$");

    if (!regex.test(value) && value.length > 0) {
      return setTiebreakerError("Must be numeric");
    }

    if (name === "minutes" || name === "seconds") {
      if (value > 59) {
        return setTiebreakerError(`${name} must be between 1 and 59`);
      }
    }
    setTiebreaker({ ...tiebreaker, [name]: value });
  };

  return (
    <>
      <h2>Tiebreaker: Winner Total Race Time</h2>

      <div className="flex items-center w-full">
        <input
          type="text"
          name="hours"
          id="hours"
          maxLength="2"
          placeholder="00"
          value={hours}
          className="w-3/12 text-center"
          onChange={handleTiebreakerChange}
        />

        <span>:</span>
        <input
          type="text"
          name="minutes"
          id="minutes"
          maxLength="2"
          placeholder="00"
          value={minutes}
          className="w-3/12 text-center"
          onChange={handleTiebreakerChange}
        />
        <span>:</span>
        <input
          type="text"
          name="seconds"
          id="seconds"
          maxLength="2"
          max="59"
          placeholder="00"
          value={seconds}
          className="w-3/12 text-center"
          onChange={handleTiebreakerChange}
        />
        <span>.</span>
        <input
          type="text"
          name="fractions"
          id="fractions"
          maxLength="3"
          placeholder="000"
          value={fractions}
          className="w-3/12 text-center"
          onChange={handleTiebreakerChange}
        />
      </div>
      <div className="w-full text-red-500">
        {tiebreakerError && tiebreakerError}
      </div>
    </>
  );
};

export default Tiebreaker;
