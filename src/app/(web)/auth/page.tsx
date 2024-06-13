"use client";

import React, { useEffect } from "react";
import { ChangeEvent, FormEvent, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { signUp } from "next-auth-sanity/client";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ConfirmationBox from "@/components/ConfirmationBox/confirmation-box";
import { GoInfo } from "react-icons/go";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useForm } from "react-hook-form";

const defaultFormData = {
  email: "",
  name: "",
  password: "",
  image:
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
};

function Auth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
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

  async function loginHandler() {
    try {
      await signIn();
    } catch (err) {
      toast.error("Gagal melakukan login");
    }
  }

  async function signUpSubmit(data: any) {
    try {
      // Invoke POST request to api/sanity/signUp route.
      const user = await signUp(data);

      loginHandler();
      if (user) toast.success("Akun anda berhasil didaftarkan.");
    } catch (err) {
      console.log(err);
      toast.error("Terdapat kesalahan pada pendaftaran akun anda");
    } finally {
      reset;
    }
  }

  const confirmationBoxOptionObj = {
    customUI: ({ onClose }: { onClose: () => void }) => {
      return (
        <ConfirmationBox
          icon={<GoInfo />}
          judul="Konfirmasi Data"
          pesan="Apakah data yang anda masukkan sudah benar?"
          onClose={onClose}
          onClickIya={signUpSubmit}
          labelIya="Sudah"
          labelTidak="Oh iya, belum"
        />
      );
    },
  };

  return (
    <section className="container mx-auto bg-[#FFC436] rounded-3xl overflow-hidden relative w-[80%]">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-80 md:w-[70%] mx-auto ">
        <div className="flex mb-8 flex-col md:flex-row items-center justify-between z-10">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
            Create an Account
          </h1>
          <p>OR</p>
          <span className="inline-flex items-center">
            <AiFillGithub
              onClick={loginHandler}
              className="mr-3 text-4xl cursor-pointer text-black dark:text-white bg-white dark:bg-black2 overflow-hidden rounded-full"
            />{" "}
            |
            <FcGoogle
              onClick={loginHandler}
              className="ml-3 text-4xl cursor-pointer bg-white rounded-full"
            />
          </span>
        </div>

        <form
          action=""
          className="space-y-4 md:space-y-6 z-10 relative"
          method="POST"
          onSubmit={handleSubmit(() => confirmAlert(confirmationBoxOptionObj))}
        >
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="name@company.com"
              className={inputStyles}
              {...register("email", {
                required: "Mohon masukkan email",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email yang anda masukkan tidak valid",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500">{`${errors.email?.message}`}</p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="John Doe"
              className={inputStyles}
              {...register("name", {
                required: "Mohon masukkan nama anda",
              })}
            />
            {errors.name && (
              <p className="text-red-500">{`${errors.name?.message}`}</p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <input
              type="password"
              placeholder="Kata sandi"
              className={inputStyles}
              {...register("password", {
                required: "Mohon masukkan password",
              })}
            />
            {errors.password && (
              <p className="text-red-500">{`${errors.password?.message}`}</p>
            )}
          </div>

          <div className="flex flex-col gap-4 relative z-20">
            <button
              className="w-1/2 mx-auto bg-tertiary-dark text-white focus:outline-none md:rounded-full px-5 py-2.5 text-center"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="w-full flex justify-center">
          <button onClick={loginHandler} className="relative z-20">
            <span>Already have an account? </span>{" "}
            <span className="text-blue-700 underline pointer">Login</span>
          </button>
        </div>

        <Image
          src="/images/menara.png"
          alt="Menara"
          fill
          className="opacity-50"
        />
      </div>
    </section>
  );
}

export default Auth;
