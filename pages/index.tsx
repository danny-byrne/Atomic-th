import type { NextPage } from "next";
import { useEffect, useState } from "react";
import TransactionCard, { ITransaction } from "../components/TransactionCard";
import DropdownFilter from "../components/DropdownFilter";
import { extractMerchantsAndCardsFromTransactionsData } from "../utilities/helpers";
import TransactionAmountFilter from "../components/TransactionAmountFilter";

const statusFilters = [null, "settled", "pending"];

const Home: NextPage = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [merchantFilters, setMerchantFilters] = useState([]);
  const [cardFilters, setCardFilters] = useState([]);
  const [selectedCardFilter, setSelectedCardFilter] = useState(null);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState(null);
  const [selectedMerchantFilter, setSelectedMerchantFilter] = useState(null);
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);

  // useEffect(() => {
  //   console.log({ minAmount, maxAmount });
  // }, [minAmount, maxAmount]);

  const fetchTransactions = async () => {
    const response = await fetch("/api/transactions");
    const data = await response.json();

    const { merchants, cardsUsed } =
      extractMerchantsAndCardsFromTransactionsData(data);

    setMerchantFilters(merchants);
    setCardFilters(cardsUsed);
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="m-10">
        <h1 className="text-3xl font-semibold">Transactions</h1>
        <div className="flex flex-row gap-3">
          <TransactionAmountFilter
            // value={null}
            label="MIN AMOUNT"
            onUpdate={setMinAmount}
          />
          <TransactionAmountFilter
            // value={null}
            label="MAX AMOUNT"
            onUpdate={setMaxAmount}
          />
          <DropdownFilter
            selectOptions={statusFilters}
            onChange={setSelectedStatusFilter}
            label="STATUS"
          />
          <DropdownFilter
            selectOptions={cardFilters}
            onChange={setSelectedCardFilter}
            label="CARD"
          />
          <DropdownFilter
            selectOptions={merchantFilters}
            onChange={setSelectedMerchantFilter}
            label="MERCHANTS"
          />
        </div>
        <div className="flex flex-col gap-8 mt-10">
          {transactions &&
            transactions.map((transaction: ITransaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
