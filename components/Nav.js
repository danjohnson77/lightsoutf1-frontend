import { useState } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";

const Nav = () => {
  const [isChecked, setIsChecked] = useState(false);

  const [session, loading] = useSession();

  const handleClick = () => {
    isChecked && setIsChecked(false);
  };
  return (
    //   menu wrap
    <nav
      className={`${
        !isChecked &&
        "bg-gradient-to-t from-black to-racingGreen lg:bg-transparent"
      } w-full h-16 flex justify-center lg:justify-center items-center sticky top-0 font-heading z-10`}
      onClick={handleClick}
    >
      <h1 className={`lg:hidden`}>LightsOutF1</h1>
      <div className="fixed top-0 left-2 z-10 w-screen">
        <input
          type="checkbox"
          className="absolute w-16 h-16 top-0 left-0 z-20 opacity-0 cursor-pointer lg:hidden"
          defaultChecked={isChecked}
          onClick={() => {
            setIsChecked(!isChecked);
          }}
          ariaLabel="Open Navigation Menu"
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
              className={`text-center max-w-full  max-h-screen 
              
              lg:w-full lg:max-w-6xl lg:px-10 lg:flex lg:flex-row lg:justify-between lg:items-center ${
                isChecked ? "opacity-100" : "opacity-0 lg:opacity-100"
              } transition-opacity duration-500 ease-in-out`}
            >
              <h1 className={`lg:visible`}>LightsOutF1</h1>
              <ul className="nav-list flex-grow justify-center">
                <li className="lg:mr-10" onClick={handleClick}>
                  <Link href="/">Home</Link>
                </li>

                <li className="lg:mr-10" onClick={handleClick}>
                  <Link href="/predict">Predict</Link>
                </li>

                <li onClick={handleClick}>
                  {" "}
                  <Link href="/about">About</Link>
                </li>
              </ul>
              <ul className="nav-list flex-shrink ">
                {session ? (
                  <>
                    <li>
                      <span>
                        <i className="fas fa-user pr-2"></i>
                      </span>
                      {session.user.name}
                    </li>
                    <li className="lg:ml-10" onClick={() => signOut()}>
                      Log Out
                    </li>
                  </>
                ) : (
                  <>
                    <li onClick={handleClick}>
                      <Link href="/signup">Sign Up</Link>
                    </li>
                    <li className="lg:ml-10" onClick={() => signIn()}>
                      Log In
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
