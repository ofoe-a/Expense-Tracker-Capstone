import { categories } from "../utils/format.js";

export default function Filters({ value, onChange }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-3 flex flex-wrap items-center gap-3">
      <input
        className="input max-w-sm" placeholder="Search title or note…"
        value={value.q} onChange={(e) => onChange((v) => ({ ...v, q: e.target.value }))}
      />
      <select
        className="input w-56" value={value.category}
        onChange={(e) => onChange((v) => ({ ...v, category: e.target.value }))}
      >
        <option>All</option>
        {categories.map((c) => <option key={c}>{c}</option>)}
      </select>
    </div>
  );
}