const assert = require("assert");

const Polynomial = {
  create(...args) {
    const object = Object.create(Polynomial);
    object.init(args);
    return object;
  },
  init(...coefficients) {
    this.setCoefficients(...coefficients);
  },
  evaluateAt(x) {
    return this.coefficients.reduce((acc, curr, i) => {
      return acc + Math.pow(x, this.coefficients.length - (i + 1)) * curr;
    }, 0);
  },
  getCoefficient(degree, whenUndefined = undefined) {
    return this.degree >= degree
      ? this.coefficients[this.degree - degree]
      : whenUndefined;
  },
  setCoefficients(...coefficients) {
    this.coefficients = [...coefficients];
    this.degree = coefficients.length - 1;
  },
  setCoefficient(degree, value) {
    while (degree > this.degree) {
      this.setCoefficients(...[0, ...this.coefficients]);
    }
    this.coefficients[this.degree - degree] = value;
  },
  add(p) {
    assert(p.degree === this.degree, "degree must be same (for now)");
    this.setCoefficients(...this.coefficients.map((c, i) => c + p.coefficients[i]));
  },
  multiply(p) {
    assert(p.degree === this.degree, "degree must be same (for now)");
    for (let i = this.degree; i >= 0; i--) {
      for (let j = p.degree; j >= 0; j--) {
        const degree = i + j;
        const current = degree === i ? 0 : this.getCoefficient(degree, 0);
        const product = this.getCoefficient(i, 0) * p.getCoefficient(j, 0);
        this.setCoefficient(degree, current + product);
      }
    }
  },
  print() {
    console.log(`(${this.coefficients.join(', ')})`)
  },
};

module.exports = Polynomial;
