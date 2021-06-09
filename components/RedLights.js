import { useEffect } from "react";
import { gsap } from "gsap";

const RedLights = ({ type }) => {
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    tl.to(`.${type}`, { opacity: 1, stagger: 0.6, duration: 1 });
    tl.to(`.${type}`, { opacity: 0, delay: 2 });
  }, []);

  return (
    <div className="flex justify-between w-full">
      <span className={`red-light ${type}`}></span>
      <span className={`red-light ${type}`}></span>
      <span className={`red-light ${type}`}></span>
      <span className={`red-light ${type}`}></span>
      <span className={`red-light ${type}`}></span>
    </div>
  );
};

export default RedLights;
