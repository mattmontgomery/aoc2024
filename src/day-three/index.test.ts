import { testInputs } from "../../inputs";

import test from "node:test";
import assert from "node:assert";
import dayThree from ".";

test("day-three", () => {
  const input = testInputs[3];

  assert.equal(dayThree(input), 161);
});
test("day-three-b", () => {
  const input = testInputs[3];

  assert.equal(dayThree(input), 161);
});
assert.equal(dayThree(testInputs.threeB), 48);
