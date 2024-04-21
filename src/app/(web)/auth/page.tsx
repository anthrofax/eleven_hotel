"use client";

import React, { useEffect } from "react";
import { ChangeEvent, FormEvent, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { signUp } from "next-auth-sanity/client";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const defaultFormData = {
  email: "",
  name: "",
  password: "",
};

function Auth() {
  const [formData, setFormData] = useState(defaultFormData);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(
    function () {
      if (!session) return;

      router.push("/");
    },
    [router, session]
  );

  const inputStyles =
    "border border-gray-300 sm:text-sm text-black rounded-lg block w-full p-2.5 focus:outline-none";

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  async function loginHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await signIn();

      toast.success("Login berhasil dilakukan");

      // router.push("/");
    } catch (err) {
      toast.error("Gagal melakukan login");
    }
  }

  async function signUpSubmit(event: FormEvent<HTMLFormElement> | undefined) {
    if (event) event.preventDefault();

    try {
      // Invoke POST request to api/sanity/signUp route.
      const user = await signUp(formData);

      if (user) toast.success("Akun anda berhasil didaftarkan.");
    } catch (err) {
      console.log(err);
      toast.error("Terdapat kesalahan pada pendaftaran akun anda");
    } finally {
      setFormData(defaultFormData);
    }
  }

  return (
    <section className="container mx-auto">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-80 md:w-[70%] mx-auto">
        <div className="flex mb-8 flex-col md:flex-row items-center justify-between">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
            Create an Account
          </h1>
          <p>OR</p>
          <span className="inline-flex items-center">
            <AiFillGithub
              onClick={loginHandler}
              className="mr-3 text-4xl cursor-pointer text-black dark:text-white"
            />{" "}
            |
            <FcGoogle
              onClick={loginHandler}
              className="ml-3 text-4xl cursor-pointer"
            />
          </span>
        </div>

        <form
          action=""
          className="space-y-4 md:space-y-6"
          onSubmit={signUpSubmit}
        >
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="name@company.com"
            required
            className={inputStyles}
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            required
            className={inputStyles}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="password"
            required
            minLength={6}
            className={inputStyles}
          />
          <button
            type="submit"
            className="w-full bg-tertiary-dark focus:outline-none md:rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Sign Up
          </button>

          <button onClick={loginHandler} className="text-blue-700 underline">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default Auth;
