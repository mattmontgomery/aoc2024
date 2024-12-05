const LEVELS = inputs["2"];

const PARSED_LEVELS = LEVELS.trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

export default function dayTwo() {
  const partOne = PARSED_LEVELS.map((row) => {
    const steps = row.map((v, i): number => {
      if (i === 0) return 0;
      return v - row[i - 1];
    });
    // check that the steps are all either ascending or descending
    const ascendingOrDescending =
      steps.slice(1).every((v) => v > 0) || steps.slice(1).every((v) => v < 0);
    return steps.map(Math.abs).every((v) => v <= 3) && ascendingOrDescending;
  }).reduce((acc, curr) => acc + (curr ? 1 : 0), 0);

  const partTwo = PARSED_LEVELS.map((row) => {
    const steps = row.map((v, i): number => {
      if (i === 0) return 0;
      return v - row[i - 1];
    });
    const ascendingOrDescending =
      steps.slice(1).every((v) => v > 0) || steps.slice(1).every((v) => v < 0);
    const ascending = steps.slice(1).filter((v) => v > 0);
    const descending = steps.slice(1).filter((v) => v < 0);
    const ascendingOrDescendingWithOneViolation =
      ascending.length > 1 ? descending.length <= 1 : ascending.length <= 1;
    const maxStep = steps.map(Math.abs).every((v) => v <= 3);
    const maxStepWithOneViolation =
      steps.map(Math.abs).filter((v) => !(v <= 3)).length <= 1;
    if (!ascendingOrDescending) {
      console.log(
        row.join(" ").padEnd(24),
        ascendingOrDescending,
        " ",
        steps.length,
        [ascending.length, descending.length],
        [ascending.length > 1 ? descending.length <= 1 : ascending.length <= 1],
      );
    }
    return (
      (maxStep && ascendingOrDescendingWithOneViolation) ||
      (maxStepWithOneViolation && ascendingOrDescending)
    );
  }).reduce((acc, curr) => acc + (curr ? 1 : 0), 0);

  const partTwo_Repeat = PARSED_LEVELS.map((row) => {
    const results = row.map((v, i) => {
      let result = false;
      if (i === 0) return true;
      // Get the polarity of results so far
      const polarity = row
        .slice(0, i)
        .map((v, j) => {
          return v > 0 ? v - row[j - 1] : undefined;
        })
        .slice(1) as number[];
      const polarityResult =
        (polarity.length > 1 &&
          (polarity.every((v) => v > 0) || polarity.every((v) => v < 0))) ||
        polarity.every((v) => v < 0);
      const maxStepResult = Math.abs(v - row[i - 1]) <= 3;
      return polarityResult && maxStepResult;
    });

    if (results.some((x) => !x)) {
      console.log(
        row.join(" ").padStart(24),
        " | ",
        results.map((x) => (x === true ? "1" : "0")).join(""),
      );
    }
    return results.filter((x) => !x).length <= 1;
  }).reduce((acc, curr) => acc + (curr ? 1 : 0), 0);

  return [partOne, partTwo, partTwo_Repeat];
}
