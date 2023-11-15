import ErrorLine from "../atoms/ErrorLine";
import Input from "../atoms/Input";

interface FieldProps {
  label: string;
  type: string;
  name: string;
  error: string | null;
}

export default function Field(props: FieldProps) {
  const { label, type, name, error } = props;

  return (
    <div className="flex flex-col text-sm">
      <label className="block text-green-500" htmlFor={name}>
        {label}
      </label>
      <Input name={name} type={type} autoComplete={name} />
      <ErrorLine error={error} />
    </div>
  );
}
