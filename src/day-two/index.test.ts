import test from "node:test";
import assert from "node:assert";
import { evaluateRow } from ".";
const testMap: Array<[number[], boolean]> = [
  [[7, 6, 4, 2, 1], true],
  [[1, 2, 7, 8, 9], false],
  [[9, 7, 6, 2, 1], false],
  [[1, 3, 2, 4, 5], true],
  [[8, 6, 4, 4, 1], true],
  [[1, 3, 6, 7, 8], true],
  [[1, 1, 3, 5, 7], true],
  [[8, 8, 7, 5, 3], true],
  [[78, 75, 73, 72, 70, 69, 66, 66], true],
  [[8, 10, 13, 14, 12], true],
  [[29, 22, 20, 21, 19, 16], false],
  [[53, 49, 46, 43, 40, 38, 36, 35], true],
  [[40, 42, 45, 47, 49, 49], true],
  [[9, 11, 12, 15, 17, 21], true],
  [[50, 49, 50, 51, 52, 54, 55], true],
];
testMap.forEach(([input, expected]) => {
  test(`${input.join(",")} should be ${expected}`, () => {
    assert.equal(
      evaluateRow(input, true),
      expected,
      `${input.join(" ")} failed`,
    );
  });
});
