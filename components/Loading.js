import RedLights from "./RedLights";

const Loading = () => {
  return (
    <div className="h-96 w-10/12 mx-auto flex flex-col justify-center items-center">
      <RedLights type="load-light" />
    </div>
  );
};

export default Loading;
