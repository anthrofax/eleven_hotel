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
import { useBookingContext } from "@/context/booking-context";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import useDetailRoom from "@/hooks/useDetailRoom";
import Error from "../../error";
import { Ulasan } from "@/models/ulasan";

function Page() {
  const [isReviewLoading, setIsReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState<null | string>(null);
  const roomReviews = useRef<Ulasan[]>();

  let { slug } = useParams();
  const {
    bookingCart,
    bookingStage,
    setDataJumlahAnak,
    setDataJumlahOrangDewasa,
    setCheckinDate,
    setCheckoutDate,
    setBookingCart,
  } = useBookingContext();

  if (Array.isArray(slug)) slug = slug[0];

  const { error, reset, isLoading, room, hargaDiskon } = useDetailRoom(slug);

  useEffect(
    function () {
      if (bookingStage !== "payment" && bookingCart.length > 0) {
        setDataJumlahAnak(0);
        setDataJumlahOrangDewasa(0);
        setCheckinDate(null);
        setCheckoutDate(null);
        setBookingCart([]);
      }
    },
    [bookingCart, bookingStage]
  );

  useEffect(
    function () {
      roomReviews.current = undefined;
      async function getReview() {
        try {
          setIsReviewLoading(true);
          if (!room) return;

          roomReviews.current = await getRoomReviews(room._id);
        } catch (err) {
          console.log("Error Fetch Review: " + err);
          setReviewError("Fetch data review Error");
        } finally {
          setIsReviewLoading(false);
          setReviewError(null);
        }
      }

      getReview();
    },
    [room]
  );

  if (!room || isLoading) return <LoadingSpinner />;

  if (error)
    return (
      <Error error="Ruangan yang anda cari tidak tersedia" reset={reset} />
    );

  return (
    <div className="px-3 md:px-10 flex flex-col gap-10">
      <HotelPhotoGallery photos={room.gambar} className="md:hidden" />

      <div className="gap-5 hidden md:flex">
        <HotelPhotoGallery photos={room.gambar} />

        <div className="md:col-span-4 rounded-xl shadow-lg dark:shadow dark:shadow-white sticky top-10 h-fit overflow w-[40%]">
          <BookRoomCTA hargaDiskon={hargaDiskon} room={room} slug={slug} />
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

      {isReviewLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="shadow dark:shadow-white rounded-lg p-6">
          <div className="items-center mb-4">
            <p className="md:text-2xl font-semibold text-secondary">
              Ulasan Pelaggan
            </p>
          </div>

          {roomReviews.current?.length !== 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RoomReview
                roomReviews={roomReviews.current!}
                reviewIsLoading={isReviewLoading}
                reviewError={reviewError}
              />
            </div>
          ) : (
            <h1>Ulasan untuk kamar ini belum tersedia.</h1>
          )}
        </div>
      )}

      <div className="md:hidden md:col-span-4 rounded-xl shadow-lg dark:shadow dark:shadow-white top-10 h-fit overflow-hidden">
        <BookRoomCTA hargaDiskon={hargaDiskon} room={room} slug={slug} />
      </div>
    </div>
  );
}

export default Page;
