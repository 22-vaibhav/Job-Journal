import LoginForm from "../../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="neu-glass-backdrop relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden">

      <div className="relative w-full flex justify-center">
        <LoginForm />
      </div>

    </div>
  );
};

export default LoginPage;