import { Transactions } from '../index';

// 成交量
export const calcVolume = (transactions: Transactions) => transactions.reduce((sum, curr) => sum + curr.amount, 0);

// 成交额
export const calcTurnover = (transactions: Transactions) =>
  transactions.reduce((sum, curr) => sum + curr.price * curr.amount, 0);
