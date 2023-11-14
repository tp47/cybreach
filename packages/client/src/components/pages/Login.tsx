import LoginForm from "../organisms/LoginForm";

export default function LoginPage(props: unknown) {
  return (
    <>
      <main className="h-screen bg-gray-800 flex mx-auto justify-center items-center">
        <LoginForm />
      </main>
    </>
  );
}
