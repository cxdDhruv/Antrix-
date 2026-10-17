// Self-check for the 3D print price model and mesh volume maths.
// Run: node --experimental-strip-types scripts/print-check.ts
import assert from "node:assert/strict";
import { computeQuote, isValidOptions, measure, PRICING } from "../src/lib/printPricing.ts";

// 10mm cube as 12 outward-facing triangles -> 1000 mm3, 600 mm2.
function cube(s: number) {
  const v = [
    [0, 0, 0], [s, 0, 0], [s, s, 0], [0, s, 0],
    [0, 0, s], [s, 0, s], [s, s, s], [0, s, s],
  ];
  const f = [
    [0, 2, 1], [0, 3, 2], [4, 5, 6], [4, 6, 7], [0, 1, 5], [0, 5, 4],
    [1, 2, 6], [1, 6, 5], [2, 3, 7], [2, 7, 6], [3, 0, 4], [3, 4, 7],
  ];
  return f.flatMap((t) => t.flatMap((i) => v[i]));
}

const m = measure(cube(10));
assert.ok(Math.abs(m.volumeMm3 - 1000) < 1e-6, `cube volume ${m.volumeMm3}`);
assert.ok(Math.abs(m.areaMm2 - 600) < 1e-6, `cube area ${m.areaMm2}`);

const base = { material: "PLA", quality: "standard", infill: 0.2, color: "Black", qty: 1 } as const;
assert.ok(isValidOptions({ ...base }));
assert.ok(!isValidOptions({ ...base, qty: 0 }));
assert.ok(!isValidOptions({ ...base, infill: 2 }));
assert.ok(!isValidOptions({ ...base, material: "Gold" as never }));

// Tiny part hits the minimum order.
assert.equal(computeQuote({ volumeCm3: 1, areaCm2: 6 }, base).total, PRICING.minimumOrder);

// 100 cm3 part: more infill / more pieces / finer layers cost more.
const big = { volumeCm3: 100, areaCm2: 130 };
const q20 = computeQuote(big, base).total;
assert.ok(computeQuote(big, { ...base, infill: 1 }).total > q20);
assert.ok(computeQuote(big, { ...base, qty: 3 }).total > q20);
assert.ok(computeQuote(big, { ...base, quality: "fine" }).total > computeQuote(big, { ...base, quality: "draft" }).total);

// Solid infill uses the full volume.
const solid = computeQuote(big, { ...base, infill: 1 });
assert.ok(Math.abs(solid.grams - 100 * PRICING.materials.PLA.density) < 1e-9);

console.log("print-check ok", { q20, solid: solid.total });
