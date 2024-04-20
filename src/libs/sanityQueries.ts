import { groq } from 'next-sanity';

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