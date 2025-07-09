import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";

const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } = process.env;

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define and configure your collections in this array
  collections: [
    {
      slug: "events",
      fields: [
        {
          name: "title",
          type: "text",
        },
        {
          name: "description",
          type: "textarea",
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

  // Seeding for development
  onInit: async (payload) => {
    if (!process.env.NEXT_PUBLIC_PAYLOAD_DEVELOPMENT) {
      return;
    }
    const events = await payload.find({ collection: "events", limit: 1 });
    if (events.totalDocs === 0) {
      for (let i = 1; i <= 6; i++) {
        await payload.create({
          collection: "events",
          data: {
            title: `Event ${i}`,
            description: "Description for event",
          },
        });
      }
    }
    const sponsors = await payload.find({ collection: "sponsors", limit: 1 });
    if (sponsors.totalDocs === 0) {
      for (let i = 1; i <= 3; i++) {
        await payload.create({
          collection: "sponsors",
          data: {
            name: `Sponsor ${i}`,
            url: "https://tietokilta.fi/",
          },
        });
      }
    }
  },
});
