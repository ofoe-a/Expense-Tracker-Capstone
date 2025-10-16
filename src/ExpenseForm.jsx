import { useEffect, useState } from "react";
import { categories } from "../utils/format.js";

export default function ExpenseForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(() => initial ?? ({
    id: crypto.randomUUID(),
    title: "",
    amount: "",
    category: categories[0],
    date: new Date().toISOString().slice(0, 10),
    note: "",
  }));
  const [errors, setErrors] = useState({});

  useEffect(() => { if (initial) setForm(initial); }, [initial]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (form.amount === "" || Number(form.amount) <= 0) e.amount = "Enter a valid amount";
    if (!form.date) e.date = "Pick a date";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    onSave({ ...form, amount: Number(form.amount) });
    if (!initial) {
      setForm({
        id: crypto.randomUUID(),
        title: "", amount: "", category: categories[0],
        date: new Date().toISOString().slice(0, 10), note: "",
      });
    }
  };

  return (
    <form onSubmit={submit} className="bg-white rounded-xl shadow-sm border p-4 space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <Field label="Title" error={errors.title}>
          <input className="input" value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Fuel, Lunch, ECG…" />
        </Field>
        <Field label="Amount (GHS)" error={errors.amount}>
          <input className="input" type="number" min="0" step="0.01" value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })} />
        </Field>
        <Field label="Category">
          <select className="input" value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Date" error={errors.date}>
          <input className="input" type="date" value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })} />
        </Field>
      </div>
      <Field label="Note">
        <input className="input" value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
          placeholder="Optional note (e.g., Spintex → Airport)" />
      </Field>
      <div className="flex gap-2">
        <button className="btn-primary" type="submit">{initial ? "Update" : "Add Expense"}</button>
        {initial && <button type="button" className="btn-ghost" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-gray-600 mb-1">{label}</span>
      {children}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}