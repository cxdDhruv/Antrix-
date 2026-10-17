// 3D printing price model, shared by the quote page and the order API.
// All money in INR. Edit the numbers in PRICING to change rates.

export const PRICING = {
  currency: "₹",
  machinePerHour: 60, // printer running cost per hour
  setupPerOrder: 50, // slicing, bed prep, removal
  minimumOrder: 149,
  wallCm: 0.12, // ~1.2mm of perimeter/top/bottom shell
  maxQty: 100,
  buildVolumeMm: [220, 220, 250] as const,
  materials: {
    PLA: { label: "PLA", density: 1.24, perGram: 4, note: "Everyday prototypes. Rigid, crisp detail." },
    PETG: { label: "PETG", density: 1.27, perGram: 5, note: "Tough, slightly flexible, water resistant." },
    ABS: { label: "ABS", density: 1.04, perGram: 5, note: "Heat resistant functional parts." },
    TPU: { label: "TPU", density: 1.21, perGram: 9, note: "Rubber-like and flexible." },
  },
  qualities: {
    draft: { label: "Draft", layer: "0.28 mm", cm3PerHour: 18 },
    standard: { label: "Standard", layer: "0.20 mm", cm3PerHour: 12 },
    fine: { label: "Fine", layer: "0.12 mm", cm3PerHour: 7 },
  },
  colors: {
    Black: "#1a1a1a",
    White: "#f2f2f2",
    Grey: "#8a8a8a",
    Red: "#d13b3b",
    Blue: "#2f6fd6",
    Yellow: "#f2c230",
    Green: "#3a9d5d",
  },
} as const;

export type Material = keyof typeof PRICING.materials;
export type Quality = keyof typeof PRICING.qualities;
export type Color = keyof typeof PRICING.colors;

export type QuoteOptions = {
  material: Material;
  quality: Quality;
  infill: number; // 0.1 – 1
  color: Color;
  qty: number;
};

export type MeshStats = { volumeCm3: number; areaCm2: number };

export type Quote = {
  grams: number; // per piece
  hours: number; // per piece
  materialCost: number; // all pieces
  machineCost: number; // all pieces
  setup: number;
  total: number;
};

export function isValidOptions(o: Partial<QuoteOptions>): o is QuoteOptions {
  return (
    typeof o.material === "string" && o.material in PRICING.materials &&
    typeof o.quality === "string" && o.quality in PRICING.qualities &&
    typeof o.color === "string" && o.color in PRICING.colors &&
    typeof o.infill === "number" && o.infill >= 0.1 && o.infill <= 1 &&
    Number.isInteger(o.qty) && (o.qty as number) >= 1 && (o.qty as number) <= PRICING.maxQty
  );
}

export function computeQuote(stats: MeshStats, o: QuoteOptions): Quote {
  const mat = PRICING.materials[o.material];
  const q = PRICING.qualities[o.quality];
  const vol = Math.max(0, stats.volumeCm3);
  const shell = Math.min(vol, Math.max(0, stats.areaCm2) * PRICING.wallCm);
  const usedCm3 = shell + (vol - shell) * o.infill;

  const grams = usedCm3 * mat.density;
  const hours = usedCm3 / q.cm3PerHour;
  const materialCost = grams * mat.perGram * o.qty;
  const machineCost = hours * PRICING.machinePerHour * o.qty;
  const setup = PRICING.setupPerOrder;
  const total = Math.max(
    PRICING.minimumOrder,
    Math.ceil(materialCost + machineCost + setup),
  );

  return { grams, hours, materialCost, machineCost, setup, total };
}

/** Volume (signed tetrahedra) and surface area of a triangle soup, in model units (mm). */
export function measure(positions: ArrayLike<number>) {
  let vol = 0;
  let area = 0;
  for (let i = 0; i + 8 < positions.length; i += 9) {
    const ax = positions[i], ay = positions[i + 1], az = positions[i + 2];
    const bx = positions[i + 3], by = positions[i + 4], bz = positions[i + 5];
    const cx = positions[i + 6], cy = positions[i + 7], cz = positions[i + 8];
    vol += (ax * (by * cz - bz * cy) - ay * (bx * cz - bz * cx) + az * (bx * cy - by * cx)) / 6;
    const ux = bx - ax, uy = by - ay, uz = bz - az;
    const vx = cx - ax, vy = cy - ay, vz = cz - az;
    const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    area += Math.sqrt(nx * nx + ny * ny + nz * nz) / 2;
  }
  return { volumeMm3: Math.abs(vol), areaMm2: area };
}

export function formatINR(n: number) {
  return `${PRICING.currency}${Math.round(n).toLocaleString("en-IN")}`;
}
