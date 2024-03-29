import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db: Kysely<any>) {
  await db.schema
    .createTable("tblcounter")
    .addColumn("counter", "text", (col) => col.primaryKey())
    .addColumn("tally", "integer")
    .execute();

  await db
    .insertInto("tblcounter")
    .values({
      counter: "hits",
      tally: 0,
    })
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db: Kysely<any>) {
  await db.schema.dropTable("tblcounter").execute();
}