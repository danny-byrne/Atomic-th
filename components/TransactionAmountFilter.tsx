import React, { useEffect, useState } from "react";

import {
  convertDisplayAmountToNumber,
  convertNumberToDisplayAmount,
  debounceInput,
} from "../utilities/helpers";

type TransactionAmountFilterProps = {
  onUpdate: (value: number | null) => void;
  label: string;
};

const TransactionAmountFilter: React.FC<TransactionAmountFilterProps> = ({
  onUpdate,
  label,
}) => {
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

      <div className="flex flex-row w-30 h-6 border-solid border-1 border-zinc-800 rounded-md bg-[#EFEFEF] pl-2  items-center">
        <div className="text-sm pr-1">$</div>
        <input
          className="w-20 bg-[#EFEFEF] rounded-md focus:outline-none"
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
