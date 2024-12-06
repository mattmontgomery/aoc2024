import { inputs } from "../../inputs";

export default function day1(input: string) {
  const LOCATION_IDS_A = input
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(/\s+/)[0])
    .map(Number);
  const LOCATION_IDS_B = input
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(/\s+/)[1])
    .map(Number);
  const sortedA = LOCATION_IDS_A.sort();
  const sortedB = LOCATION_IDS_B.sort();
  const result = sortedA.map((value, index) => {
    return Math.abs(value - sortedB[index]);
  });
  const similarityScore = sortedA.map((value, index) => {
    return sortedB.filter((v) => v === value).length * value;
  });
  return [
    result.reduce((acc, value) => acc + value, 0),
    similarityScore.reduce((acc, value) => acc + value, 0),
  ];
}
