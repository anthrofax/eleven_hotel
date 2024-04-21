import { defineField } from "sanity";

const user = {
  name: "user",
  title: "user",
  type: "document",
  fields: [
    defineField({
      name: "isAdmin",
      title: "Is Admin",
      type: "boolean",
      description: "Apakah pengguna merupakan admin?",
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Nama dari pengguna",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "image",
      type: "url",
    }),
    defineField({
      name: "password",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "email",
      type: "string",
      title: "Email",
    }),
    defineField({
      name: "emailVerified",
      type: "datetime",
      hidden: true,
    }),
    defineField({
      name: "tentang",
      title: "Tentang",
      type: "text",
      description: "Deskripsi singkat dari pengguna",
    }),
  ],
};

export default user;
