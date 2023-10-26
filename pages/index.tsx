import type { NextPage } from "next";
import TransactionCard, { ITransaction } from "../components/TransactionCard";
import DropdownFilter from "../components/DropdownFilter";
import TransactionAmountFilter from "../components/TransactionAmountFilter";
import useTransactionFiltersAndValues from "../hooks/useTransactionFiltersAndValues";

const Home: NextPage = () => {
  const {
    filteredTransactions,
    setMinAmount,
    setMaxAmount,
    setSelectedStatusFilter,
    setSelectedCardFilter,
    setSelectedMerchantFilter,
    merchantFilters,
    cardFilters,
    statusFilters,
    transactions,
  } = useTransactionFiltersAndValues();

  return (
    <div className="w-full h-full">
      <div className="m-10">
        <h1 className="text-xl font-semibold ">Transactions</h1>
        <div className="flex flex-row gap-3 mt-10">
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
