import { defineField } from "sanity";

const tipeKamar = [
  { title: "Basic", value: "basic" },
  { title: "Luxury", value: "luxury" },
  { title: "Suite", value: "suite" },
];

const kamarHotel = {
  name: "kamarHotel",
  title: "Kamar Hotel",
  type: "document",
  fields: [
    defineField({
      name: "nama",
      title: "Nama",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .max(50)
          .error("Maksimum karaketer untuk kolom nama adalah 50 karakter"),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "nama",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "deskripsi",
      title: "Deskripsi",
      type: "text",
      validation: (Rule) =>
        Rule.min(100).error("Deskripsi setidaknya memiliki 100 karakter!"),
    }),
    defineField({
      name: "harga",
      title: "Harga",
      type: "number",
      validation: (Rule) => Rule.min(500000).error("Minimum harga adalah Rp. 500.000,00-"),
    }),
    defineField({
      name: "diskon",
      title: "Diskon",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "gambar",
      title: "Gambar",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "url", title: "URL", type: "url" },
            { name: "file", title: "File", type: "file" },
          ],
        },
      ],
      validation: (Rule) =>
        Rule.required()
          .min(3)
          .error("Minimum gambar yang perlu diunggah sebanyak 3"),
    }),
    defineField({
      name: "coverGambar",
      title: "Cover Gambar",
      type: "object",
      fields: [
        { name: "url", title: "URL", type: "url" },
        { name: "file", title: "File", type: "file" },
      ],
      validation: (Rule) =>
        Rule.required().error(
          "Anda perlu mengunggah Cover Gambar untuk kamar hotel"
        ),
    }),
    defineField({
      name: "type",
      title: "Tipe Kamar",
      type: "string",
      options: {
        list: tipeKamar,
      },
      validation: (Rule) => Rule.required(),
      initialValue: "basic",
    }),
    defineField({
      name: "catatanPelanggan",
      title: "Catatan Pelanggan",
      type: "text",
      validation: (Rule) => Rule.required(),
      initialValue:
        "Check-in time is 12:00 PM, checkout time is 11:59 AM. If you leave behind any items, please contact the receptionist.",
    }),
    defineField({
      name: "dimensi",
      title: "Dimensi",
      type: "string",
    }),
    defineField({
      name: "jumlahKasur",
      title: "Jumlah Kasur",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
      initialValue: 1,
    }),
    defineField({
      name: "fasilitas",
      title: "Fasilitas",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", type: "string", title: "Icon" },
            { name: "fasilitas", type: "string", title: "Fasilitas" },
          ],
        },
      ],
    }),
    defineField({
      name: "isBooked",
      title: "Is Booked",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isFeatured",
      title: "Is Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "ulasan",
      title: "Ulasan",
      type: "array",
      of: [
        {
          type: "ulasan",
        },
      ],
    }),
  ],
};

export default kamarHotel;
