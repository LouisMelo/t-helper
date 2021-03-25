import { Transactions } from '../index';

export const separate = (transactions: Transactions) => {
  return {
    buys: transactions.filter((t) => t.type === 'b'),
    sells: transactions.filter((t) => t.type === 's'),
  };
};
