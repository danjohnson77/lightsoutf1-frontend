import { useEffect } from "react";
import { gsap } from "gsap";

const RedLights = ({ type, count = 5 }) => {
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    tl.to(`.${type}`, { opacity: 1, stagger: 0.6, duration: 1 });
    tl.to(`.${type}`, { opacity: 0, delay: 2 });
  }, []);

  return (
    <div className="flex justify-between w-full h-12">
      <div className={`flex flex-col justify-between h-full ${type} opacity-0`}>
        <span className={`red-light opacity-100`}></span>
        <span className={`red-light opacity-100`}></span>
      </div>
      <div className={`flex flex-col justify-between h-full ${type} opacity-0`}>
        <span className={`red-light opacity-100`}></span>
        <span className={`red-light opacity-100`}></span>
      </div>
      <div className={`flex flex-col justify-between h-full ${type} opacity-0`}>
        <span className={`red-light opacity-100`}></span>
        <span className={`red-light opacity-100`}></span>
      </div>
      <div className={`flex flex-col justify-between h-full ${type} opacity-0`}>
        <span className={`red-light opacity-100`}></span>
        <span className={`red-light opacity-100`}></span>
      </div>
      <div className={`flex flex-col justify-between h-full ${type} opacity-0`}>
        <span className={`red-light opacity-100`}></span>
        <span className={`red-light opacity-100`}></span>
      </div>
    </div>
  );
};

export default RedLights;
