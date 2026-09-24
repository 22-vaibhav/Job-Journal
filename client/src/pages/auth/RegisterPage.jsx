import RegisterForm from "../../components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="relative min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 overflow-hidden">

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

      <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-slate-200/70 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_8px_24px_-8px_rgba(16,24,40,0.10)] p-8 sm:p-10">

        <div className="text-center mb-9">

          <span
            className="inline-flex items-center justify-center w-11 h-11 rounded-xl text-white text-lg font-bold mb-4"
            style={{
              background: "linear-gradient(135deg, #0F6B5C 0%, #1B9C87 100%)",
            }}
          >
            J
          </span>

          <h1
            className="text-3xl font-semibold text-slate-900 tracking-tight"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Join JobJournal
          </h1>

          <p className="text-slate-500 mt-2 text-sm">
            Create your account and start tracking your professional journey.
          </p>

        </div>

        <RegisterForm />

      </div>

    </div>
  );
};

export default RegisterPage;