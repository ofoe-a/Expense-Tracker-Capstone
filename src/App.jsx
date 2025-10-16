import { useEffect, useMemo, useState } from "react";
import ExpenseForm from "./components/ExpenseForm.jsx";
import Filters from "./components/Filters.jsx";
import ExpenseList from "./components/ExpenseList.jsx";
import SummaryBar from "./components/SummaryBar.jsx";
import LiveRate from "./components/LiveRate.jsx";

const LS_KEY = "et.expenses.v1";

export default function App() {
  const [expenses, setExpenses] = useState(() => {
    try { const raw = localStorage.getItem(LS_KEY); return raw ? JSON.parse(raw) : []; }
    catch { return []; }
  });
  const [filter, setFilter] = useState({ q: "", category: "All" });
  const [editing, setEditing] = useState(null);

  useEffect(() => { localStorage.setItem(LS_KEY, JSON.stringify(expenses)); }, [expenses]);

  const addExpense = (exp) => setExpenses((xs) => [exp, ...xs]);
  const updateExpense = (exp) => setExpenses((xs) => xs.map((e) => (e.id === exp.id ? exp : e)));
  const deleteExpense = (id) => setExpenses((xs) => xs.filter((e) => e.id !== id));

  const filtered = useMemo(() => {
    return expenses.filter((e) => {
      const byCat = filter.category === "All" || e.category === filter.category;
      const byQ =
        !filter.q ||
        e.title.toLowerCase().includes(filter.q.toLowerCase()) ||
        e.note?.toLowerCase().includes(filter.q.toLowerCase());
      return byCat && byQ;
    });
  }, [expenses, filter]);

  const totals = useMemo(() => {
    const sum = expenses.reduce((acc, e) => acc + Number(e.amount || 0), 0);
    const byCat = expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + Number(e.amount || 0);
      return acc;
    }, {});
    return { sum, byCat, count: expenses.length };
  }, [expenses]);

  const reloadFromStorage = () => {
    try { const raw = localStorage.getItem(LS_KEY); setExpenses(raw ? JSON.parse(raw) : []); }
    catch { alert("Could not reload saved data."); }
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold">💸 Expense Tracker</h1>
          <div className="flex gap-2">
            <button onClick={reloadFromStorage} className="btn-ghost">Reload</button>
            <button onClick={() => setExpenses([])} className="text-sm text-red-600 hover:underline">Clear All</button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 grid gap-6 md:grid-cols-3">
        <section className="md:col-span-2 space-y-6">
          <LiveRate />
          <SummaryBar totals={totals} />

          <ExpenseForm
            key={editing?.id || "new"}
            initial={editing}
            onCancel={() => setEditing(null)}
            onSave={(exp) => { editing ? updateExpense(exp) : addExpense(exp); setEditing(null); }}
          />

          <Filters value={filter} onChange={setFilter} />
          <ExpenseList items={filtered} onEdit={setEditing} onDelete={deleteExpense} />
        </section>

        <aside className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <h3 className="font-semibold mb-3">Tips</h3>
            <ul className="text-sm space-y-2 list-disc pl-5">
              <li>Add short notes like “Fuel – Spintex → Airport”.</li>
              <li>Use search to filter quickly.</li>
              <li>Data is stored locally in your browser.</li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}