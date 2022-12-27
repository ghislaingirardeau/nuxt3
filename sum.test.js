function sum(a, b) {
  return a + b;
}

test("test sum", () => {
  expect(sum(1, 2)).toBeLessThan(5);
});

test("test sum", () => {
  expect(sum(1, 2)).toBeGreaterThan(2);
});

test("test sum", () => {
  expect(sum(1, 2)).not.toBe(3);
});

test('but there is a "stop" in Christoph', () => {
  expect("Christoph").toMatch(/stop/);
});
