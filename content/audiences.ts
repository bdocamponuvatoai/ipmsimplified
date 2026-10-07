export const audiences = [
  {
    title: "Jurisdictions",
    name: "Cities, fire departments and building departments",
    copy: "Plan review, permitting and the jurisdiction's testing register.",
    products: ["inspection", "permit"],
    photo: "a1-jurisdictions",
    detail:
      "Keep each required item, due date and filed result on the register.",
  },
  {
    title: "Contractors",
    name: "Inspection, testing and service contractors",
    copy: "File results, pull permits, run a book of business.",
    products: ["maintenance", "inspection", "permit"],
    photo: "a2-contractors",
    detail: "File the result before the van leaves the site.",
  },
  {
    title: "Owners & managers",
    name: "Property owners and managers",
    copy: "Hold the register and certificates for the buildings they manage.",
    products: ["maintenance"],
    photo: "a3-owners",
    detail:
      "Keep certificates on file and deficiencies visible until correction.",
  },
] as const;
