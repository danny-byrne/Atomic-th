import {
  formatDate,
  convertAmountCentsToTransactionDisplay,
  purchaseDirection,
} from "../utilities/helpers";
import Card from "./icons/Card";
import PendingTag from "./PendingTag";

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

const TransactionCard: React.FC<ITransactionProps> = ({
  transaction,
}): JSX.Element => {
  const {
    amountCents,
    cardLast4Digits,
    createdAt,
    description,
    status,
    direction,
  } = transaction;

  const statusIsPending = status === "pending";
  const transactionAmount = convertAmountCentsToTransactionDisplay(
    amountCents,
    direction
  );

  const createdAtFormatted = formatDate(createdAt);

  return (
    <div className="h-32 flex flex-col justify-center pl-10 pr-10 bg-orange-100 border-zinc-800 rounded-lg drop-shadow-md">
      <div className="flex flex-row justify-between align-middle">
        <div className="flex flex-col gap-6">
          <div className="flex flex-row gap-4 text-lg">
            {description}

            {statusIsPending && <PendingTag />}
          </div>
          <div className="italic">{createdAtFormatted}</div>
        </div>
        <div className="flex flex-row w-1/5 justify-between bg-red border-zinc-800 items-center font-bold text-lg">
          <div className="w-1/2 flex flex-row gap-4 items-center">
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
