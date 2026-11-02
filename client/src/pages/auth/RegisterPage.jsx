import RegisterForm from "../../components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="neu-glass-backdrop relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden">

      <div className="neu-glass relative w-full max-w-2xl p-6 sm:p-10">

        <div className="text-center mb-9">

          <span
            className="neu-raised inline-flex items-center justify-center w-14 h-14 rounded-[1.1rem] neu-accent font-display text-2xl font-semibold mb-4"
          >
            J
          </span>

          <h1
            className="font-display text-3xl sm:text-4xl font-medium tracking-tight neu-text"
          >
            Join JobJournal
          </h1>

          <p className="neu-muted mt-2 text-sm">
            Create your account and start tracking your professional journey.
          </p>

        </div>

        <RegisterForm />

      </div>

    </div>
  );
};

export default RegisterPage;