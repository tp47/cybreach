import { Button, Field } from "@/components";
import { useForm, SubmitHandler } from "react-hook-form";

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
  } = useForm<FormData>({ mode: "onBlur" });

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d).+$/;

  const onSubmit: SubmitHandler<FormData> = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <div className="bg-gray-900 border-2 border-green-500 p-4">
      <h1 className="text-green-500 text-center text-lg mb-4 font-bold">
        BREACH IN
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Field
            label="email"
            register={register}
            pattern={{
              value: emailPattern,
              message: "Email is not valid",
            }}
            name="email"
            type="email"
            error={errors?.email?.message}
          />
          <Field
            label="password"
            register={register}
            pattern={{
              value: passwordPattern,
              message: "Password is not valid",
            }}
            name="password"
            type="password"
            error={errors?.password?.message}
          />
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
