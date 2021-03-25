import round from './tools/round';
import { withSameAmount, withSameCode, separate, calcVolume, calcTurnover } from './tools';

export interface Transaction {
  _id: string;
  type: 'b' | 's';
  code: string;
  amount: number;
  price: number;
  date: Date;
  uid: string;
  isComplete?: boolean;
}

export type Transactions = ReadonlyArray<Transaction>;

export type MergeSuccessState = {
  state: 'success';
  data: MergeResult;
};

export type MergeFailedState = {
  state: 'failed';
  error: {
    message: string;
  };
};
interface MergeResult {
  profit: number;
  totalAmount: number;
  buyAvgPrice: number;
  sellAvgPrice: number;
  commission: number;
  tax: number;
}

export const MergeTransactions = (
  transactions: Transactions,
  commissionRate: number = 2 / 10000,
): MergeFailedState | MergeSuccessState => {
  if (!withSameCode(transactions)) {
    return {
      state: 'failed',
      error: { message: 'transactions should be of same code' },
    };
  }

  if (!withSameAmount(transactions)) {
    return {
      state: 'failed',
      error: { message: 'buy & sell should have same amount' },
    };
  }

  const { buys, sells } = separate(transactions);

  const totalAmount = calcVolume(buys);

  const cost = calcTurnover(buys);
  const sale = calcTurnover(sells);

  // 万2佣金
  const commission = round((cost + sale) * commissionRate);
  // 千1印花税
  const tax = round(sale / 1000);
  const profit = round(sale - cost - commission - tax);

  return {
    state: 'success',
    data: {
      profit,
      totalAmount,
      buyAvgPrice: round(cost / totalAmount),
      sellAvgPrice: round(sale / totalAmount),
      commission,
      tax,
    },
  };
};
