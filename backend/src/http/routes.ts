import { Router } from "express";
import { SimpleFinProvider } from "../providers/SimpleFinProvider";
import { BankService } from "../services/BankService";
import { MemoryStore } from "../infra/MemoryStore";

const r = Router();

r.post("/connect/simplefin", async (req, res) => {
  try {
    const { tokenBase64, userId = "demo-user" } = req.body ?? {};
    if (!tokenBase64) return res.status(400).json({ error: "tokenBase64 required" });
    const accessUrl = await SimpleFinProvider.claimAccessUrl(tokenBase64);
    MemoryStore.simplefinAccessUrlByUser.set(userId, accessUrl);
    res.json({ ok: true });
  } catch (e:any) { res.status(400).json({ error: e.message }); }
});

r.get("/accounts", async (_req, res) => {
  try {
    const accessUrl = MemoryStore.simplefinAccessUrlByUser.get("demo-user");
    if (!accessUrl) return res.status(401).json({ error: "Not connected" });
    const svc = new BankService(new SimpleFinProvider(accessUrl));
    res.json({ balances: await svc.getBalances() });
  } catch (e:any) { res.status(500).json({ error: e.message }); }
});

r.get("/transactions", async (req, res) => {
  try {
    const accessUrl = MemoryStore.simplefinAccessUrlByUser.get("demo-user");
    if (!accessUrl) return res.status(401).json({ error: "Not connected" });
    const limit = Number(req.query.limit ?? 15);
    const svc = new BankService(new SimpleFinProvider(accessUrl));
    res.json({ transactions: await svc.getRecentTransactions(limit) });
  } catch (e:any) { res.status(500).json({ error: e.message }); }
});

export default r;

