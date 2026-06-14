const assert = require("node:assert/strict");

function returns(series) {
  const out = [];
  for (let i = 1; i < series.length; i += 1) out.push(series[i] / series[i - 1] - 1);
  return out;
}

function mean(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function variance(values) {
  const avg = mean(values);
  return values.reduce((sum, value) => sum + (value - avg) ** 2, 0) / (values.length - 1);
}

function covariance(a, b) {
  const avgA = mean(a);
  const avgB = mean(b);
  return a.reduce((sum, value, i) => sum + (value - avgA) * (b[i] - avgB), 0) / (a.length - 1);
}

function correlation(a, b) {
  return covariance(a, b) / Math.sqrt(variance(a) * variance(b));
}

function sma(series, window) {
  return series.map((_, index) => {
    if (index + 1 < window) return null;
    return mean(series.slice(index + 1 - window, index + 1));
  });
}

function nearlyEqual(actual, expected, epsilon = 1e-9) {
  assert.ok(Math.abs(actual - expected) <= epsilon, `expected ${actual} to equal ${expected}`);
}

returns([100, 110, 121]).forEach((value) => nearlyEqual(value, 0.1));
nearlyEqual(mean([2, 4, 6]), 4);
nearlyEqual(variance([2, 4, 6]), 4);
nearlyEqual(covariance([1, 2, 3], [2, 4, 6]), 2);
nearlyEqual(correlation([1, 2, 3], [2, 4, 6]), 1);
assert.deepEqual(sma([1, 2, 3, 4], 3), [null, null, 2, 3]);

console.log("unit.test.js passed");
