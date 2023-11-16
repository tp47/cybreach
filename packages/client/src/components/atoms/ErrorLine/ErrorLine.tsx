interface ErrorLineProps {
  error: string | undefined;
}

export default function ErrorLine(props: ErrorLineProps) {
  const { error } = props;

  return <span className="text-red-500 w-full text-right">{error}</span>;
}
