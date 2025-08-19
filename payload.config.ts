import { BlocksFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import { MainPage } from "./src/lib/api/mainPage";
import { EventGridBlock } from "@components/lexical/Blocks";

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
