// "use client"

import Header from "@/components/header/header";
import Image from "next/image";

function Contact() {
  return (
    <div className="flex container mx-auto md:flex-nowrap justify-center items-center dark:bg-black dark:text-white md:py-10">
      <div className="flex flex-col md:flex-row md:justify-between w-[90%] relative gap-3 lg:gap-7 h-fit">
        <div className="w-full h-52 md:h-72 relative block md:hidden">
            <Image
              src="/images/contact/Rectangle.png"
              alt="Gambar hotel"
              fill
            />
        </div>

        <div className="left-side w-full max-md:h-[55%]  md:w-[45%] bg-amber-200 rounded-[15px] text-center py-10">
          <h1 className="text-center my-10 font-medium">Get In Touch</h1>
          <form action="https://formspree.io/f/mwkgjnpj" method="POST">
            <div className="name-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name..."
                className="w-[85%] px-4 py-2 rounded-md focus:outline-none focus:bg-slate-50 mb-8"
              />
            </div>

            <div className="email-form">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email..."
                className="w-[85%] px-4 py-2 rounded-md focus:outline-none focus:bg-slate-50 mb-8"
              />
            </div>

            <div className="form-message">
              <textarea
                name="message"
                id="message"
                placeholder="How we can help you?"
                className="w-[85%] px-4 py-2 rounded-md focus:outline-none focus:bg-slate-50"
              ></textarea>
            </div>

            <button className="mt-6 bg-amber-400 w-[85%] py-2 rounded-md">
              Submit
            </button>
          </form>
        </div>

        <div className="right-side w-[55%] relative hidden md:block">
            <Image
              src="/images/contact/Rectangle.png"
              alt="Gambar hotel"
              fill
            />
        </div>
      </div>
    </div>
  );
}

export default Contact;
