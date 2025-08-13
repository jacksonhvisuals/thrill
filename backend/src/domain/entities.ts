export interface Organization { domain?: string; sfinUrl: string; name?: string; }
export interface Transaction { id: string; posted: number; amount: string; description: string; pending?: boolean; }
export interface Account {
  org: Organization; id: string; name: string; currency: string;
  balance: string; availableBalance?: string; balanceDate: number;
  transactions?: Transaction[];
}
export interface AccountSet { errors: string[]; accounts: Account[]; }

