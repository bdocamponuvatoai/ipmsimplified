export type ProductSlug = "inspection" | "permit" | "maintenance";
export type Product = {
  slug: ProductSlug;
  letter: "I" | "P" | "M";
  name: string;
  short: string;
  tagline: string;
  buyer: string;
  capabilities: string[];
  editions?: { name: string; copy: string }[];
};
export const products: Product[] = [
  {
    slug: "inspection",
    letter: "I",
    name: "InspectionSimplified",
    short: "Inspection",
    tagline: "The jurisdiction's register of what is due.",
    buyer: "Authorities having jurisdiction",
    capabilities: [
      "Every program you enforce, on one register",
      "Contractors register once for the state",
      "Contractors file results directly; a pass moves the due date by itself",
      "An expired licence blocks filing on its own",
      "Deficiencies stay open until somebody corrects them",
      "Enforce by exception, not by chasing paper",
    ],
  },
  {
    slug: "permit",
    letter: "P",
    name: "PermitSimplified",
    short: "Permit",
    tagline: "Plan review and permitting — fire, or all trades.",
    buyer: "Fire and building departments",
    capabilities: [
      "Fire edition: alarm, sprinklers, suppression and life safety; field inspections that close permits",
      "All Trades edition: every trade the department permits, one file, a section per trade; permit types, fee schedules, self-certified inspections",
    ],
    editions: [
      {
        name: "Fire",
        copy: "Alarm, sprinklers, suppression and life safety; field inspections that close permits.",
      },
      {
        name: "All Trades",
        copy: "Every trade the department permits, one file, a section per trade; permit types, fee schedules, self-certified inspections.",
      },
    ],
  },
  {
    slug: "maintenance",
    letter: "M",
    name: "MaintenanceSimplified",
    short: "Maintenance",
    tagline: "The record owners and contractors keep.",
    buyer: "Owners, managers, contractors",
    capabilities: [
      "Owner edition: portfolio register for property managers; certificates, readings, open deficiencies",
      "Contractor edition: Your book of business, your week, your crew",
      "Results filed before the van leaves the site",
    ],
    editions: [
      {
        name: "Owner",
        copy: "Portfolio register for property managers; certificates, readings, open deficiencies.",
      },
      {
        name: "Contractor",
        copy: "Your book of business, your week, your crew. Results filed before the van leaves the site.",
      },
    ],
  },
];
export const heroCopy =
  "IPM Simplified builds the systems that hold them. A city reviews the drawings and issues the permit. An authority keeps the register of everything that building owes, across every program it enforces. An owner and their contractors keep the proof it was done. Same building, three different people responsible — so we build three products, and each one stands on its own.";
export const principle =
  "The same object underneath. Every product turns on one thing: a required item, a date it is due, the result of the last time it was done, and the document that proves it.";
export const statements = [
  "Nobody retypes anything.",
  "The other side never pays. (Contractors and owners don't pay to use a city's system.)",
  "Code citations follow adopted editions; administrators edit the comment and program libraries.",
];
