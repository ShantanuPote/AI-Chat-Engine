import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    error: "",
    success: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    setStatus({ loading: true, error: "", success: "" });

    console.log(formValues);

    axios.post("http://localhost:3000/api/auth/login", {
      email: formValues.email, 
      password: formValues.password
    },
    {
    withCredentials: true
    }
  ).then((res)=>{
    console.log(res);
    navigate("/")
  }).catch((err)=>{
    console.error(err);
  }).finally(()=>{
    setStatus((current) => ({ ...current, loading: false }));
  });
}
  return (
    <main className="min-h-screen bg-black text-[var(--color-text)]">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-24 top-8 h-64 w-64 rounded-full bg-[#1b1b1f] blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-40 h-72 w-72 rounded-full bg-[#151518] blur-3xl" />

        <div className="mx-auto flex min-h-screen max-w-6xl items-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid w-full gap-10 lg:grid-cols-[1.05fr_1fr]">
            <section className="flex flex-col justify-center gap-6">
              <span className="w-fit rounded-full border border-[#2a2a2f] bg-[#151518] px-4 py-1 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                Welcome back
              </span>
              <h1 className="text-4xl font-semibold leading-tight text-[var(--color-text)] sm:text-5xl">
                <span className="block font-[var(--font-display)]">Sign in to</span>
                <span className="block">your calm workspace.</span>
              </h1>
              <p className="max-w-xl text-base text-[var(--color-muted)] sm:text-lg">
                Keep your momentum without the noise. Enter your details and pick up right where you left off.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-[var(--color-muted)]">
                <div className="rounded-full border border-[#2a2a2f] bg-[#151518] px-4 py-2">
                  Secure access
                </div>
                <div className="rounded-full border border-[#2a2a2f] bg-[#151518] px-4 py-2">
                  Fast sign in
                </div>
              </div>
            </section>

            <section className="rounded-[24px] border border-[#2a2a2f] bg-[#0f0f12] p-6 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.9)] sm:p-8">
              <div>
                <h2 className="text-2xl font-semibold text-[var(--color-text)]">Sign in</h2>
                <p className="mt-2 text-sm text-[var(--color-muted)]">
                  Use your email and password to continue.
                </p>
              </div>

              <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formValues.email}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-[18px] border border-[#2a2a2f] bg-[#151518] px-4 py-3 text-sm text-[var(--color-text)] shadow-[0_16px_40px_-28px_rgba(0,0,0,0.8)] outline-none transition focus:border-[#3a3a42] focus:ring-2 focus:ring-[#3a3a42]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Your password"
                    value={formValues.password}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-[18px] border border-[#2a2a2f] bg-[#151518] px-4 py-3 text-sm text-[var(--color-text)] shadow-[0_16px_40px_-28px_rgba(0,0,0,0.8)] outline-none transition focus:border-[#3a3a42] focus:ring-2 focus:ring-[#3a3a42]"
                  />
                  <div className="mt-3 flex items-center justify-between text-sm text-[var(--color-muted)]">
                    <span>Need a reset?</span>
                    <button type="button" className="font-semibold text-[var(--color-accent)]">
                      Forgot password
                    </button>
                  </div>
                </div>

                {status.error ? (
                  <p className="rounded-[var(--radius)] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {status.error}
                  </p>
                ) : null}
                {status.success ? (
                  <p className="rounded-[var(--radius)] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    {status.success}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full rounded-[18px] bg-[#2a2a2f] px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_16px_40px_-28px_rgba(0,0,0,0.8)] transition hover:translate-y-[-1px] hover:bg-[#33333a] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status.loading ? "Signing in..." : "Sign in"}
                </button>
              </form>

              <p className="mt-6 text-sm text-[var(--color-muted)]">
                New here?{" "}
                <Link className="font-semibold text-[var(--color-accent)]" to="/register">
                  Create an account
                </Link>
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
