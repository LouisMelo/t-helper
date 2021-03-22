export interface Transaction {
  _id: string
  type: 'b' | 's'
  code: string
  amount: number
  price: number
  date: Date
  uid: string
  isComplete?: boolean
}

type Transactions = ReadonlyArray<Transaction>

interface MergeResult {
  profit: number
  totalAmount: number
  buyAvgPrice: number,
  sellAvgPrice: number,
  commission: number,
  tax: number
}

/* https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary */
const round = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100

export const MergeTransactions = (transactions: Transactions, commissionRate: number = 2 / 10000): MergeResult => {
  // fisrt check if transactions are of same code

  // check buy & sell amount

  const buyGroup = transactions.filter((transaction) => transaction.type === 'b')
  const sellGroup = transactions.filter((transaction) => transaction.type === 's')

  const totalAmount = buyGroup.reduce((sum, curr) => sum + curr.amount, 0)

  const cost = buyGroup.reduce((sum, curr) => sum + curr.price * curr.amount, 0)
  const sale = sellGroup.reduce((sum, curr) => sum + curr.price * curr.amount, 0)

  const commission = round(((cost + sale) * commissionRate))
  const tax = round(sale / 1000)
  const profit = round(sale - cost - commission - tax)

  return {
    profit,
    totalAmount,
    buyAvgPrice: round(cost / totalAmount),
    sellAvgPrice: round(sale / totalAmount),
    commission,
    tax
  }
}
