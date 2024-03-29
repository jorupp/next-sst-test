import { SSTConfig } from "sst";
import { NextjsSite, RDS } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "next-sst-test",
      region: "us-east-2",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const cluster = new RDS(stack, "Cluster", {
        engine: "postgresql13.9",
        defaultDatabaseName: 'ssttest',
        migrations: "services/migrations",
      });
      const site = new NextjsSite(stack, "site", {
        bind: [cluster],
      });
    
      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
