import { useEffect, useState } from "react";

import {
  convertDisplayAmountToNumber,
  convertNumberToDisplayAmount,
  debounceInput,
} from "../utilities/helpers";

const TransactionAmountFilter = ({ onUpdate, label }) => {
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    const amountToUpdate = amount ?? null;
    debounceInput(amountToUpdate, onUpdate);
  }, [amount]);

  const numberFormatted = convertNumberToDisplayAmount(amount);

  const handleOnChange = (val: string) => {
    const num = convertDisplayAmountToNumber(val);
    setAmount(num);
  };

  return (
    <div className="flex flex-col">
      <div className="w-28 text-neutral-700 text-sm font-['Arial']">
        {label}
      </div>

      <div className="flex flex-row w-30 h-5  border-1 border-zinc-800 rounded-lg">
        $
        <input
          className="w-22"
          type="number"
          value={numberFormatted}
          onChange={(e) => {
            e.preventDefault();
            handleOnChange(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default TransactionAmountFilter;
