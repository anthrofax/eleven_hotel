import MemberCard from "./member-card";
import MobileMemberCardSlider from "@/components/AboutUs/MobileMemberCardSlider/mobile-member-card-slider";

function MemberListPage() {
  return (
    <section className="py-10 md:px-20 bg-white dark:bg-black dark:text-white">
      <h1 className="text-center font-medium text-2xl sm:text-3xl tracking-widest">
        OUR AWESOME MINDS
      </h1>
      <p className="mt-5 text-sm sm:text-base w-[80%] leading-8 text-center mx-auto mb-10">
        Ide Cemerlang dibalik Eleven Hotel
      </p>

      <MobileMemberCardSlider />

      <div className="hidden lg:flex flex-col gap-20">
        <div className="flex flex-col sm:flex-row gap-20 justify-center items-center">
          <MemberCard memberId="alma" />
          <MemberCard memberId="gudang" />
          <MemberCard memberId="risma" />
        </div>
        <div className="flex flex-col sm:flex-row gap-20 justify-center items-center">
          <MemberCard memberId="mahes" />
          <MemberCard memberId="sopian" />
          <MemberCard memberId="zulhi" />
          <MemberCard memberId="yesaya" />
        </div>
        <div className="flex flex-col sm:flex-row gap-20 justify-center items-center">
          <MemberCard memberId="edo" />
          <MemberCard memberId="adit" />
          <MemberCard memberId="ari" />
          <MemberCard memberId="ikhsan" />
        </div>
      </div>
    </section>
  );
}

export default MemberListPage;
