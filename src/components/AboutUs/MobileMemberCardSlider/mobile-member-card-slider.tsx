"use client";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import { memberData } from "@/data/member-data";
import MemberCard from "../MemberCards/member-card";

import { useState } from "react";
import MemberCardSliderButton from "@/components/AboutUs/MemberCardSliderButton/member-card-slider-button";

function MobileMemberCardSlider() {
  const memberIdList: string[] = [];
  memberData.forEach((_, key) => memberIdList.push(key));
  console.log(memberIdList);
  const [memberListState, setMemberListState] = useState(memberIdList[0]);

  function handleSlideChange(swiper: any) {
    // Mendapatkan slide index saat ini
    const currentIndex = swiper.activeIndex;

    // Memperbarui state member card id berdasarkan slide index saat ini
    setMemberListState(memberIdList[currentIndex]);
  }

  return (
    <div className="w-full lg:hidden">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        className="xl:h-[520px] mb-5 relative"
        onSlideChange={handleSlideChange}
      >
        {memberIdList.map((_, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="h-[460px] relative group flex justify-center items-center transition-all cursor-pointer">
                <MemberCard memberId={memberListState} />;
              </div>
            </SwiperSlide>
          );
        })}
        {/* Tombol Slider */}
        <MemberCardSliderButton
          containerStyles="flex gap-2 absolute right-1/2 translate-x-1/2 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 justify-between xl:w-max xl:justify-none w-[95%]"
          btnStyles="bg-tertiary-light hover:bg-primary text-primary hover:text-white rounded-full text-[22px] w-[44px] aspect-square flex justify-center items-center transition-all"
        />
      </Swiper>
    </div>
  );
}

export default MobileMemberCardSlider;
