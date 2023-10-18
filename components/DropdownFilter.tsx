import React from "react";

type DropdownFilterProps = {
  selectOptions: string[];
  onChange: (value: string | null) => void;
  label: string;
};

const DropdownFilter: React.FC<DropdownFilterProps> = ({
  selectOptions,
  onChange,
  label,
}) => {
  return (
    <div className="flex flex-col ">
      <div className="w-28 text-neutral-700 text-sm font-['Arial']">
        {label}
      </div>
      <select
        className="w-28 h-6 border rounded-md text-sm focus:outline-none bg-[#EFEFEF]"
        onChange={(e) => {
          let value = e.target.value;
          if (value === "") {
            value = null;
          }
          onChange(value);
        }}
      >
        {selectOptions.map((option) => {
          return <option value={option}>{option}</option>;
        })}
      </select>
    </div>
  );
};

export default DropdownFilter;
