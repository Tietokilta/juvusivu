import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "m0config" ADD COLUMN "show_description_from_ilmo" boolean;
  ALTER TABLE "m0config" ADD COLUMN "show_quota_info" boolean;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "m0config" DROP COLUMN "show_description_from_ilmo";
  ALTER TABLE "m0config" DROP COLUMN "show_quota_info";`)
}
