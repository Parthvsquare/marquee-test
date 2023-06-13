import { useStore } from "@/Store";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const inputSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email should cannot be empty" })
    .email({ message: "Not a email field" }),
  password: z
    .string()
    .nonempty({ message: "Password should cannot be empty" })
    .min(8, { message: "Password should be greater than 8 character" }),
  checkBox: z.boolean(),
});

type IFormInput = z.infer<typeof inputSchema>;

function AuthPage() {
  const { dispatch } = useStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<IFormInput>({
    resolver: zodResolver(inputSchema),
  });

  const authentication = ({
    inputEmailId,
    inputPassword,
  }: {
    inputEmailId: string;
    inputPassword: string;
  }) => {
    const emailId = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    if (inputEmailId === emailId && password === inputPassword) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const response = authentication({
      inputEmailId: data.email,
      inputPassword: data.password,
    });
    if (response) {
      dispatch({
        type: "SET_USER_AUTH",
        payload: true,
      });
      if (data.checkBox) {
        localStorage.setItem("auth", JSON.stringify(true));
      }
      navigate("/");
    } else {
      setError(
        "email",
        { type: "focus", message: "Incorrect Credentials" },
        { shouldFocus: true },
      );
      reset({ password: "" }, { keepErrors: true });
    }
  };

  return (
    <div className="flex h-[calc(100vh_-_64px)] w-screen items-center justify-center">
      <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-6 md:p-8">
        <form
          className="space-y-6"
          action="#"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign in to our platform
          </h5>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className={`block w-full rounded-lg border ${
                errors.email?.message ? "border-red-500" : "border-gray-300"
              }
              bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500
              focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600
              dark:text-white dark:placeholder-gray-400`}
              placeholder="name@company.com"
              required
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">{errors.email.message}</span>
              </p>
            )}
          </div>
          <div className="relative">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Your password
            </label>
            <div
              className="absolute inset-y-12 right-3 flex cursor-pointer items-center pl-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              placeholder="••••••••"
              required
              className={`block w-full rounded-lg border ${
                errors.password?.message ? "border-red-500" : "border-gray-300"
              }
              bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500
              focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600
              dark:text-white dark:placeholder-gray-400`}
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">{errors.password.message}</span>
              </p>
            )}
          </div>
          <div className="flex items-start">
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="remember"
                  type="checkbox"
                  {...register("checkBox")}
                  className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                />
              </div>
              <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Remember me
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login to your account
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthPage;
