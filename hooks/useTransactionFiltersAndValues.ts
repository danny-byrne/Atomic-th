import { useEffect, useState, useMemo } from "react";
import { ITransaction } from "../components/TransactionCard";
import { extractMerchantsAndCardsFromTransactionsData } from "../utilities/helpers";

const useTransactionFiltersAndValues = () => {
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

  return {
    filteredTransactions,
    setMinAmount,
    setMaxAmount,
    setSelectedStatusFilter,
    setSelectedCardFilter,
    setSelectedMerchantFilter,
    merchantFilters,
    cardFilters,
  };
};

export default useTransactionFiltersAndValues;
