export async function connectSimpleFin(tokenBase64: string) {
  const res = await fetch("/api/connect/simplefin", {
    method: "POST", headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ tokenBase64 })
  });
  if (!res.ok) throw new Error((await res.json()).error ?? "Connect failed");
}

export type Balance = { id:string; name:string; currency:string; balance:string; availableBalance?:string; balanceDate:number; };
export type Tx = { id:string; posted:number; amount:string; description:string; pending?:boolean; };

export async function fetchBalances(): Promise<Balance[]> {
  const r = await fetch("/api/accounts"); if (!r.ok) throw new Error((await r.json()).error ?? "Failed");
  const j = await r.json(); return j.balances as Balance[];
}
export async function fetchTransactions(limit=15): Promise<Tx[]> {
  const r = await fetch(`/api/transactions?limit=${limit}`); if (!r.ok) throw new Error((await r.json()).error ?? "Failed");
  const j = await r.json(); return j.transactions as Tx[];
}