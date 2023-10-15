import Card from "./icons/Card";

const pendingTag = (
  <div className="flex items-center justify-center w-20 h-7 bg-yellow-100 rounded-xl border border-zinc-400">
    <div className="w-16 h-3.5 text-center text-black  text-xs font-normal font-['Arial']">
      PENDING
    </div>
  </div>
);

enum purchaseDirection {
  Credit = "Credit",
  Debit = "Debit",
}

export interface ITransaction {
  amountCents: number;
  cardLast4Digits: string;
  createdAt: string; // This should be a valid date string, consider using Date type if you want to parse it.
  description: string;
  direction: purchaseDirection; // Assuming direction can only be "Credit" or "Debit"
  id: number;
  merchantName: string;
  status: "settled" | "pending"; // Define all possible status values
  updatedAt: string;
}

export interface ITransactionProps {
  transaction: ITransaction;
}

const convertAmountCentsToTransactionDisplay = (
  amount: number,
  direction: purchaseDirection
) => {
  const dollars = Math.floor(amount / 100);
  const cents = amount % 100;
  const formattedCents = cents < 10 ? `0${cents}` : `${cents}`;
  const prefix = direction === purchaseDirection.Credit ? "-" : "";
  return `$${prefix}${dollars}.${formattedCents}`;
};

const TransactionCard: React.FC<ITransactionProps> = ({
  transaction,
}): JSX.Element => {
  const {
    amountCents,
    cardLast4Digits,
    createdAt,
    description,
    status,
    updatedAt,
    direction,
  } = transaction;

  const formattedCreatedAtDate = createdAt; // || updatedAt

  const cardClass =
    "h-32 flex flex-col justify-center pl-10 pr-10 bg-orange-100 border-zinc-800 rounded-lg shadow ";
  const flexRowClass = "flex flex-row justify-between align-middle";
  const transactionClass =
    "flex flex-row w-1/4  justify-between bg-red border-zinc-800 items-center";
  const statusIsPending = status === "pending";
  const transactionAmount = convertAmountCentsToTransactionDisplay(
    amountCents,
    direction
  );

  return (
    <div className={cardClass}>
      <div className={flexRowClass}>
        <div className="flex flex-col">
          <div className="flex flex-row gap-4">
            {description}

            {statusIsPending && pendingTag}
          </div>
          {formattedCreatedAtDate}
        </div>
        <div className={transactionClass}>
          <div className="w-2/5 flex flex-row justify-between">
            <Card />
            <span>{"x" + cardLast4Digits}</span>
          </div>
          <span>{transactionAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
