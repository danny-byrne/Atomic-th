// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  setupDb,
  getCardsAndMerchantsForFilters,
  Transaction,
} from "../../database/transactions";

interface IGetCardsAndMerchantsForFiltersResponse {
  merchants: string[];
  cards: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IGetCardsAndMerchantsForFiltersResponse>
) {
  const response = await getCardsAndMerchantsForFilters();
  res.status(200).json(response);
}
