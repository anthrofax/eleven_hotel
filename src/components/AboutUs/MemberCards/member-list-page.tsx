import Image from "next/image";
import MemberCard from "./member-card";

function MemberListPage() {
  return (
    <section className="py-10 px-20 bg-white dark:bg-black1">
      <h1 className="text-center font-medium text-2xl sm:text-3xl tracking-widest">
        OUR AWESOME MINDS
      </h1>
      <p className="mt-5 text-sm sm:text-base w-[80%] leading-8 text-center mx-auto mb-10">
        Ide Cemerlang dibalik Volunteeria
      </p>

      <div className="hidden sm:flex flex-col gap-20">
        <div className="flex flex-col sm:flex-row gap-20 justify-center items-center">
          <MemberCard memberId="edo" />
          <MemberCard memberId="edo" />
          <MemberCard memberId="edo" />
        </div>
        <div className="flex flex-col sm:flex-row gap-20 justify-center items-center">
          <MemberCard memberId="edo" />
          <MemberCard memberId="edo" />
          <MemberCard memberId="edo" />
          <MemberCard memberId="edo" />
        </div>
        <div className="flex flex-col sm:flex-row gap-20 justify-center items-center">
          <MemberCard memberId="edo" />
          <MemberCard memberId="edo" />
          <MemberCard memberId="edo" />
          <MemberCard memberId="edo" />
        </div>
      </div>
    </section>
  );
}

export default MemberListPage;
