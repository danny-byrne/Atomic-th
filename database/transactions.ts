import { baseData } from "./seed";
import { Op } from "sequelize";
import { DataTypes, Sequelize } from "sequelize";

let TransactionTable;
const filepath = ".data/transactions.db";

export const dbConnection = new Sequelize("database", "", "", {
  dialect: "sqlite",
  storage: filepath,
  logging: true,
});

export const setupDb = async (): Promise<void> => {
  dbConnection.authenticate().then(async (err) => {
    console.log(`SQLite3 Connection has been established successfully.`);
  });

  TransactionTable = dbConnection.define("Transaction", {
    status: DataTypes.STRING,
    amountCents: DataTypes.NUMBER,
    merchantName: DataTypes.STRING,
    description: DataTypes.STRING,
    cardLast4Digits: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    direction: DataTypes.STRING,
  });

  await TransactionTable.sync();
  if (!(await TransactionTable.findOne())) {
    await setup();
  }
};

async function setup() {
  await TransactionTable.destroy({ where: {} });
  for (const transaction of baseData) {
    await TransactionTable.create(transaction);
  }
}

export type Transaction = {
  status: string;
  amountCents: number;
  merchantName: string;
  description: string;
  cardLast4Digits: string;
  createdAt: string;
  direction: string;
};

export const insertTransaction = async (transaction: Transaction) => {
  await TransactionTable.create(transaction);
};

// export const selectTransactions = async () => {
//   return await TransactionTable.findAll();
// };

//TODO: get cardsForFilters, getVendors for Filters

interface TransactionFilters {
  selectedCardFilter?: string;
  selectedStatusFilter?: string;
  selectedMerchantFilter?: string;
  minAmount?: number;
  maxAmount?: number;
}

export const selectTransactions = async (filters: TransactionFilters) => {
  const {
    selectedCardFilter,
    selectedStatusFilter,
    selectedMerchantFilter,
    minAmount,
    maxAmount,
  } = filters;

  const whereClause: any = {};

  if (selectedCardFilter) {
    whereClause.cardLast4Digits = selectedCardFilter;
  }

  if (selectedStatusFilter) {
    whereClause.status = selectedStatusFilter;
  }

  if (selectedMerchantFilter) {
    whereClause.merchantName = selectedMerchantFilter;
  }

  if (minAmount !== undefined && maxAmount !== undefined) {
    whereClause.amountCents = {
      [Op.between]: [minAmount, maxAmount],
    };
  }

  return await TransactionTable.findAll({ where: whereClause });
};

export const getCardsAndMerchantsForFilters = async () => {
  const cards = await TransactionTable.findAll({
    attributes: ["cardLast4Digits"],
    group: ["cardLast4Digits"],
  });
  const merchants = await TransactionTable.findAll({
    attributes: ["merchantName"],
    group: ["merchantName"],
  });

  return { cards, merchants };
};
