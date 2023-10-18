import type { NextPage } from "next";
import { useEffect, useState, useMemo } from "react";
import TransactionCard, { ITransaction } from "../components/TransactionCard";
import DropdownFilter from "../components/DropdownFilter";
import { extractMerchantsAndCardsFromTransactionsData } from "../utilities/helpers";
import TransactionAmountFilter from "../components/TransactionAmountFilter";

const statusFilters = [null, "settled", "pending"];

const Home: NextPage = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [merchantFilters, setMerchantFilters] = useState<string[]>([]);
  const [cardFilters, setCardFilters] = useState<string[]>([]);
  const [selectedCardFilter, setSelectedCardFilter] = useState(null);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState(null);
  const [selectedMerchantFilter, setSelectedMerchantFilter] = useState(null);
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);

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

  const filteredTransactions = useMemo(() => {
    const filteredTransactions = transactions.filter((transaction) => {
      const isStatusFilterMatch =
        selectedStatusFilter === null ||
        transaction.status === selectedStatusFilter;

      const isCardFilterMatch =
        selectedCardFilter === null ||
        transaction.cardLast4Digits === selectedCardFilter;

      const isMerchantFilterMatch =
        selectedMerchantFilter === null ||
        transaction.merchantName === selectedMerchantFilter;

      const isMinAmountMatch =
        minAmount === null || transaction.amountCents >= minAmount * 100;

      const isMaxAmountMatch =
        maxAmount === null || transaction.amountCents <= maxAmount * 100;

      const isAFilterMatch =
        isStatusFilterMatch &&
        isCardFilterMatch &&
        isMerchantFilterMatch &&
        isMinAmountMatch &&
        isMaxAmountMatch;

      return isAFilterMatch;
    });

    return filteredTransactions;
  }, [
    transactions,
    selectedStatusFilter,
    selectedCardFilter,
    selectedMerchantFilter,
    minAmount,
    maxAmount,
  ]);

  return (
    <div className="w-full h-full">
      <div className="m-10">
        <h1 className="text-3xl font-semibold">Transactions</h1>
        <div className="flex flex-row gap-3 mt-4">
          <TransactionAmountFilter label="MIN AMOUNT" onUpdate={setMinAmount} />
          <TransactionAmountFilter label="MAX AMOUNT" onUpdate={setMaxAmount} />
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
          {filteredTransactions &&
            filteredTransactions.map((transaction: ITransaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
