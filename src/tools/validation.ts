import { Transactions } from '../index';
import { separate } from './separate';
import { calcVolume } from './calculate';

export const withSameCode = (transactions: Transactions): boolean => {
  if (!transactions.length) {
    return false;
  }

  return transactions.every((transaction, _index, transactionArr) => transaction.code === transactionArr[0].code);
};

export const withSameAmount = (transactions: Transactions): boolean => {
  const { buys, sells } = separate(transactions);

  const buyAmount = calcVolume(buys);
  const sellAmount = calcVolume(sells);

  return buyAmount === sellAmount;
};
