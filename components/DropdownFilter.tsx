//add a component that takes a label, onChange,
//then either selectOptions  if passed in as prop
//or a number input
const DropdownFilter = ({ selectOptions, onChange, label }) => {
  return (
    <div className="flex flex-col ">
      <div className="w-28 text-neutral-700 text-sm font-['Arial']">
        {label}
      </div>
      <select
        className="w-28 h-5 border rounded-md text-sm focus:outline-none"
        onChange={(e) => {
          let value = e.target.value;
          console.log({ value });
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
