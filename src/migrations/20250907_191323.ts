import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_body_locales" ADD COLUMN "content" jsonb;
  ALTER TABLE "pages_body" DROP COLUMN "content";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_body" ADD COLUMN "content" jsonb NOT NULL;
  ALTER TABLE "pages_body_locales" DROP COLUMN "content";`)
}
