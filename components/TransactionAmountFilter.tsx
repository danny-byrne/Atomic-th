import { useEffect, useState } from "react";

import {
  convertDollarAmountToNumber,
  convertNumberToDollarAmount,
  debounceInput,
} from "../utilities/helpers";

const TransactionAmountFilter = ({ onUpdate, label }) => {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    console.log({ amount });
    const amountToUpdate = amount ?? null;
    debounceInput(amountToUpdate, onUpdate);
  }, [amount]);

  const numberFormatted = convertNumberToDollarAmount(amount);
  console.log({ numberFormatted });

  const handleOnChange = (val: string) => {
    const num = convertDollarAmountToNumber(val);
    setAmount(num);
  };

  return (
    <div className="flex flex-col">
      <div className="w-28 text-neutral-700 text-xs font-['Arial']">
        {label}
      </div>

      <div className=" w-30 h-5 pl-3 border-1 border-zinc-800 rounded-lg">
        $
        <input
          type="text"
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
