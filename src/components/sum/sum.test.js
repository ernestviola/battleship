import sum from "./sum";

test.skip("add 1 + 2 equals 3", () => {
  expect(sum(1, 2)).toBe(3);
});
