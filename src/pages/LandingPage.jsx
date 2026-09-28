import { Link } from "react-router-dom";
import { Activity, ArrowRight, ShieldCheck, FileHeart, Users } from "lucide-react";

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f7faff] text-slate-900">

      {/* NAVBAR */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Activity size={22} />
            </div>

            <div>
              <div className="text-xl font-bold">
                MediVault
              </div>

              <div className="text-xs text-slate-500">
                Healthcare Management
              </div>
            </div>
          </Link>

          {/* Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm font-medium text-slate-600 hover:text-blue-600"
            >
              Features
            </a>

            <a
              href="#doctors"
              className="text-sm font-medium text-slate-600 hover:text-blue-600"
            >
              For Doctors
            </a>

            <a
              href="#patients"
              className="text-sm font-medium text-slate-600 hover:text-blue-600"
            >
              For Patients
            </a>
          </div>

          {/* Auth */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>

        </div>
      </header>


      {/* HERO */}
      <section className="relative overflow-hidden">

        {/* Soft background decoration */}
        <div className="absolute left-0 top-20 -z-10 h-96 w-96 rounded-full bg-blue-100 blur-3xl" />

        <div className="absolute right-0 top-20 -z-10 h-96 w-96 rounded-full bg-blue-100 blur-3xl" />


        <div className="mx-auto grid min-h-[720px] max-w-7xl items-center gap-8 px-6 lg:grid-cols-2">

          {/* LEFT */}
          <div className="py-10">

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              <Activity size={16} />
              Modern Electronic Health Records
            </div>


            {/* Heading */}
            <h1 className="max-w-2xl text-xl font-bold leading-tight tracking-tight sm:text-5xl">

              Your health records,

              <span className="block text-blue-600">
                connected.
              </span>

              <span className="block text-slate-950">
                Secure. Simplified.
              </span>

            </h1>


            {/* Description */}
            <p className="mt-6 max-w-xl text-mb leading-6 text-slate-600">

              MediVault brings patients, doctors and healthcare teams together
              with a unified and secure digital health record system.

              Manage appointments, medical history, prescriptions, reports
              and more — all in one place.

            </p>


            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <Link
                to="/login"
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
              >
                Login to MediVault
                <ArrowRight size={18} />
              </Link>


              <Link
                to="/signup"
                className="flex items-center justify-center rounded-xl border border-slate-200 bg-white px-7 py-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Create an account
              </Link>

            </div>


            {/* Highlights */}
            <div className="mt-8 flex flex-wrap gap-6">

              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-blue-600" />
                <span className="text-sm text-slate-600">
                  Role-based access
                </span>
              </div>


              <div className="flex items-center gap-2">
                <FileHeart size={18} className="text-blue-600" />
                <span className="text-sm text-slate-600">
                  Unified records
                </span>
              </div>


              <div className="flex items-center gap-2">
                <Users size={18} className="text-blue-600" />
                <span className="text-sm text-slate-600">
                  Built for healthcare teams
                </span>
              </div>

            </div>

          </div>


          {/* RIGHT - HERO IMAGE */}
          <div className="relative flex items-center justify-center">

            {/* Background glow */}
            <div className="absolute h-[500px] w-[500px] rounded-full bg-blue-100 blur-3xl" />

            <img
              src="/hero.png"
              alt="MediVault healthcare dashboard"
              className="relative z-10 w-full max-w-[760px] object-contain lg:-translate-y-12"
            />

          </div>

        </div>

      </section>


      {/* FEATURES */}
      <section
        id="features"
        className="border-t border-slate-200 bg-white"
      >

        <div className="mx-auto max-w-7xl px-6 py-20">

          <div className="max-w-2xl">

            <p className="text-sm font-bold text-blue-600">
              ONE CONNECTED PLATFORM
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Healthcare information, organized.
            </h2>

            <p className="mt-4 text-slate-600">
              Everything you need to manage modern healthcare workflows
              in one connected platform.
            </p>

          </div>


          <div className="mt-10 grid gap-6 md:grid-cols-3">

            {/* Card 1 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <FileHeart size={22} />
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Unified Health Records
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Patient history, visits, prescriptions and reports
                connected in one place.
              </p>

            </div>


            {/* Card 2 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <Activity size={22} />
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Connected Care
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Give healthcare teams a clear view of the information
                they need.
              </p>

            </div>


            {/* Card 3 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <ShieldCheck size={22} />
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Secure Access
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Role-based access keeps healthcare information available
                to the right people.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Activity size={16} className="text-blue-600" />
            MediVault
          </div>

          <span className="text-sm text-slate-500">
            Secure · Simple · Connected
          </span>

        </div>

      </footer>

    </div>
  );
}

export default LandingPage;