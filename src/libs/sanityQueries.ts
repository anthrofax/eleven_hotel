import { groq } from "next-sanity";

export const getFeaturedRoomQuery = groq`*[_type == "kamarHotel" && isFeatured == true][0] {
    _id,
    deskripsi,
    diskon,
    gambar,
    isFeatured,
    nama,
    harga,
    slug,
    coverGambar
}`;

export const getRoomsQuery = groq`*[_type == "kamarHotel"] {
    _id, 
    coverGambar,
    deskripsi,
    dimensi,
    isBooked,
    isFeatured,
    nama,
    harga,
    slug,
    type
}`;

export const getRoom = groq`*[_type == "kamarHotel" && slug.current == $slug][0] {
    _id,
    coverGambar,
    deskripsi,
    dimensi,
    diskon,
    gambar,
    isBooked,
    isFeatured,
    nama,
    jumlahKasur,
    fasilitas,
    harga,
    slug,
    catatanPelanggan,
    type
}`;

export const getUserBookingsQuery = groq`*[_type == 'booking' && user._ref == $userId] {
    _id,
    kamarHotel -> {
        _id,
        nama,
        slug,
        harga
    },
    tanggalCheckin,
    tanggalCheckout,
    masaInap,
    jumlahOrangDewasa,
    jumlahAnak,
    hargaTotal,
    diskon
}`;

export const getUserDataQuery = groq`*[_type == 'user' && _id == $userId][0] {
    _id,
    name,
    email,
    isAdmin,
    tentang,
    _createdAt,
    image,
}`;

export const getRoomReviewsQuery = groq`*[_type == "ulasan" && kamarHotel._ref == $roomId] {
    _createdAt,
    _id,
    teks,
    user -> {
        name
    },
    ratingPengguna
}`;

export const getLayananTambahan = groq`*[_type == "layananTambahan"] {
    deskripsi,
    harga,
    oneQuantityService,
    nama,
    "gambar": gambar.asset->url,
    _id
}`;
