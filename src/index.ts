import cli from "cli";
import * as days from "./days";

const args = cli.parse({
  day: ["day", "Which day are you running?", "number"],
});

cli.debug(`Running day ${args.day}`);

if (!(`day${args.day}` in days)) {
  cli.error(`Day ${args.day} is not implemented`);
  process.exit(1);
} else {
  const day = days[`day${args.day}` as keyof typeof days];
  const result = day();
  cli.info(result);
}
