import { GlobalConfig } from "payload";

export const MainPage: GlobalConfig = {
  slug: "mainPage",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "body",
      type: "richText",
      required: true,
      localized: true,
    },
  ],
};
