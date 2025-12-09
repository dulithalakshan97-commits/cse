import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PortfolioDashboard() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ ticker: "", qty: "", price: "", type: "buy" });

  const addEntry = () => {
    if (!form.ticker || !form.qty || !form.price) return;
    setEntries([...entries, { ...form, id: Date.now() }]);
    setForm({ ticker: "", qty: "", price: "", type: "buy" });
  };

  const totalInvested = entries
    .filter((e) => e.type === "buy")
    .reduce((sum, e) => sum + Number(e.qty) * Number(e.price), 0);

  return (
    <div className="min-h-screen p-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
      <Card className="p-6">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Add Transaction</h2>
          <div className="grid gap-3 mb-4">
            <Input
              placeholder="Ticker (Ex: BALA.N)"
              value={form.ticker}
              onChange={(e) => setForm({ ...form, ticker: e.target.value })}
            />
            <Input
              placeholder="Quantity"
              type="number"
              value={form.qty}
              onChange={(e) => setForm({ ...form, qty: e.target.value })}
            />
            <Input
              placeholder="Price"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            <select
              className="border rounded p-2"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>
          <Button onClick={addEntry}>Add Entry</Button>
        </CardContent>
      </Card>

      <Card className="p-6">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Transaction History</h2>
          <div className="max-h-96 overflow-y-auto border rounded p-3">
            {entries.map((e) => (
              <div key={e.id} className="border-b py-2 text-sm">
                <strong>{e.ticker}</strong> | {e.type.toUpperCase()} | Qty: {e.qty} @ LKR {e.price}
              </div>
            ))}
          </div>

          <div className="mt-4 text-lg font-semibold">
            Total Invested: LKR {totalInvested.toLocaleString()}
          </div>
        </CardContent>
      </Card>

      <Card className="p-6 col-span-1 lg:col-span-2">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Live Market View</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded overflow-hidden shadow">
              <iframe
                src="https://s.tradingview.com/widgetembed/?symbol=CSELK%3AALL&interval=D&theme=light"
                width="100%"
                height="400"
              />
            </div>
            <div className="rounded overflow-hidden shadow">
              <iframe
                src="https://s.tradingview.com/widgetembed/?symbol=CSELK%3AASPI&interval=D&theme=light"
                width="100%"
                height="400"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
