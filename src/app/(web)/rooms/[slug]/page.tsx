"use client";

import HotelPhotoGallery from "@/components/HotelPhotoGallery/hotel-photo-gallery";
import { getRoom, getRoomReviews } from "@/libs/apis";
import useSWR from "swr";
import LoadingSpinner from "../../loading";
import { MdOutlineCleaningServices } from "react-icons/md";
import { LiaFireExtinguisherSolid } from "react-icons/lia";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { GiSmokeBomb } from "react-icons/gi";
import BookRoomCTA from "@/components/BookRoomCTA/book-room-cta";
import RoomReview from "@/components/RoomReview/room-review";

import {
  BookingContextProvider,
  useBookingContext,
} from "@/context/booking-context";
import { useEffect, useState } from "react";

function Page() {
  const { room, isLoading } = useBookingContext();
  
  const {
    data: roomReviews,
    error: reviewError,
    isValidating: reviewIsValidating,
    isLoading: reviewIsLoading,
  } = useSWR("/api/room-reviews", getRoomReviews.bind(null, room?._id));

  useEffect(
    function () {
      console.log(roomReviews);
      console.log(reviewIsLoading);
      console.log(reviewIsValidating);
    },
    [roomReviews, reviewIsLoading, reviewIsValidating]
  );

  if (!room || isLoading) return <LoadingSpinner />;

  return (
    <BookingContextProvider>
      <div className="px-3 md:px-10 flex flex-col gap-10">
        <HotelPhotoGallery photos={room.gambar} className="md:hidden" />

        <div className="gap-5 hidden md:flex">
          <HotelPhotoGallery photos={room.gambar} />

          <div className="md:col-span-4 rounded-xl shadow-lg dark:shadow dark:shadow-white sticky top-10 h-fit overflow w-[40%]">
            <BookRoomCTA />
          </div>
        </div>

        <div>
          <h3 className="text-secondary text-3xl font-semibold mb-5">
            {room.nama}
          </h3>

          <p>{room.deskripsi}</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center w-3/4">
          <div className="mb-11">
            <h2 className="font-semibold text-2xl mb-2 text-secondary">
              Fasilitas yang Ditawarkan
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {room.fasilitas.map((fas: any) => (
                <div key={fas._key} className="flex items-center md:my-0 my-1">
                  <i className={`fa-solid ${fas.icon}`}></i>
                  <p className="text-xs md:text-base ml-2">{fas.fasilitas}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-11">
            <h2 className="font-semibold text-2xl mb-2 text-secondary">
              Keamanan & Higienis
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center my-1 md:my-0">
                <MdOutlineCleaningServices />
                <p className="ml-2 md:text-base text-xs">Daily Cleaning</p>
              </div>
              <div className="flex items-center my-1 md:my-0">
                <LiaFireExtinguisherSolid />
                <p className="ml-2 md:text-base text-xs">Fire Extinguishers</p>
              </div>
              <div className="flex items-center my-1 md:my-0">
                <AiOutlineMedicineBox />
                <p className="ml-2 md:text-base text-xs">
                  Disinfections and Sterilizations
                </p>
              </div>
              <div className="flex items-center my-1 md:my-0">
                <GiSmokeBomb />
                <p className="ml-2 md:text-base text-xs">Smoke Detectors</p>
              </div>
            </div>
          </div>
        </div>

        {reviewIsValidating ||
        reviewIsLoading ||
        ((roomReviews && roomReviews.length > 0) && !reviewIsValidating && !reviewIsLoading) ? (
          <div className="shadow dark:shadow-white rounded-lg p-6">
            <div className="items-center mb-4">
              <p className="md:text-2xl font-semibold text-secondary">
                Ulasan Pelaggan
              </p>
            </div>

            {!reviewIsLoading && !reviewIsValidating && (roomReviews && roomReviews.length > 0) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RoomReview
                  roomReviews={roomReviews!}
                  reviewError={reviewError}
                  reviewIsLoading={reviewIsLoading}
                />
              </div>
            ) : (
              <LoadingSpinner />
            )}
          </div>
        ) : null}

        <div className="md:hidden md:col-span-4 rounded-xl shadow-lg dark:shadow dark:shadow-white top-10 h-fit overflow-hidden">
          <BookRoomCTA />
        </div>
      </div>
    </BookingContextProvider>
  );
}

export default Page;
