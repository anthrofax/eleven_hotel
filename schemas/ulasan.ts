import { defineField } from "sanity";

const ulasan = {
  name: "ulasan",
  title: "Ulasan",
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
      name: "teks",
      title: "Teks Ulasan",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ratingPengguna",
      title: "Rating Pengguna",
      type: "number",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(5)
          .error("Ulasan harus berada di rentang 1 - 5"),
    }),
  ],
};

export default ulasan;
