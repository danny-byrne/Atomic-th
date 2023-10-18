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
    console.log({ amountToUpdate, label });
    debounceInput(amountToUpdate, onUpdate);
  }, [amount]);

  const numberFormatted = convertNumberToDisplayAmount(amount);

  // console.log({ numberFormatted });

  const handleOnChange = (val: string) => {
    const num = convertDisplayAmountToNumber(val);
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
            // todo: block non-numeric characters

            e.preventDefault();
            handleOnChange(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default TransactionAmountFilter;
