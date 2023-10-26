import { useEffect, useState, useMemo } from "react";
import { ITransaction } from "../components/TransactionCard";
import { extractMerchantsAndCardsFromTransactionsData } from "../utilities/helpers";

const statusFilters = [null, "settled", "pending"];

interface IFetchTransactionsParams {
  selectedCardFilter: string;
  selectedStatusFilter: string;
  selectedMerchantsFilter: string;
  minAmount: number;
  maxAmount: number;
}

const useTransactionFiltersAndValues = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [merchantFilters, setMerchantFilters] = useState<string[]>([]);
  const [cardFilters, setCardFilters] = useState<string[]>([]);
  const [selectedCardFilter, setSelectedCardFilter] = useState(null);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState(null);
  const [selectedMerchantFilter, setSelectedMerchantFilter] = useState(null);
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [transactionsFetched, setInitTransactionsFetched] = useState(false);

  const fetchTransactions = async ({
    selectedCardFilter = "",
    selectedStatusFilter = "",
    selectedMerchantFilter = "",
    minAmount = 0,
    maxAmount = Number.MAX_SAFE_INTEGER,
  }) => {
    const queryParams = new URLSearchParams({
      selectedCardFilter: String(selectedCardFilter),
      selectedStatusFilter: String(selectedStatusFilter),
      selectedMerchantFilter: String(selectedMerchantFilter),
      minAmount: String(minAmount),
      maxAmount: String(maxAmount),
    });

    const response = await fetch(`/api/transactions?${queryParams}`);
    const data = await response.json();
    console.log({ data });
    setTransactions(data);
  };

  const fetchCardsAndMerchants = async () => {
    const response = await fetch("/api/cards-and-merchants");
    const data = await response.json();
    const { cards, merchants } = data;

    const cardsUsed = cards.map((card) => card.cardLast4Digits);
    const merchantsUsed = merchants.map((merchant) => merchant.merchantName);
    setMerchantFilters([null, ...merchantsUsed]);
    setCardFilters([null, ...cardsUsed]);
  };

  //first populate card and merchant filters
  useEffect(() => {
    fetchCardsAndMerchants();
  }, []);

  useEffect(() => {
    const shouldFetchTransactions =
      !transactionsFetched && cardFilters.length && merchantFilters.length;
    shouldFetchTransactions && fetchTransactions(null);
    setInitTransactionsFetched(true);
  }, [cardFilters]);

  // const filteredTransactions = useMemo(() => {
  //   const filteredTransactions = transactions.filter((transaction) => {
  //     const isStatusFilterMatch =
  //       selectedStatusFilter === null ||
  //       transaction.status === selectedStatusFilter;

  //     const isCardFilterMatch =
  //       selectedCardFilter === null ||
  //       transaction.cardLast4Digits === selectedCardFilter;

  //     const isMerchantFilterMatch =
  //       selectedMerchantFilter === null ||
  //       transaction.merchantName === selectedMerchantFilter;

  //     const isMinAmountMatch =
  //       minAmount === null || transaction.amountCents >= minAmount * 100;

  //     const isMaxAmountMatch =
  //       maxAmount === null || transaction.amountCents <= maxAmount * 100;

  //     const isAFilterMatch =
  //       isStatusFilterMatch &&
  //       isCardFilterMatch &&
  //       isMerchantFilterMatch &&
  //       isMinAmountMatch &&
  //       isMaxAmountMatch;

  //     return isAFilterMatch;
  //   });

  //   return filteredTransactions;
  // }, [
  //   transactions,
  //   selectedStatusFilter,
  //   selectedCardFilter,
  //   selectedMerchantFilter,
  //   minAmount,
  //   maxAmount,
  // ]);

  const filteredTransactions = useMemo(() => {
    const getTransactions = async () => {
      const transactions = await fetchTransactions({
        selectedCardFilter,
        selectedStatusFilter,
        selectedMerchantFilter,
        minAmount: minAmount * 100,
        maxAmount: maxAmount * 100,
      });
      return transactions;
    };

    const filteredTransactions = getTransactions();

    return filteredTransactions;
  }, [
    selectedStatusFilter,
    selectedCardFilter,
    selectedMerchantFilter,
    minAmount,
    maxAmount,
  ]);

  return {
    transactions,
    filteredTransactions,
    setMinAmount,
    setMaxAmount,
    setSelectedStatusFilter,
    setSelectedCardFilter,
    setSelectedMerchantFilter,
    merchantFilters,
    cardFilters,
    statusFilters,
  };
};

export default useTransactionFiltersAndValues;
