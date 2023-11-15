interface InputProps {
  type: string;
  name: string;
  autoComplete: string;
}

export default function Input(props: InputProps) {
  const { type, name, autoComplete } = props;

  return (
    <input
      name={name}
      type={type}
      autoComplete={autoComplete}
      required
      className="w-full h-8 p-2 bg-gray-800 border border-green-500 text-green-500"
    />
  );
}
