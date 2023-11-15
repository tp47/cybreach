interface ButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  label?: string;
}

export default function Button(props: ButtonProps) {
  const { type, label } = props;

  return (
    <button
      type={type}
      className="bg-green-500 border-2 h-10 border-green-500 "
    >
      {label}
    </button>
  );
}
