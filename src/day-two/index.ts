import { inputs } from "../../inputs";
import debug from "../debug";

const LEVELS = inputs["2"];
// const LEVELS = `66 69 70 73 76 79 77 83`;

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
  const partOne_B = PARSED_LEVELS.map((row) => {
    return evaluateRow(row);
  }).reduce((acc, curr) => acc + (curr ? 1 : 0), 0);

  const partTwo = PARSED_LEVELS.map((row) => {
    // if (!evaluateRow(row, true)) {
    // }
    const evaluated = evaluateRow(row, true);
    return evaluated;
  }).reduce((acc, curr) => acc + (curr ? 1 : 0), 0);

  return [partOne, partOne_B, partTwo];
}

export function evaluateRow(row: number[], withSafety = false): boolean {
  const results = row.map((v, i) => {
    if (i === 0) return true;
    // Get the polarity of results so far
    const polarity = row.slice(1, i + 1).map((v, j) => {
      return v - row[j];
    }) as number[];
    const polarityResult =
      polarity.every((v) => v > 0) || polarity.every((v) => v < 0);
    const maxStepResult = Math.abs(v - row[i - 1]) <= 3;
    return polarityResult && maxStepResult;
  });
  if (!results.every(Boolean) && withSafety) {
    // determine the offending item(s)

    // determine the general polarity of the row
    const polarity = row.slice(1).map((v, i) => {
      return v - row[i];
    }) as number[];
    // true: ascending; false: descending
    const polarityMode =
      polarity.filter((v) => v > 0).length >= polarity.length / 2;
    const hasInvertedPolarity = polarity.map((v) =>
      polarityMode ? v < 0 : v > 0,
    );

    if (hasInvertedPolarity.filter(Boolean).length === 1) {
      const polarityIndex = hasInvertedPolarity.findIndex((v) => v);
      return (
        evaluateRow(
          [...row.slice(0, polarityIndex + 1), ...row.slice(polarityIndex + 2)],
          false,
        ) ||
        evaluateRow(
          [...row.slice(0, polarityIndex), ...row.slice(polarityIndex + 1)],
          false,
        )
      );
    }
    const hasDuplicate = row.map((v, i) => {
      return [...row.slice(0, i), ...row.slice(i + 1)].some((x) => x === v);
    });
    if (hasDuplicate.filter(Boolean).length === 2) {
      const duplicateIndex = hasDuplicate.findIndex((v) => v);
      return evaluateRow(
        [...row.slice(0, duplicateIndex), ...row.slice(duplicateIndex + 1)],
        false,
      );
    }
    const hasJump = row.map((v, i) => {
      if (i === 0) return false;
      return Math.abs(v - row[i - 1]) > 3;
    });
    if (hasJump.some(Boolean)) {
      const jumpIndex = hasJump.findIndex((v) => v);
      return (
        evaluateRow(
          [...row.slice(0, jumpIndex - 1), ...row.slice(jumpIndex)],
          false,
        ) ||
        evaluateRow(
          [...row.slice(0, jumpIndex), ...row.slice(jumpIndex + 1)],
          false,
        )
      );
    }
  }
  return results.every(Boolean);
}

export function getDuplicates(row: number[]) {
  const hasDuplicate = row.map((v, i) => {
    const newRow = [...row.slice(0, i), ...row.slice(i + 1)];
    return newRow.some((x) => x === v);
  });
  return hasDuplicate;
}

export function getPolarityShifts(row: number[]) {
  const polarity = row.slice(1).map((v, i) => {
    return v - row[i];
  }) as number[];
  const polarityMode =
    polarity.filter((v) => v > 0).length >= polarity.length / 2;
  const hasInvertedPolarity = polarity.map((v) =>
    polarityMode ? v < 0 : v > 0,
  );
  return hasInvertedPolarity;
}

export function getJumps(row: number[]) {
  const hasJump = row.map((v, i) => {
    if (i === 0) return false;
    return Math.abs(v - row[i - 1]) > 3;
  });
  return hasJump;
}
