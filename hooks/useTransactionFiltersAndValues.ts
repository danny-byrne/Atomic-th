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

  async function fetchTransactions({
    selectedCardFilter = "",
    selectedStatusFilter = "",
    selectedMerchantFilter = "",
    minAmount = 0,
    maxAmount = Number.MAX_SAFE_INTEGER,
  }): Promise<ITransaction[]> {
    const queryParams = new URLSearchParams({
      selectedCardFilter: selectedCardFilter ? String(selectedCardFilter) : "",
      selectedStatusFilter: selectedStatusFilter
        ? String(selectedStatusFilter)
        : "",
      selectedMerchantFilter: selectedMerchantFilter
        ? String(selectedMerchantFilter)
        : "",
      minAmount: minAmount ? String(minAmount) : "",
      maxAmount: maxAmount ? String(maxAmount) : "",
    });

    const response = await fetch(`/api/transactions?${queryParams}`);
    const data = await response.json();

    return data;
  }

  const fetchCardsAndMerchants = async () => {
    const response = await fetch("/api/cards-and-merchants");
    const data = await response.json();
    const { cards, merchants } = data;

    const cardsUsed = cards.map((card) => card.cardLast4Digits);
    const merchantsUsed = merchants.map((merchant) => merchant.merchantName);
    setMerchantFilters([null, ...merchantsUsed]);
    setCardFilters([null, ...cardsUsed]);
  };

  useEffect(() => {
    fetchCardsAndMerchants();
  }, []);

  useEffect(() => {
    const shouldFetchTransactions =
      !transactionsFetched && cardFilters.length && merchantFilters.length;
    shouldFetchTransactions && fetchTransactions(null);
    setInitTransactionsFetched(true);
  }, [cardFilters]);

  const handleUpdateTransactions = async () => {
    try {
      const fetchedTransactions = await fetchTransactions({
        selectedCardFilter,
        selectedStatusFilter,
        selectedMerchantFilter,
        minAmount: minAmount * 100,
        maxAmount: maxAmount * 100,
      });

      setTransactions(fetchedTransactions); // Set state after the asynchronous operation completes
    } catch (error) {
      console.error("Error fetching transactions:", error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  useEffect(() => {
    handleUpdateTransactions();
  }, [
    selectedStatusFilter,
    selectedCardFilter,
    selectedMerchantFilter,
    minAmount,
    maxAmount,
  ]);

  return {
    transactions,
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
