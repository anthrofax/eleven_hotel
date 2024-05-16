function Header() {
  return (
    <header className="first-section h-[576px] w-full bg-tertiary-superLight flex justify-center items-center">
      <div className="w-[85%] h-[85%] bg-slate-700 bg-[url('/images/about-us/header-image.png')] bg-blend-multiply mx-auto bg-no-repeat bg-cover bg-fixed flex items-center justify-center">
        <h1 className="text-white text-3xl sm:text-5xl font-bold tracking-widest">
          ABOUT US
        </h1>
      </div>
    </header>
  );
}

export default Header;
