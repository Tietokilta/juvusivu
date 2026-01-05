import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "m0config_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ilmo" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "m0config" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"event_date" timestamp(3) with time zone,
  	"hide_contents" boolean,
  	"default_variant" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "m0config_locales" (
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "events" ADD COLUMN "remove_padding" boolean;
  ALTER TABLE "m0config_variants" ADD CONSTRAINT "m0config_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."m0config"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "m0config_locales" ADD CONSTRAINT "m0config_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."m0config"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "m0config_variants_order_idx" ON "m0config_variants" USING btree ("_order");
  CREATE INDEX "m0config_variants_parent_id_idx" ON "m0config_variants" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "m0config_locales_locale_parent_id_unique" ON "m0config_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "m0config_variants" CASCADE;
  DROP TABLE "m0config" CASCADE;
  DROP TABLE "m0config_locales" CASCADE;
  ALTER TABLE "events" DROP COLUMN "remove_padding";`)
}
