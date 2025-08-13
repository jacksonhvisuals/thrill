import type { AccountSet } from "./entities";
export interface FinancialDataProvider {
  getAccounts(opts?: {
    balancesOnly?: boolean; startDate?: number; endDate?: number;
    includePending?: boolean; accountIds?: string[];
  }): Promise<AccountSet>;
}

