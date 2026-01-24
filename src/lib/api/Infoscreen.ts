import { GlobalConfig } from "payload";

export const Infoscreen: GlobalConfig = {
  slug: "infoscreen",
  fields: [
    {
      name: "body",
      type: "richText",
      required: true,
      localized: true,
    },
  ],
};
