export const currency = (n) =>
  new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    maximumFractionDigits: 2,
  }).format(n ?? 0);

export const categories = [
  "Food & Groceries",
  "Transport",
  "Bills & Utilities",
  "Shopping",
  "Health",
  "Entertainment",
  "Other",
];