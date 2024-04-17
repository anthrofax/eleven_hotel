import { defineField } from "sanity";

const booking = {
  name: "booking",
  title: "Booking",
  type: "document",
  fields: [
    defineField({
      name: "user",
      title: "User",
      type: "reference",
      to: { type: "user" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "kamarHotel",
      title: "Kamar Hotel",
      type: "reference",
      to: { type: "kamarHotel" },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "tanggalCheckin",
      title: "Tanggal Check-in",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tanggalCheckout",
      title: "Tanggal Check-out",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "masaInap",
      title: "Berapa hari pelanggan menginap",
      type: "number",
      initialValue: 1,
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "diskon",
      title: "Diskon",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "jumlahOrangDewasa",
      title: "Jumlah orang dewasa",
      type: "number",
      initialValue: 1,
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "jumlahAnak",
      title: "Jumlah anak",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "hargaTotal",
      title: "Harga Total",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
  ],
};

export default booking;
