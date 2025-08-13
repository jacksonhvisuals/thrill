import type { FinancialDataProvider } from "../domain/FinancialDataProvider";
import type { Account, Transaction } from "../domain/entities";

export class BankService {
  constructor(private provider: FinancialDataProvider) {}
  async getBalances(): Promise<Pick<Account,"id"|"name"|"currency"|"balance"|"availableBalance"|"balanceDate">[]> {
    const { accounts } = await this.provider.getAccounts({ balancesOnly: true });
    return accounts.map(a => ({
      id:a.id, name:a.name, currency:a.currency, balance:a.balance,
      availableBalance:a.availableBalance, balanceDate:a.balanceDate
    }));
  }
  async getRecentTransactions(limit = 15): Promise<Transaction[]> {
    const { accounts } = await this.provider.getAccounts();
    const tx = accounts.flatMap(a => a.transactions ?? []);
    return tx.sort((a,b)=>(b.posted??0)-(a.posted??0)).slice(0, limit);
  }
}

