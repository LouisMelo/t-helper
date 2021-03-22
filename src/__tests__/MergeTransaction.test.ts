import { MergeTransactions, Transaction } from '../index'

const buy: Transaction = {
  _id: '0001',
  type: 'b',
  code: '601166',
  amount: 2000,
  price: 23.6,
  date: new Date(),
  uid: '0001',
}

const sell: Transaction = {
  _id: '0002',
  type: 's',
  code: '601166',
  amount: 2000,
  price: 24.6,
  date: new Date(),
  uid: '0001',
}

test('total amount', () => {
  expect(MergeTransactions([buy, sell]).totalAmount).toBe(2000)
})

test('profit', () => {
  expect(MergeTransactions([buy, sell]).profit).toBeGreaterThan(1000)
  expect(MergeTransactions([buy, sell]).profit).toBeLessThan(2000)
})
