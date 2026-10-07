export const cycles = [
  "monthly",
  "quarterly",
  "semiannual",
  "annual",
  "three-year",
  "five-year",
] as const;
export type Cycle = (typeof cycles)[number];
export const programs = [
  { name: "Fire alarm", citation: "NFPA 72", icon: "alarm" },
  { name: "Fire sprinklers", citation: "NFPA 25", icon: "sprinkler" },
  { name: "Fire pumps", citation: "NFPA 25 Ch. 8 / NFPA 20", icon: "pump" },
  {
    name: "Fixed suppression",
    citation: "NFPA 96 / 17A / 2001",
    icon: "suppression",
  },
  { name: "Portable extinguishers", citation: "NFPA 10", icon: "extinguisher" },
  {
    name: "Egress & life safety",
    citation: "NFPA 101 / 80 / IFC 909",
    icon: "egress",
  },
  {
    name: "Backflow prevention",
    citation: "cross-connection control",
    icon: "backflow",
  },
  {
    name: "Elevators & building",
    citation: "ASME A17.1 / NFPA 110",
    icon: "elevator",
  },
] as const;
export type ProgramIconName = (typeof programs)[number]["icon"];
// The brief supplies supported cycles, not program-to-cycle assignments.
// Keep unknown mappings empty; administrators must confirm adopted editions.
export const confirmedCycles: Record<string, readonly Cycle[]> = {};
