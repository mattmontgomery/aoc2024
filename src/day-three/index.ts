export default function dayThree(input: string): number {
  const muls = input.matchAll(/((mul\(\d+\,\d+\))|(do\(\))|(don't\(\)))/g);
  return [...muls].reduce(
    (acc, curr) => {
      if (acc[1] && curr[0]?.includes("mul")) {
        const [a, b] = curr[0].match(/\d+/g)?.map(Number) as [number, number];
        return [Number(acc[0]) + Number(a) * Number(b), acc[1]];
      }
      if (curr[0].includes("do()")) {
        return [acc[0], true];
      }
      if (curr[0].includes("don't()")) {
        return [acc[0], false];
      }
      return acc;
    },
    [0, true],
  )[0] as number;
}
