import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Input from "../components/Input";
import Modal from "../components/Modal";

const signup = () => {
  const router = useRouter();
  const { register, handleSubmit, getValues, formState } = useForm();

  const [error, setError] = useState(null);
  const [checkEmailModalOpen, setCheckEmailModalOpen] = useState(false);

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    try {
      const result = await axios.post(`/api/auth/register`, {
        name,
        email,
        password,
      });

      const emailSuccess = await sendEmail(result.data.user);
      emailSuccess && setCheckEmailModalOpen(true);
    } catch (error) {
      console.log(error);
      setError(error.response.data ? error.response.data : error);
    }
  };

  const sendEmail = async ({ email, verifyToken, id }) => {
    try {
      const emailRes = await axios.post(`/api/email`, {
        email,
        verifyToken,
        id,
      });
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const redirectOnSuccess = () => {
    router.push("/");
  };

  return (
    <>
      <Modal
        message="Check Your Email"
        subMessage="Please check your email and verify by clicking the link"
        confirmText="Ok"
        openState={checkEmailModalOpen}
        setOpenState={setCheckEmailModalOpen}
        confirmFunction={redirectOnSuccess}
      />
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="mb-5">Sign Up</h1>
        <section className="w-8/12 mx-auto">
          {error && (
            <div className="bg-red-500 p-2 text-center">{error.error}</div>
          )}
          <form
            className="flex flex-col justify-center w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              register={register}
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
    </>
  );
};

export default signup;
