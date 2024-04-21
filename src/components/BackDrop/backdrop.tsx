function Backdrop({ isOpen }: { isOpen: boolean }) {
  return isOpen ? (
    <div className="fixed z-[60] top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.8)]" />
  ) : (
    <></>
  );
}

export default Backdrop;
