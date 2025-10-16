import { currency } from "../utils/format.js";

export default function SummaryBar({ totals }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 flex flex-wrap items-center gap-4">
      <Stat label="Total Spend" value={currency(totals.sum)} />
      <Divider />
      <Stat label="Entries" value={totals.count} />
      <Divider />
      <div className="flex-1 min-w-[220px]">
        <p className="text-xs text-gray-500 mb-2">Top Categories</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(totals.byCat)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([name, val]) => (
              <span key={name} className="px-2 py-1 text-xs rounded-full bg-gray-100">
                {name}: {currency(val)}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="min-w-[160px]">
      <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}
function Divider() { return <div className="h-10 w-px bg-gray-200 hidden sm:block" />; }