interface ErrorLineProps {
  error: string | null;
}

export default function ErrorLine(props: ErrorLineProps) {
  const { error } = props;

  return (
    <span className="text-red-500 w-full text-right mt-1 text-xs min-h-[1rem] h-auto">
      {error}
    </span>
  );
}
