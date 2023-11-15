import { Button } from "@/components";
import { useForm } from "react-hook-form";

interface FormProps {
  title?: string;
  isPending?: boolean;
  handleSubmit?: () => void;
}

interface FormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<FormData>({ mode: "onBlur" });

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d).+$/;

  const onSubmit = (data: unknown) => {
    alert(JSON.stringify(data));
    reset();
  };

  return (
    <div className="bg-gray-900 border-2 border-green-500 p-4">
      <h1 className="text-green-500 text-center text-lg mb-8 font-bold">
        BREACH IN
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-green-500">
            email
            <input
              className="w-full p-2 bg-gray-800 border border-green-500 text-green-500"
              {...register("email", {
                required: "Field must be filled in",
                pattern: {
                  value: emailPattern,
                  message: "Email is not valid",
                },
              })}
            />
          </label>
          {errors?.email && (
            <span className="text-red-500 w-full text-right">
              {errors?.email?.message}
            </span>
          )}

          <label className="block text-green-500 mt-2">
            password
            <input
              className="w-full p-2 bg-gray-800 border border-green-500 text-green-500"
              {...register("password", {
                required: "Field must be filled in",
                pattern: {
                  value: passwordPattern,
                  message: "Password is not valid",
                },
              })}
              type="password"
            />
          </label>
          {errors?.password && (
            <span className="text-red-500 w-full text-right">
              {errors?.password?.message}
            </span>
          )}

          <div className="flex flex-col justify-between mt-8">
            <Button label="BREACH IN" type="submit" disabled={!isValid} />
          </div>
        </div>
      </form>
      <div className="flex flex-col justify-between">
        <Button label="NO ACCESS? PLUG IN!" type="button" />
      </div>
    </div>
  );
}
