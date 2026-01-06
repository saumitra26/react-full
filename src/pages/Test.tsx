import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { useState } from "react";
import type { LoginRequest } from "../dataModel/auth";

const Test = () => {
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({});
  const onSubmit = async (loginData: LoginRequest) => {
    console.log("test",loginData);
    setSubmitError(null);
    try {
      setLoading(true);
      await login(loginData);
    } catch (error) {
      console.error("Login failed:", error);
      setSubmitError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col  sm:flex-row gap-6 items-center justify-center  min-h-screen ">
      <div className="text-left ">
        <h1 className="text-6xl font-bold text-blue-500 mb-3">Book Library</h1>
        <p className="text-black text-center ">
          Best Library in the entire world and the best knowledge you get here
        </p>
      </div>
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-full max-w-sm mx-auto "
        >
          <input
            {...register("email", {
              required: "required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email",
              },
            })}
            className={`border rounded-md p-2 w-full focus:outline-none ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Email"
          />
          {errors.email && (
            <p className="test-red-500 test-sm mt-1">{errors.email.message}</p>
          )}
          <input
            {...register("password", {
              required: "Password is requires",
              minLength: {
                value: 6,
                message: "Password need must be 6 chars",
              },
            })}
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 w-full rounded-md border border-black hover:bg-blue-200 transition-colors duration-300 cursor-pointer "
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="w-full p-2 border-b border-gray-500"></div>
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Test;
