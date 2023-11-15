import Field from "../molecules/Field";
import Button from "../atoms/Button";

interface FormProps {
  title?: string;
  isPending?: boolean;
  handleSubmit?: () => void;
}

export default function RegisterForm() {
  // mock
  const errors = {
    email: "wrong signature",
    password: "wrong signature",
    firstName: null,
    secondName: null,
    login: null,
    phone: "wrong signature",
  };

  return (
    <form className="bg-gray-900 border-2 border-green-500 py-4 px-6 ">
      <h1 className="text-green-500 text-center text-lg mb-4 font-bold">
        PLUG IN
      </h1>
      <div className="mb-12">
        <Field
          name="first_name"
          label="first name"
          type="text"
          error={errors.firstName}
        />
        <Field
          name="second_name"
          label="second name"
          type="text"
          error={errors.secondName}
        />
        <Field name="login" label="login" type="text" error={errors.login} />
        <Field name="email" label="email" type="email" error={errors.email} />
        <Field
          name="password"
          label="password"
          type="password"
          error={errors.password}
        />
        <Field name="phone" label="phone" type="phone" error={errors.phone} />
      </div>
      <div className="flex flex-col justify-between gap-4 mt-8">
        <Button label="PLUG IN" type="submit" />
        <Button label="HAVE ACCESS? BREACH IN!" type="button" />
      </div>
    </form>
  );
}
