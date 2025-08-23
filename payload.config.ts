import { BlocksFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import { MainPage } from "./src/lib/api/mainPage";
import { EventGridBlock } from "@components/lexical/Blocks";
import { Media } from "@lib/api/Media";

const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } = process.env;

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      BlocksFeature({
        blocks: [EventGridBlock],
      }),
    ],
  }),

  localization: {
    locales: ["en", "fi"],
    defaultLocale: "fi",
  },

  // Define and configure your collections in this array
  collections: [
    {
      slug: "events",
      fields: [
        {
          name: "title",
          type: "text",
          localized: true,
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          localized: true,
        },
        {
          name: "slug",
          type: "text",
          localized: false,
        },
        {
          name: "released",
          type: "checkbox",
          localized: false,
          defaultValue: false,
        },
        {
          name: "date",
          type: "date",
          localized: false,
        },
        {
          name: "photo",
          type: "relationship",
          relationTo: "media",
          localized: false,
        },
      ],
    },
    {
      slug: "sponsors",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "url",
          type: "text",
          required: true,
        },
      ],
    },
    {
      slug: "links",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "page",
          type: "text",
          required: true,
        },
      ],
    },
    Media,
  ],

  globals: [MainPage],

  admin: {
    autoLogin:
      process.env.NEXT_PUBLIC_PAYLOAD_DEVELOPMENT === "true" &&
      process.env.NEXT_PUBLIC_PAYLOAD_DEVELOPMENT_PASSWORD &&
      process.env.NEXT_PUBLIC_PAYLOAD_DEVELOPMENT_EMAIL
        ? {
            email: process.env.NEXT_PUBLIC_PAYLOAD_DEVELOPMENT_EMAIL,
            password: process.env.NEXT_PUBLIC_PAYLOAD_DEVELOPMENT_PASSWORD,
          }
        : false,
  },

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || "",

  db: postgresAdapter({
    pool: {
      connectionString: `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    },
  }),
});
