"use client";

import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useThemeContext } from "../../context/themeContext";
import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

function Header() {
  const { darkTheme, setDarkTheme } = useThemeContext();

  const { data: session } = useSession();

  return (
    <header className="py-10 px-4 container mx-auto text-xl flex flex-wrap md:flex-nowrap items-center justify-between dark:bg-black dark:text-white">
      <div className="flex items-center w-full md:2/3">
        <Link href="/" className="font-black text-tertiary-dark">
          Eleven Hotel
        </Link>

        <ul className="flex items-center ml-5">
          <li className="flex items-center">
            {session ? (
              <Link href={`/users/${session.user.id}`}>
                <div className="w-10 h-10 rounded-full overflow-hidden flex justify-center items-center">
                  <Image
                    className=" scale-animation"
                    src={session.user.image as string}
                    alt={session.user.name as string}
                    width={40}
                    height={40}
                  />
                </div>
              </Link>
            ) : (
              <Link href="/auth">
                <FaUserCircle className="cursor-pointer" />
              </Link>
            )}
          </li>
          <li className="ml-2">
            {darkTheme ? (
              <MdOutlineLightMode
                className="cursor-pointer"
                onClick={() => {
                  setDarkTheme(false);
                  localStorage.removeItem("hotel-theme");
                }}
              />
            ) : (
              <MdDarkMode
                className="cursor-pointer"
                onClick={() => {
                  setDarkTheme(true);
                  localStorage.setItem("hotel-theme", "true");
                }}
              />
            )}
          </li>
        </ul>
      </div>

      <ul className="flex items-center justify-between md:justify-end w-full mt-4 md:gap-5">
        <li className="hover:-translate-y-2 duration-500 transition-all text-base md:text-xl">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:-translate-y-2 duration-500 transition-all text-base md:text-lg lg:text-xl">
          <Link href="/rooms">Rooms</Link>
        </li>
        <li className="hover:-translate-y-2 duration-500 transition-all text-base md:text-lg lg:text-xl">
          <Link href="/contact">Contact</Link>
        </li>
        <li className="hover:-translate-y-2 duration-500 transition-all text-base md:text-lg lg:text-xl">
          <Link href="/about-us">About Us</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
