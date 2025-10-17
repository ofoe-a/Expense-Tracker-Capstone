import { currency } from "../utils/format.js";

export default function ExpenseItem({ item, onEdit, onDelete }) {
  return (
    <div className="p-3 flex items-center gap-3">
      {/* date */}
      <div className="w-14 shrink-0 text-center">
        <div className="text-sm font-semibold">
          {new Date(item.date).toLocaleDateString("en-GB", { day: "2-digit" })}
        </div>
        <div className="text-[10px] text-gray-500">
          {new Date(item.date).toLocaleDateString("en-GB", { month: "short" })}
        </div>
      </div>

      {/* title + meta */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="font-medium">{item.title}</p>
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
          <span className="badge">{item.category}</span>
          {item.note && <span className="truncate">{item.note}</span>}
        </div>
      </div>

      {/* amount + actions */}
      <div className="flex items-center gap-4">
        <p className="font-semibold text-lg leading-none">{currency(item.amount)}</p>
        <button className="btn-ghost" onClick={onEdit}>Edit</button>
        <button className="btn-ghost text-red-600" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}