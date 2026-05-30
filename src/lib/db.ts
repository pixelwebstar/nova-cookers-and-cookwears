"use client";

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  retailPrice: number;
  estimatedCost: number;
  description: string;
  image: string;
  specs: Record<string, string>;
  supplierName: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: string;
  paymentMethod: string;
  items: {
    productId: string;
    productName: string;
    retailPrice: number;
    estimatedCost: number;
    quantity: number;
  }[];
  totalPrice: number;
  totalCost: number;
  status: "Pending Sourcing" | "Sourced" | "Delivered" | "Installed (DAKEEK)";
  date: string;
}

export interface Inquiry {
  id: string;
  customerName: string;
  customerPhone: string;
  message: string;
  productId?: string;
  productName?: string;
  date: string;
}

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "prod-001",
    name: "Bosch PCR9A5B90M Gas Hob — 5 Burner FlameSelect",
    brand: "Bosch",
    category: "Built-in Hob",
    retailPrice: 3299,
    estimatedCost: 2100,
    description: "Five-burner gas hob with FlameSelect stepless flame control, cast iron pan supports, and automatic re-ignition. Tempered glass surface in black. Built for countertop integration with standard 90cm cutout.",
    image: "/bosch_pcr9a5b90m.png",
    specs: { "Burners": "5 (incl. dual wok)", "Width": "90 cm", "Surface": "Tempered Glass", "Ignition": "Automatic", "Gas Type": "LPG / Natural Gas" },
    supplierName: "Bosch UAE — Deira Trade Gate"
  },
  {
    id: "prod-002",
    name: "Smeg SSA91MAX2 Opera Range Cooker — Dual Fuel",
    brand: "Smeg",
    category: "Cooker",
    retailPrice: 12499,
    estimatedCost: 8200,
    description: "Italian-designed 90cm dual fuel range cooker with 6 gas burners, multifunction electric oven (115L capacity), and telescopic sliding shelves. Stainless steel finish with Vapor Clean technology.",
    image: "/smeg_ssa91max2.png",
    specs: { "Width": "90 cm", "Fuel Type": "Dual Fuel", "Oven Capacity": "115 L", "Burners": "6 Gas", "Energy Class": "A" },
    supplierName: "Smeg Middle East — Sharjah Industrial"
  },
  {
    id: "prod-003",
    name: "Bertazzoni Heritage Series HER100 6 MFE D XE",
    brand: "Bertazzoni",
    category: "Cooker",
    retailPrice: 18900,
    estimatedCost: 13500,
    description: "Premium 100cm heritage range cooker with 6 brass burners, dual electric convection ovens (total 142L), full-width storage compartment, and hand-finished Italian craftsmanship in iconic stainless steel.",
    image: "/bertazzoni_heritage.png",
    specs: { "Width": "100 cm", "Fuel Type": "Dual Fuel", "Oven Capacity": "76L + 66L", "Burners": "6 Brass", "Origin": "Italy" },
    supplierName: "Bertazzoni Authorized — Dragon Mart Gate"
  },
  {
    id: "prod-004",
    name: "Bosch HBG675BS1 Built-in Single Oven — Pyrolytic",
    brand: "Bosch",
    category: "Oven",
    retailPrice: 4599,
    estimatedCost: 2950,
    description: "Built-in single oven with pyrolytic self-cleaning, 13 heating modes, 4D HotAir circulation, and TFT touch display. 71L capacity, A+ energy rated. Perfect for flush cabinetry integration.",
    image: "/bosch_oven.png",
    specs: { "Type": "Built-in Single", "Capacity": "71 L", "Cleaning": "Pyrolytic", "Energy Class": "A+", "Heating Modes": "13" },
    supplierName: "Bosch UAE — Deira Trade Gate"
  },
  {
    id: "prod-005",
    name: "Elica Cloud Seven Ceiling-Mounted Hood",
    brand: "Elica",
    category: "Hood",
    retailPrice: 6800,
    estimatedCost: 4200,
    description: "Award-winning ceiling-mounted extraction hood with perimetral aspiration, LED ambient lighting, and whisper-quiet motor. Designed by Fabrizio Crisà. 90cm width with 770 m³/h extraction rate.",
    image: "/elica_cloud_seven.png",
    specs: { "Type": "Ceiling Mount", "Width": "90 cm", "Extraction": "770 m³/h", "Noise Level": "49 dB", "Lighting": "LED" },
    supplierName: "Elica Gulf Dist. — Sharjah Industrial"
  },
  {
    id: "prod-006",
    name: "NOVA Commercial 6-Burner Industrial Range",
    brand: "NOVA Commercial",
    category: "Commercial Burner",
    retailPrice: 8500,
    estimatedCost: 5100,
    description: "Heavy-duty 6-burner commercial cooking range built for restaurant kitchens. High-pressure cast iron burners with individual pilot lights, stainless steel body, and undershelf storage. Gas safety valve certified.",
    image: "/commercial_stove.png",
    specs: { "Burners": "6 High-Pressure", "Width": "120 cm", "Material": "Stainless Steel", "Gas Type": "Natural Gas", "Certification": "ESMA" },
    supplierName: "NOVA Industrial — Sharjah Yard"
  },
  {
    id: "prod-007",
    name: "Miele KM 7564 FL Induction Hob — PowerFlex",
    brand: "Miele",
    category: "Built-in Hob",
    retailPrice: 7200,
    estimatedCost: 5000,
    description: "Premium 4-zone induction hob with PowerFlex flexible cooking zones, TempControl automatic pan recognition, and Con@ctivity 3.0 automatic hood integration. Frameless flush-fit design.",
    image: "/bosch_pcr9a5b90m.png",
    specs: { "Zones": "4 (2 PowerFlex)", "Width": "80 cm", "Surface": "Ceran Glass", "Power": "7.4 kW", "Control": "Direct Selection Plus" },
    supplierName: "Miele Experience Centre — Dubai"
  },
  {
    id: "prod-008",
    name: "Smeg SFP6101TVS Victoria Built-in Oven",
    brand: "Smeg",
    category: "Oven",
    retailPrice: 5200,
    estimatedCost: 3400,
    description: "Victoria aesthetic built-in pyrolytic oven with 10 cooking functions, 70L net capacity, soft-close door, and analog temperature gauge. Silver finish with traditional chrome detailing.",
    image: "/bosch_oven.png",
    specs: { "Type": "Built-in Single", "Capacity": "70 L", "Cleaning": "Pyrolytic", "Functions": "10", "Finish": "Silver" },
    supplierName: "Smeg Middle East — Sharjah Industrial"
  },
  {
    id: "prod-009",
    name: "Elica NIKOLATESLA PRIME Integrated Hob + Hood",
    brand: "Elica",
    category: "Built-in Hob",
    retailPrice: 9800,
    estimatedCost: 6800,
    description: "Revolutionary integrated induction hob with built-in downdraft extraction. Four cooking zones with central aspiration unit, eliminating the need for a wall or ceiling hood. Touch slider controls.",
    image: "/elica_cloud_seven.png",
    specs: { "Type": "Hob + Downdraft Hood", "Zones": "4 Induction", "Extraction": "600 m³/h", "Width": "83 cm", "Control": "Touch Slider" },
    supplierName: "Elica Gulf Dist. — Sharjah Industrial"
  },
  {
    id: "prod-010",
    name: "Bertazzoni PRO365ICFEPXT 36\" Induction Range",
    brand: "Bertazzoni",
    category: "Cooker",
    retailPrice: 15500,
    estimatedCost: 10800,
    description: "Professional series 90cm induction range with 5-zone cooktop, dual convection electric oven (5.9 cu ft), stainless steel knobs, and soft-motion door. European A+ energy efficiency.",
    image: "/bertazzoni_heritage.png",
    specs: { "Width": "90 cm", "Fuel Type": "Full Electric", "Oven Capacity": "167 L", "Zones": "5 Induction", "Energy Class": "A+" },
    supplierName: "Bertazzoni Authorized — Dragon Mart Gate"
  },
  {
    id: "prod-011",
    name: "Bosch DWB098J50 Wall-Mounted Chimney Hood",
    brand: "Bosch",
    category: "Hood",
    retailPrice: 2899,
    estimatedCost: 1800,
    description: "90cm wall-mounted chimney hood with 3-speed + intensive extraction setting, LED lighting, grease cassette filters, and EcoSilence motor. Brushed stainless steel body with glass canopy.",
    image: "/elica_cloud_seven.png",
    specs: { "Type": "Wall-Mounted Chimney", "Width": "90 cm", "Extraction": "860 m³/h", "Noise Level": "54 dB", "Motor": "EcoSilence" },
    supplierName: "Bosch UAE — Deira Trade Gate"
  },
  {
    id: "prod-012",
    name: "NOVA Commercial Double-Deck Pizza Oven",
    brand: "NOVA Commercial",
    category: "Commercial Burner",
    retailPrice: 6200,
    estimatedCost: 3600,
    description: "Professional double-deck electric pizza oven with independent temperature control per chamber, stone baking surface, viewing windows, and stainless steel construction. Ideal for pizzerias and bakeries.",
    image: "/commercial_stove.png",
    specs: { "Decks": "2", "Chamber Size": "61×61 cm each", "Temp Range": "50–450°C", "Power": "6.6 kW", "Material": "Stainless Steel" },
    supplierName: "NOVA Industrial — Sharjah Yard"
  }
];

