interface ErrorLineProps {
  error: string | null;
}

export default function ErrorLine(props: ErrorLineProps) {
  const { error } = props;

  return (
    <span className="text-red-500 w-full text-right text-xs">{error}</span>
  );
}
