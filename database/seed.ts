import { Transaction } from './transactions';

export const baseData: Transaction[] = [
  {
    status: 'settled',
    amountCents: 1499,
    merchantName: 'Amazon',
    description: 'Return from Amazon',
    cardLast4Digits: '8201',
    createdAt: '2023-08-01T00:00:00Z',
    direction: 'Credit',
  },
  {
    status: 'pending',
    amountCents: 8711,
    merchantName: 'Target',
    description: 'Purchase from Target',
    cardLast4Digits: '8201',
    createdAt: '2023-08-02T00:00:00Z',
    direction: 'Debit',
  },
  {
    status: 'settled',
    amountCents: 6599,
    merchantName: "Menard's",
    description: "Purchase from Menard's",
    cardLast4Digits: '5099',
    createdAt: '2023-08-03T00:00:00Z',
    direction: 'Debit',
  },
  {
    status: 'settled',
    amountCents: 999,
    merchantName: 'Amazon',
    description: 'Purchase from Amazon',
    cardLast4Digits: '5099',
    createdAt: '2023-07-31T00:00:00Z',
    direction: 'Debit',
  },
  {
    status: 'settled',
    amountCents: 1499,
    merchantName: 'Amazon',
    description: 'Purchase from Amazon',
    cardLast4Digits: '8201',
    createdAt: '2023-07-30T00:00:00Z',
    direction: 'Debit',
  },
  {
    status: 'settled',
    amountCents: 1599,
    merchantName: 'Netflix',
    description: 'Recurring Subscription for Netflix',
    cardLast4Digits: '8201',
    createdAt: '2023-07-01T00:00:00Z',
    direction: 'Debit',
  },
  {
    status: 'settled',
    amountCents: 19837,
    merchantName: 'Walmart',
    description: 'Purchase from Walmart',
    cardLast4Digits: '5099',
    createdAt: '2023-06-15T00:00:00Z',
    direction: 'Debit',
  },
  {
    status: 'settled',
    amountCents: 1599,
    merchantName: 'Netflix',
    description: 'Recurring Subscription for Netflix',
    cardLast4Digits: '8201',
    createdAt: '2023-06-01T00:00:00Z',
    direction: 'Debit',
  },
];
