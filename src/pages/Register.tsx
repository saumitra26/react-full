import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import type { RegisterRequest } from "../dataModel/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({});
  const { registerUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()

  const [submitError, setSubmitError] = useState<string | null>(null);
  const onSubmit = async (registerData: RegisterRequest) => {
    setSubmitError(null);
    try {
      await registerUser(registerData);
      setLoading(true);
      navigate("/login")
    } catch (error) {
      console.error(error);
      alert("Registration failed!");
      setSubmitError("Invalid Email or password");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex sm:flex-row flex-col justify-center items-center min-h-screen gap-6">
      <div className="">
        <h1 className="text-5xl text-blue-500 font-bold mb-3 ">Book Library</h1>
        <p className="text-black text-center ">
          Best Library in the entire world and the best knowledge you get here
        </p>
      </div>
      <div className="w-full max-w-md bg-white rounded-md shadow-md p-4">
        <h1 className="text-center font-bold text-4xl my-2">Register</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 "
        >
          <input
            {...register("name", { required: "Name is required" })}
            className={`w-full border ${
              errors.name ? "border-red-600" : "border-gray-300"
            }  rounded-md p-2 `}
            placeholder="Name"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
          )}
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email",
              },
            })}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
          <input
            {...register("password", {
              required: "Password required",
              minLength: {
                value: 6,
                message: "Length must be 6",
              },
            })}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="password"
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
          {submitError && <p className="text-red-500 text-sm">{submitError}</p>}

          <button
            disabled={loading}
            className={`w-full p-2 rounded-md  text-white ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-300"
            }`}
            type="submit"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
