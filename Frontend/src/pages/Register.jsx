import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
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

    try {
      axios.post("http://localhost:3000/api/auth/register", {
        email: formValues.email,
        fullName:{
          firstName: formValues.firstName,
          lastName: formValues.lastName
        },
        password: formValues.password
      },{
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
    } catch (error) {
      console.error(error);
      setStatus((current) => ({ ...current, loading: false, error: "Registration failed" }));
    }
  }
  return (
    <main className="min-h-screen bg-[var(--color-bg)]">
      <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute -right-20 top-8 h-64 w-64 rounded-full bg-[#1b1b1f] blur-3xl" />
          <div className="pointer-events-none absolute left-0 top-44 h-72 w-72 rounded-full bg-[#151518] blur-3xl" />

        <div className="mx-auto flex min-h-screen max-w-6xl items-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_1fr]">
            <section className="flex flex-col justify-center gap-6">
              <span className="w-fit rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-1 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                 Create your space
              </span>
              <h1 className="text-4xl font-semibold leading-tight text-[var(--color-text)] sm:text-5xl">
                <span className="block font-[var(--font-display)]">A smooth start</span>
                <span className="block">for focused work.</span>
              </h1>
              <p className="max-w-xl text-base text-[var(--color-muted)] sm:text-lg">
                Build your profile once. We keep everything clean and connected so you can move fast.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-[var(--color-muted)]">
                <div className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2">
                  <div className="rounded-full border border-[#2a2a2f] bg-[#151518] px-4 py-2">
                  Thoughtful defaults
                </div>
                  <div className="rounded-full border border-[#2a2a2f] bg-[#151518] px-4 py-2">
                  Human-first design
                </div>
              </div>
              </div>
            </section>

              <section className="rounded-[24px] border border-[#2a2a2f] bg-[#0f0f12] p-6 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.9)] sm:p-8">
              <div>
                <h2 className="text-2xl font-semibold text-[var(--color-text)]">Register</h2>
                <p className="mt-2 text-sm text-[var(--color-muted)]">
                  Fill out the details below to get started.
                </p>
              </div>

              <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]" htmlFor="firstName">
                      First name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Avery"
                      value={formValues.firstName}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-4 py-3 text-sm text-[var(--color-text)] shadow-[var(--shadow-soft)] outline-none transition focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]"
                        className="mt-2 w-full rounded-[18px] border border-[#2a2a2f] bg-[#151518] px-4 py-3 text-sm text-[var(--color-text)] shadow-[0_16px_40px_-28px_rgba(0,0,0,0.8)] outline-none transition focus:border-[#3a3a42] focus:ring-2 focus:ring-[#3a3a42]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]" htmlFor="lastName">
                      Last name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Hart"
                      value={formValues.lastName}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-4 py-3 text-sm text-[var(--color-text)] shadow-[var(--shadow-soft)] outline-none transition focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]"
                        className="mt-2 w-full rounded-[18px] border border-[#2a2a2f] bg-[#151518] px-4 py-3 text-sm text-[var(--color-text)] shadow-[0_16px_40px_-28px_rgba(0,0,0,0.8)] outline-none transition focus:border-[#3a3a42] focus:ring-2 focus:ring-[#3a3a42]"
                    />
                  </div>
                </div>

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
                    className="mt-2 w-full rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-4 py-3 text-sm text-[var(--color-text)] shadow-[var(--shadow-soft)] outline-none transition focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]"
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
                    placeholder="Create a password"
                    value={formValues.password}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-4 py-3 text-sm text-[var(--color-text)] shadow-[var(--shadow-soft)] outline-none transition focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]"
                      className="mt-2 w-full rounded-[18px] border border-[#2a2a2f] bg-[#151518] px-4 py-3 text-sm text-[var(--color-text)] shadow-[0_16px_40px_-28px_rgba(0,0,0,0.8)] outline-none transition focus:border-[#3a3a42] focus:ring-2 focus:ring-[#3a3a42]"
                  />
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
                  className="w-full rounded-[var(--radius)] bg-[var(--color-accent)] px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[var(--shadow-soft)] transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-70"
                    className="w-full rounded-[18px] bg-[#2a2a2f] px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_16px_40px_-28px_rgba(0,0,0,0.8)] transition hover:translate-y-[-1px] hover:bg-[#33333a] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status.loading ? "Creating..." : "Create account"}
                </button>
              </form>

              <p className="mt-6 text-sm text-[var(--color-muted)]">
                Already have an account?{" "}
                <Link className="font-semibold text-[var(--color-accent)]" to="/login">
                  Sign in here
                </Link>
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
