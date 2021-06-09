import { useState } from "react";
import Link from "next/link";

const Nav = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    //   menu wrap
    <nav
      className={`${
        !isChecked &&
        "bg-gradient-to-t from-black to-racingGreen lg:bg-transparent"
      } w-screen h-16 flex justify-end items-center sticky top-0 font-heading`}
    >
      <h1 className={`lg:hidden ${isChecked && "hidden"} p-5`}>LightsOutF1</h1>
      <div className="fixed top-0 left-2 z-10 w-screen">
        <input
          type="checkbox"
          className="absolute w-16 h-16 top-0 left-0 z-20 opacity-0 cursor-pointer lg:hidden"
          defaultChecked={isChecked}
          onClick={() => {
            setIsChecked(!isChecked);
          }}
        />

        {/* hamburger */}
        <div className="absolute top-0 left-0 z-10 w-16 h-16 p-4 flex items-center content-center lg:hidden ">
          <div
            className={`relative flex-0 nav-line flex items-center justify-center transform ${
              isChecked && "rotate-135"
            }`}
          >
            <div
              className={`nav-line absolute z-10  transform ${
                isChecked ? "hidden" : "-top-3"
              }`}
            ></div>
            <div
              className={`nav-line absolute z-10 transform ${
                isChecked ? "rotate-90 top-0" : "top-3"
              }`}
            ></div>
          </div>
        </div>

        {/* nav menu */}
        <div
          className={`fixed top-0 left-0 w-full h-full lg:h-auto overflow-hidden flex items-center justify-center ${
            isChecked ? "visible" : "invisible lg:visible"
          }`}
        >
          <div
            className={`bg-gradient-radial lg:bg-gradient-to-t lg:from-transparent lg:to-racingGreen lg:rounded-none lg:py-2 min-h-screen min-w-screen lg:min-h-0 lg:min-w-0 size-double-screen lg:h-auto flex items-center justify-center transform ${
              isChecked ? "scale-100 flex-none" : "scale-0 lg:scale-100"
            } transition-all duration-300 opacity-100 ease-in-out`}
          >
            <div
              className={`text-center max-w-full lg:w-full lg:max-w-6xl lg:flex lg:flex-row lg:justify-between lg:items-center max-h-screen ${
                isChecked ? "opacity-100" : "opacity-0 lg:opacity-100"
              } transition-opacity duration-500 ease-in-out`}
            >
              {/* <h1 className={`lg:visible lg:w-3/12 ${isChecked && "hidden"}`}>
                LightsOutF1
              </h1> */}
              <ul className="flex flex-col lg:flex-row  lg:justify-around lg:w-4/12 mb-5 lg:mb-0">
                <Link href="/">
                  <li>Home</li>
                </Link>
                <Link href="/predict">
                  <li>Predict</li>
                </Link>
                <li>News</li>
              </ul>
              <ul className="flex flex-col lg:flex-row lg:w-3/12 lg:justify-around">
                <li>Sign Up</li>
                <li>Log In</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
