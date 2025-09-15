import { BlocksFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import { MainPage } from "./src/lib/api/mainPage";
import { EventGridBlock } from "@components/lexical/Blocks";
import { Media } from "@lib/api/Media";
import { azureStorage } from "@payloadcms/storage-azure";
import { isCloudStorageEnabled } from "@util/index";
import { migrations } from "./src/migrations";

const {
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  AZURE_STORAGE_CONNECTION_STRING,
  AZURE_STORAGE_CONTAINER_NAME,
  AZURE_STORAGE_ACCOUNT_BASEURL,
  AZURE_STORAGE_ALLOW_CONTAINER_CREATE,
} = process.env;

const forceMigrations = process.env.FORCE_MIGRATIONS === "true";

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
          admin: {
            description: "When false, only name of the event is shown publicly",
          },
        },
        {
          name: "loading",
          type: "checkbox",
          localized: false,
          defaultValue: false,
          admin: {
            description:
              "Set to true to show loading state even if event is released",
          },
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
        {
          name: "logo",
          type: "relationship",
          relationTo: "media",
          localized: false,
        },
      ],
    },
    {
      slug: "pages",
      fields: [
        {
          name: "title",
          type: "text",
          localized: true,
          required: true,
        },
        {
          name: "slug",
          type: "text",
          localized: false,
          required: true,
        },
        {
          name: "body",
          type: "array",
          labels: { singular: "Section", plural: "Sections" },
          // maxRows: 20, // optional limit
          fields: [
            {
              name: "title",
              type: "text",
              localized: true,
              required: false,
            },
            {
              name: "path",
              type: "text",
              localized: false,
              required: false,
            },
            {
              name: "content",
              type: "richText",
              editor: lexicalEditor(),
              localized: true,
            },
          ],
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

  plugins: [
    azureStorage({
      enabled: isCloudStorageEnabled() || forceMigrations, // Migrations need production config
      connectionString: AZURE_STORAGE_CONNECTION_STRING ?? "",
      containerName: AZURE_STORAGE_CONTAINER_NAME ?? "",
      allowContainerCreate: AZURE_STORAGE_ALLOW_CONTAINER_CREATE === "true",
      baseURL: AZURE_STORAGE_ACCOUNT_BASEURL ?? "",
      collections: {
        [Media.slug]: {
          disableLocalStorage: true,
          prefix: Media.slug,
        },
      },
    }),
  ],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || "",

  db: postgresAdapter({
    pool: {
      connectionString: `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
      ssl: process.env.NODE_ENV === "production",
    },
    prodMigrations: migrations,
  }),

  onInit: async (payloadInstance) => {
    const { PAYLOAD_DEFAULT_USER_EMAIL, PAYLOAD_DEFAULT_USER_PASSWORD } =
      process.env;
    if (PAYLOAD_DEFAULT_USER_EMAIL && PAYLOAD_DEFAULT_USER_PASSWORD) {
      const email = PAYLOAD_DEFAULT_USER_EMAIL;
      const password = PAYLOAD_DEFAULT_USER_PASSWORD;

      // check if the user exists, if not, create it
      const user = await payloadInstance.find({
        collection: "users",
        where: { email: { equals: email } },
      });
      if (user.totalDocs === 0) {
        payloadInstance.logger.warn(`user ${email} not found, creating...`);
        await payloadInstance.create({
          collection: "users",
          data: {
            email,
            password,
          },
        });
      } else {
        payloadInstance.logger.info(
          `user ${email} found, resetting password...`,
        );
        const defaultUser = user.docs[0];
        await payloadInstance.update({
          collection: "users",
          id: defaultUser.id,
          data: { password },
        });
      }
    }
  },
});
