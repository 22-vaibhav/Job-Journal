import LoginForm from "../../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="relative min-h-screen bg-slate-50 flex items-center justify-center px-4 overflow-hidden">

      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap');`}
      </style>

      <div
        className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-[0.10]"
        style={{ background: "radial-gradient(circle, #0F6B5C 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-24 w-md h-112 rounded-full opacity-[0.08]"
        style={{ background: "radial-gradient(circle, #1B9C87 0%, transparent 70%)" }}
      />

      <div className="relative w-full flex justify-center">
        <LoginForm />
      </div>

    </div>
  );
};

export default LoginPage;