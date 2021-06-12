import axios from "axios";
import { useForm } from "react-hook-form";
import Input from "../components/Input";

const signup = () => {
  const { register, handleSubmit, getValues, formState } = useForm();

  const onSubmit = async (data) => {
    const result = await axios.post("http://localhost:3000/api/auth/register", {
      name: data.name,
      email: data.email,
      password: data.password,
    });

    console.log("result", result.data);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="mb-5">Sign Up</h1>
      <section>
        <form
          className="flex flex-col justify-center w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            register={register}
            handleSubmit={handleSubmit}
            formState={formState}
            getValues={getValues}
            label="name"
            display="Username"
            errorClasses="text-red-500"
            inputProps={{
              required: "Name is required",
            }}
          />
          <Input
            register={register}
            handleSubmit={handleSubmit}
            formState={formState}
            confirmField={true}
            getValues={getValues}
            label="email"
            display="Email"
            inputType="email"
            errorClasses="text-red-500"
            inputProps={{
              required: "Email is required",
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter a valid email address",
              },
            }}
          />

          <Input
            register={register}
            handleSubmit={handleSubmit}
            formState={formState}
            confirmField={true}
            getValues={getValues}
            label="password"
            display="Password"
            inputType="password"
            errorClasses="text-red-500"
            inputProps={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
          />

          <input type="submit" className="mt-5 text-black" label="submit" />
        </form>
      </section>
    </div>
  );
};

export default signup;
