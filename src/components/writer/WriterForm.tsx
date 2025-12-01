import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Writer, writerRequest } from "../../dataModel/writer";

interface WriterFormProps {
  defaultValues: Partial<Writer>;
  onSubmit: (data: writerRequest) => void;
  type?: "Add" | "Edit";
}

const WriterForm = ({
  defaultValues,
  onSubmit,
  type = "Add",
}: WriterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<writerRequest>({ defaultValues });
  useEffect(() => {
    if (!defaultValues) return;

    reset({
      ...defaultValues,
      name: defaultValues.name,
      email: defaultValues.email,
    });
  }, [defaultValues, reset]);
  const isEditMode = type === "Edit";

  return (
    <section className="py-8">
      <div className="max-w-md mx-auto p-6">
        <div className="flex flex-col bg-white shadow p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            {isEditMode ? "Edit Writer" : "Add Writer"}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                id="name"
                {...register("name", {
                  required: "Name is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Name can only contain letters",
                  },
                })}
                type="text"
                placeholder="Enter writer name"
                className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="Enter email address"
                className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full font-medium transition-colors"
            >
              {isEditMode ? "Update Writer" : "Add Writer"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default WriterForm;
