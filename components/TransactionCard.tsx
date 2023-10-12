const PendingTag = <div>Pending</div>;

export interface ITransaction {
  amountCents: number;
  cardLast4Digits: string;
  createdAt: string; // This should be a valid date string, consider using Date type if you want to parse it.
  description: string;
  direction: "Credit" | "Debit"; // Assuming direction can only be "Credit" or "Debit"
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
    updatedAt,
  } = transaction;

  const formattedCreatedAtDate = createdAt; // || updatedAt
  //if direction is 'credit' append a '-' in front;
  const transactionCost = amountCents;
  const cardClass = "w-96 h-32 bg-orange-100 rounded-lg shadow";
  const flexClass = "w-full flex flex-row justify-between";

  return (
    <div className={cardClass}>
      <div className={flexClass}>
      <div className="flex flex-col">
        <div className="flex flex-row gap-4">
          {description}
          {PendingTag}
        </div>
        {formattedCreatedAtDate}
      </div>
      <span>{transactionCost}</span>
      </div>
    </div>
  );
};

export default TransactionCard;
