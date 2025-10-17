import { useEffect, useState } from "react";

export default function LiveRate() {
  const [rate, setRate] = useState(null);
  const [ts, setTs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const fetchRate = async () => {
    try {
      setLoading(true); setErr("");
      const res = await fetch("https://api.exchangerate.host/latest?base=GHS&symbols=USD");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const r = data?.rates?.USD;
      if (!r) throw new Error("Missing rate");
      setRate(r); setTs(new Date());
    } catch (e) { setErr("Could not load exchange rate. Try again."); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchRate(); const id = setInterval(fetchRate, 10 * 60 * 1000); return () => clearInterval(id); }, []);

  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 flex items-center justify-between">
      <div className="text-sm">
        <span className="font-medium">Live Rate:</span>{" "}
        {rate ? `1 GHS ≈ ${rate.toFixed(4)} USD` : "—"}
        {ts && <span className="text-gray-500 ml-2">updated {ts.toLocaleTimeString()}</span>}
        {err && <span className="text-red-600 ml-2">{err}</span>}
      </div>
      <button onClick={fetchRate} disabled={loading} className="btn-ghost">
        {loading ? "Refreshing…" : "Refresh"}
      </button>
    </div>
  );
}