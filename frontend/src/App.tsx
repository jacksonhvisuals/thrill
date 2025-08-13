import * as Tabs from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";
import { connectSimpleFin, fetchBalances, fetchTransactions, type Balance, type Tx } from "./lib/api";
import * as Dialog from "@radix-ui/react-dialog";

function ConnectSimpleFin() {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<"idle"|"busy"|"ok"|"err">("idle");
  const [err, setErr] = useState("");

  async function submit() {
    setStatus("busy");
    try { await connectSimpleFin(token.trim()); setStatus("ok"); setOpen(false); }
    catch (e:any){ setErr(e.message); setStatus("err"); }
  }
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="rounded-xl bg-black text-white px-4 py-2">Connect SimpleFIN</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-lg rounded-2xl bg-white dark:bg-neutral-900 p-4 shadow-xl space-y-3">
          <Dialog.Title className="text-lg font-semibold">Connect SimpleFIN</Dialog.Title>
          <a className="text-blue-500 underline" href="https://bridge.simplefin.org/simplefin/create" target="_blank" rel="noreferrer">
            Get a SimpleFIN Token
          </a>
          <textarea
            className="w-full rounded-xl border p-3 min-h-[96px]"
            placeholder="Paste the base64 token here"
            value={token} onChange={e=>setToken(e.target.value)}
          />
          {status==="err" && <p className="text-red-600">{err}</p>}
          <div className="flex justify-end gap-2">
            <Dialog.Close className="px-3 py-2 rounded-xl border">Cancel</Dialog.Close>
            <button
              className="px-4 py-2 rounded-xl bg-black text-white disabled:opacity-60"
              disabled={status==="busy"} onClick={submit}
            >
              {status==="busy" ? "Connecting..." : "Connect"}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Balances() {
  const [data, setData] = useState<Balance[]>([]);
  const [err, setErr] = useState("");
  useEffect(()=>{ fetchBalances().then(setData).catch(e=>setErr(e.message)); },[]);
  return (
    <div className="rounded-2xl shadow p-4">
      <h2 className="text-lg font-semibold mb-2">Balances</h2>
      {err && <p className="text-red-600">{err}</p>}
      <ul className="divide-y">
        {data.map(b=>(
          <li key={b.id} className="py-2 flex justify-between">
            <span className="font-medium">{b.name}</span>
            <span className="tabular-nums">{b.balance} {b.currency}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Transactions() {
  const [data, setData] = useState<Tx[]>([]);
  const [err, setErr] = useState("");
  useEffect(()=>{ fetchTransactions(15).then(setData).catch(e=>setErr(e.message)); },[]);
  const fmt = (s:number)=> new Date(s*1000).toLocaleDateString();
  return (
    <div className="rounded-2xl shadow p-4">
      <h2 className="text-lg font-semibold mb-2">Last 15 Transactions</h2>
      {err && <p className="text-red-600">{err}</p>}
      <ul className="divide-y">
        {data.map(t=>(
          <li key={t.id} className="py-2 flex items-center justify-between">
            <div className="min-w-0">
              <div className="font-medium truncate">{t.description}</div>
              <div className="text-sm text-neutral-500">{fmt(t.posted)}</div>
            </div>
            <div className="ml-4 tabular-nums">{t.amount}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Finance</h1>
        <ConnectSimpleFin />
      </header>

      <Tabs.Root defaultValue="balances" className="space-y-4">
        <Tabs.List className="inline-flex rounded-xl border overflow-hidden">
          <Tabs.Trigger value="balances" className="px-4 py-2 data-[state=active]:bg-black data-[state=active]:text-white">Balances</Tabs.Trigger>
          <Tabs.Trigger value="transactions" className="px-4 py-2 data-[state=active]:bg-black data-[state=active]:text-white">Transactions</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="balances"><Balances/></Tabs.Content>
        <Tabs.Content value="transactions"><Transactions/></Tabs.Content>
      </Tabs.Root>
    </main>
  );
}

