import RedLights from "./RedLights";

const Loading = () => {
  return (
    <div className="h-full w-10/12 mx-auto flex flex-col justify-center items-center">
      <RedLights type="load-light" />
      <p className="mt-5">...loading</p>
    </div>
  );
};

export default Loading;
