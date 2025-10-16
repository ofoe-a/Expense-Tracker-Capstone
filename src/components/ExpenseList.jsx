import ExpenseItem from "./ExpenseItem.jsx";

export default function ExpenseList({ items, onEdit, onDelete }) {
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl border p-6 text-center text-gray-500">
        No expenses yet — add your first one above.
      </div>
    );
  }
  return (
    <div className="bg-white rounded-xl shadow-sm border divide-y">
      {items.map((e) => (
        <ExpenseItem key={e.id} item={e} onEdit={() => onEdit(e)} onDelete={() => {
          if (confirm("Delete this expense?")) onDelete(e.id);
        }} />
      ))}
    </div>
  );
}