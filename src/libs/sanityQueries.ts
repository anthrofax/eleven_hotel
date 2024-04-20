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