export function getStoredProducts(): Product[] {
  if (typeof window === "undefined") return DEFAULT_PRODUCTS;
  const stored = localStorage.getItem("nova_products");
  if (!stored) {
    localStorage.setItem("nova_products", JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
  }
  return JSON.parse(stored);
}

export function saveProduct(product: Product): void {
  if (typeof window === "undefined") return;
  const products = getStoredProducts();
  const index = products.findIndex((p) => p.id === product.id);
  if (index > -1) {
    products[index] = product;
  } else {
    products.push(product);
  }
  localStorage.setItem("nova_products", JSON.stringify(products));
}

export function deleteProduct(id: string): void {
  if (typeof window === "undefined") return;
  const products = getStoredProducts();
  const filtered = products.filter((p) => p.id !== id);
  localStorage.setItem("nova_products", JSON.stringify(filtered));
}

export function getStoredOrders(): Order[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("nova_orders");
  return stored ? JSON.parse(stored) : [];
}

export function saveOrder(order: Order): void {
  if (typeof window === "undefined") return;
  const orders = getStoredOrders();
  orders.push(order);
  localStorage.setItem("nova_orders", JSON.stringify(orders));
}

export function updateOrderStatus(orderId: string, status: Order["status"]): void {
  if (typeof window === "undefined") return;
  const orders = getStoredOrders();
  const order = orders.find((o) => o.id === orderId);
  if (order) {
    order.status = status;
    localStorage.setItem("nova_orders", JSON.stringify(orders));
  }
}

export function getStoredInquiries(): Inquiry[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("nova_inquiries");
  return stored ? JSON.parse(stored) : [];
}

export function saveInquiry(inquiry: Inquiry): void {
  if (typeof window === "undefined") return;
  const inquiries = getStoredInquiries();
  inquiries.push(inquiry);
  localStorage.setItem("nova_inquiries", JSON.stringify(inquiries));
}
