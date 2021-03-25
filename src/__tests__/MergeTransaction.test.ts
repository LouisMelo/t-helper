import { MergeSuccessState, MergeTransactions, Transaction } from '../index';
import { withSameAmount, withSameCode } from '../tools';

const buy: Transaction = {
  _id: '0001',
  type: 'b',
  code: '601166',
  amount: 2000,
  price: 23.6,
  date: new Date(),
  uid: '0001',
};

const sell: Transaction = {
  _id: '0002',
  type: 's',
  code: '601166',
  amount: 2000,
  price: 24.6,
  date: new Date(),
  uid: '0001',
};

test('same amount', () => {
  expect(withSameAmount([buy, sell])).toBe(true);
});

test('same code', () => {
  expect(withSameCode([buy, sell])).toBe(true);
});

test('mergeSuccess', () => {
  expect(MergeTransactions([buy, sell]).state).toBe('success');
});

test('profit', () => {
  expect((MergeTransactions([buy, sell]) as MergeSuccessState).data.profit).toBeGreaterThan(1000);
  expect((MergeTransactions([buy, sell]) as MergeSuccessState).data.profit).toBeLessThan(2000);
});
