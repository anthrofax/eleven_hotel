// "use client"

import Header from "@/components/header/header"
import Image from "next/image";


function Contact() {
    return (
      <div className=" flex px-2 container mx-auto md:flex-nowrap justify-evenly dark:bg-black dark:text-white">
        <div className="flex justify-between w-[80%] ">
          <div className="left-side w-[45%] bg-amber-200 rounded-[15px] text-center">
            <h1 className="text-center my-10 font-medium">Get In Touch</h1>
            <form action="#">
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
                  type="text"
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
  
              <button className="mt-6 bg-amber-400 w-[85%] py-2 rounded-md">Submit</button>
            </form>
          </div>
  
          <div className="right-side w-[45%]   ">
            <figure>
              <img src="/images/contact/Rectangle.png" alt="Gambar hotel"  className="w-full"/>
            </figure>
          </div>
        </div>
      </div>
    );
  }
  

export default Contact;