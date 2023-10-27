export const convertNumberToDisplayAmount = (
  incomingNumber: number
): string => {
  if (!incomingNumber) return "";
  const numString = incomingNumber.toString();
  return numString;
};

export const convertDisplayAmountToNumber = (
  onChangeAmount: string
): number => {
  if (onChangeAmount == "" || onChangeAmount == "0") return null;

  const onChangeAmountToInt = parseInt(onChangeAmount);
  return onChangeAmountToInt;
};

export enum purchaseDirection {
  Credit = "Credit",
  Debit = "Debit",
}

export const convertAmountCentsToTransactionDisplay = (
  amount: number,
  direction: purchaseDirection
) => {
  const dollars = Math.floor(amount / 100);
  const cents = amount % 100;
  const formattedCents = cents < 10 ? `0${cents}` : `${cents}`;
  const prefix = direction === purchaseDirection.Credit ? "-" : "";
  return `$${prefix}${dollars}.${formattedCents}`;
};

let debounceTimer;

export const debounceInput = (number, stateSetter) => {
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    stateSetter(number);
  }, 500);
};

export const formatDate = (dateString) => {
  const options = {
    weekday: "long",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  };
  const date = new Date(dateString);
  const currentDate = new Date();

  const dateToLocale = date.toLocaleDateString("en-US", options);
  const splitDate = dateToLocale.split(",");
  const timeAndTimezoneText: string = splitDate[1];

  if (isToday(date, currentDate)) {
    return "Today at " + timeAndTimezoneText;
  } else if (isYesterday(date, currentDate)) {
    return "Yesterday at " + timeAndTimezoneText;
  } else {
    const dayOfWeek = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(date);
    return dayOfWeek + " at " + timeAndTimezoneText;
  }
};

function isToday(date, currentDate) {
  return (
    date.getDate() === currentDate.getDate() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  );
}

function isYesterday(date, currentDate) {
  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);
  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
}
