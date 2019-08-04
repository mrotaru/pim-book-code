const test = require("tape");
const Polynomial = require("./polynomial");

test("init", t => {
  const p = Object.create(Polynomial);
  p.init(1, 2, 3);
  t.deepEquals(p.coefficients, [1, 2, 3]);
  t.equals(p.degree, 2);
  t.end();
});

test("evaluateAt", t => {
  const p = Object.create(Polynomial);
  p.init(1, 2, 3);
  t.equals(p.evaluateAt(0), 3);
  t.equals(p.evaluateAt(1), 6);
  t.equals(p.evaluateAt(2), 11);
  t.end();
});

test("add", t => {
  const p1 = Object.create(Polynomial);
  p1.init(1, 2, 3);
  const p2 = Object.create(Polynomial);
  p2.init(3, 4, 5);
  p1.add(p2);
  t.deepEquals(p1.coefficients, [4, 6, 8]);
  t.end();
})

test("getCoefficient", t => {
  const p = Object.create(Polynomial);
  p.init(1, 2, 3);
  t.equals(p.getCoefficient(3), undefined);
  t.equals(p.getCoefficient(3, 'when-undefined'), 'when-undefined');
  t.equals(p.getCoefficient(2), 1);
  t.equals(p.getCoefficient(1), 2);
  t.equals(p.getCoefficient(0), 3);
  t.end();
})

test("setCoefficient", t => {
  const p = Object.create(Polynomial);
  p.init(1, 2, 3);
  p.setCoefficient(4, 100);
  t.equals(p.getCoefficient(4), 100);
  t.equals(p.getCoefficient(3), 0);
  t.equals(p.getCoefficient(2), 1);
  t.equals(p.getCoefficient(1), 2);
  t.equals(p.getCoefficient(0), 3);
  t.equals(p.degree, 4);
  t.end();
})

test("multiply", t => {
  const p1 = Object.create(Polynomial);
  p1.init(1, 2, 3);
  const p2 = Object.create(Polynomial);
  p2.init(4, 5, 6);
  p1.multiply(p2);
  t.deepEquals(p1.coefficients, [
    (1*4), // x^4
    (1*5 + 2*4), // x^3
    (1*6 + 2*5 + 3*4), // x^2
    (2*6 + 3*5), // x^1
    (3*6), // x^0
  ]);
  t.end();
})