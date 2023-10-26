// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  setupDb,
  selectTransactions,
  Transaction,
} from "../../database/transactions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    selectedCardFilter,
    selectedStatusFilter,
    selectedMerchantFilter,
    minAmount,
    maxAmount,
  } = req.query;
  await setupDb();

  const minAmountValue = Array.isArray(minAmount) ? minAmount[0] : minAmount;
  const maxAmountValue = Array.isArray(maxAmount) ? maxAmount[0] : maxAmount;

  const transactions: Transaction[] = await selectTransactions({
    selectedCardFilter: selectedCardFilter as string,
    selectedStatusFilter: selectedStatusFilter as string,
    selectedMerchantFilter: selectedMerchantFilter as string,
    minAmount: parseInt(minAmountValue, 10) || 0,
    maxAmount: parseInt(maxAmountValue, 10) || Number.MAX_SAFE_INTEGER,
  });

  res.status(200).json(transactions);
}
