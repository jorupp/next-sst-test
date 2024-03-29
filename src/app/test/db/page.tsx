import { Kysely } from "kysely";
import { DataApiDialect } from "kysely-data-api";
import { RDSData } from "@aws-sdk/client-rds-data";
import { RDS } from "sst/node/rds";

export const dynamic = "force-dynamic";

let firstRenderTime: string | null = null;

interface Database {
  tblcounter: {
    counter: string;
    tally: number;
  };
}

export default async function DbPage() {
  console.log(RDS.Cluster);
  console.log({
    database: RDS.Cluster.defaultDatabaseName,
    secretArn: RDS.Cluster.secretArn,
    resourceArn: RDS.Cluster.clusterArn,
  })

  const db = new Kysely<Database>({
    dialect: new DataApiDialect({
      mode: "postgres",
      driver: {
        database: RDS.Cluster.defaultDatabaseName,
        secretArn: RDS.Cluster.secretArn,
        resourceArn: RDS.Cluster.clusterArn,
        client: new RDSData({}),
      },
    }),
  });

  const record = await db
    .selectFrom("tblcounter")
    .select("tally")
    .where("counter", "=", "hits")
    .executeTakeFirstOrThrow();

  let count = record.tally;

  // TODO: see how to do a real atomic update statement
  await db
    .updateTable("tblcounter")
    .set({
      tally: ++count,
    })
    .execute();
      
  const time = new Date().toLocaleString();
  if (!firstRenderTime) {
    firstRenderTime = time;
  }
  return (
    <div>
      <ul>
        <li>First Time: {firstRenderTime}</li>
        <li>Time: {time}</li>
        <li>Count: {count}</li>
      </ul>
    </div>
  );
}
