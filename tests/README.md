# StockTrendAnalysis Test Suite

This folder contains lightweight tests that do not alter the app runtime or UI.

## Run all tests

```bash
node tests/run-all.js
```

## Included tests

- `smoke.test.js` checks that the key app files exist and expected UI/API wiring is present.
- `unit.test.js` checks standalone financial calculation helpers with deterministic data.

These tests use only Node built-in modules, so no test framework install is required.
