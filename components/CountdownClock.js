import { useEffect, useState } from "react";

const CountdownClock = ({ time }) => {
  const [currentTime, setCurrentTime] = useState(null);

  const formatTime = (time) => {
    let days = addZero(Math.floor(time / (1000 * 60 * 60 * 24)));

    let hours = addZero(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );

    let minutes = addZero(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

    let seconds = addZero(Math.floor((time % (1000 * 60)) / 1000));

    return `${days}:${hours}:${minutes}:${seconds}`;
  };

  const addZero = (number) => {
    if (number < 10) {
      return "0" + number;
    } else {
      return number;
    }
  };

  useEffect(() => {
    if (!currentTime) {
      setCurrentTime(time);
    } else {
      const timeout = setTimeout(
        () => setCurrentTime(currentTime - 1000),
        1000
      );
      return () => clearTimeout(timeout);
    }
  });

  return <div>{formatTime(currentTime)}</div>;
};

export default CountdownClock;
