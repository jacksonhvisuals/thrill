import fetch from "node-fetch";
import type { AccountSet } from "../domain/entities";

export class SimpleFinProvider {
  constructor(private accessUrl: string) {}

  // Helper to build a credential-free URL + auth header
  private buildRequest(path: string, qs?: URLSearchParams) {
    const u = new URL(this.accessUrl);
    const username = decodeURIComponent(u.username);
    const password = decodeURIComponent(u.password);

    // Strip creds from the URL
    u.username = "";
    u.password = "";

    // Ensure no trailing slash issues
    const base = u.toString().replace(/\/+$/, "");
    const url = `${base}${path}${qs && qs.toString() ? `?${qs}` : ""}`;

    const authHeader =
      "Basic " + Buffer.from(`${username}:${password}`).toString("base64");

    return { url, headers: { Authorization: authHeader } };
  }

  static async claimAccessUrl(simplefinTokenBase64: string): Promise<string> {
    const claimUrl = Buffer.from(simplefinTokenBase64, "base64").toString("utf8");
    const res = await fetch(claimUrl, { method: "POST" });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      const err: any = new Error(`Token claim failed (${res.status}): ${body || res.statusText}`);
      err.status = res.status;
      throw err;
    }
    return (await res.text()).trim();
  }

  async getAccounts(opts: {
    balancesOnly?: boolean;
    startDate?: number;
    endDate?: number;
    includePending?: boolean;
    accountIds?: string[];
  } = {}): Promise<AccountSet> {
    const qs = new URLSearchParams();
    if (opts.balancesOnly) qs.set("balances-only", "1");
    if (opts.startDate) qs.set("start-date", String(opts.startDate));
    if (opts.endDate) qs.set("end-date", String(opts.endDate));
    if (opts.includePending) qs.set("pending", "1");
    (opts.accountIds ?? []).forEach((id) => qs.append("account", id));

    // SimpleFIN accounts endpoint is `${accessUrl}/accounts`
    const { url, headers } = this.buildRequest("/accounts", qs);

    const res = await fetch(url, { method: "GET", headers });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      const err: any = new Error(`SimpleFIN /accounts ${res.status}: ${body || res.statusText}`);
      err.status = res.status;
      throw err;
    }
    return (await res.json()) as AccountSet;
  }
}
