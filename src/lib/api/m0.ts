import { GlobalConfig } from "payload";

export const m0config: GlobalConfig = {
  slug: "m0config",
  label: "Muistinnollaus",
  fields: [
    {
      name: "eventDate",
      type: "date",
      localized: false,
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "hideContents",
      type: "checkbox",
      localized: false,
      admin: {
        description: "When true, only shows countdown on the M0 page",
      },
    },
    {
      name: "description",
      type: "richText",
      localized: true,
    },
    {
      name: "defaultVariant",
      type: "text",
      localized: false,
      admin: {
        description: "Default ilmomasiina slug to use for /m0 page",
      },
    },
    {
      name: "variants",
      type: "array",
      localized: false,
      fields: [
        {
          name: "ilmo",
          type: "text",
          admin: {
            description: "Ilmomasiina slug for this variant",
          },
        },
        {
          name: "label",
          type: "text",
          admin: {
            description: "Slug for this variant in this site (/m0/[label])",
          },
        },
      ],
    },
  ],
};
