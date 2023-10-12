import type { NextPage } from "next";
import { useEffect, useState } from "react";
import TransactionCard, {
  ITransaction,
  ITransactionProps,
} from "../components/TransactionCard";

const Home: NextPage = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [merchantFilters, setMerchantFilters] = useState([]);
  const [cardFilters, setCardFilters] = useState([])

  const fetchTransactions = async () => {
    const response = await fetch("/api/transactions");
    const data = await response.json();
    console.log({ data });
    const merchants = data?.transactions?.map(transaction => transaction.merchant)
    const cardsUsed = data?.transactions?.map(transaction => transaction.cardLast4Digits)
    setMerchantFilters(merchants)
    setCardFilters(cardsUsed)
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  //load merchants in to

  //DropdownFilterBar
  //Min amount: number
  //max amount: number
  //status: enum pending || settled
  //card: dynamic to available cards
  //merchant choices: dynamic to available merchants

  return (
    <div className="w-full h-full">
      <div className="m-10">
        <h1 className="text-3xl font-semibold">Transactions</h1>
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
