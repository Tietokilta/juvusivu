import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "committee_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"photo_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "committee_members_locales" (
  	"role" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "committee_members_id" integer;
  ALTER TABLE "committee_members" ADD CONSTRAINT "committee_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "committee_members_locales" ADD CONSTRAINT "committee_members_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."committee_members"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "committee_members_photo_idx" ON "committee_members" USING btree ("photo_id");
  CREATE INDEX "committee_members_updated_at_idx" ON "committee_members" USING btree ("updated_at");
  CREATE INDEX "committee_members_created_at_idx" ON "committee_members" USING btree ("created_at");
  CREATE UNIQUE INDEX "committee_members_locales_locale_parent_id_unique" ON "committee_members_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_committee_members_fk" FOREIGN KEY ("committee_members_id") REFERENCES "public"."committee_members"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_committee_members_id_idx" ON "payload_locked_documents_rels" USING btree ("committee_members_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "committee_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "committee_members_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "committee_members" CASCADE;
  DROP TABLE "committee_members_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_committee_members_fk";
  
  DROP INDEX "payload_locked_documents_rels_committee_members_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "committee_members_id";`)
}
