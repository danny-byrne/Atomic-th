// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  setupDb,
  selectTransactions,
  Transaction,
} from "../../database/transactions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Transaction[]>
) {
  // console.log("request", JSON.stringify(req));
  const database = await setupDb();
  const transactions = await selectTransactions();
  res.status(200).json(transactions);
}
