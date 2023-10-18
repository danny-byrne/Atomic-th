export const extractMerchantsAndCardsFromTransactionsData = (data) => {
  //Todo:
  //simpify this into one for loop
  const merchants = data?.reduce(
    (uniqueMerchants, transaction) => {
      const merchantName = transaction.merchantName;
      if (!uniqueMerchants.includes(merchantName)) {
        uniqueMerchants.push(merchantName);
      }
      return uniqueMerchants;
    },
    [null]
  );

  const cardsUsed = data?.reduce(
    (uniqueCards, transaction) => {
      const cardLast4Digits = transaction.cardLast4Digits;
      if (!uniqueCards.includes(cardLast4Digits)) {
        uniqueCards.push(cardLast4Digits);
      }
      return uniqueCards;
    },
    [null]
  );
  return { merchants, cardsUsed };
};

export const convertNumberToDisplayAmount = (
  incomingNumber: number
): string => {
  // console.log({ incomingNumber });
  if (!incomingNumber) return "";
  const numString = incomingNumber.toString();

  //remove the first charachter which is a dollar sign

  return numString;
};

export const convertDisplayAmountToNumber = (
  onChangeAmount: string
): number => {
  // console.log({ onChangeAmount });
  if (onChangeAmount == "") return 0;

  const onChangeAmountToInt = parseInt(onChangeAmount);
  // console.log({ onChangeAmountToInt });
  return onChangeAmountToInt;
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
  console.log({ timeAndTimezoneText });
  // const dateTextSplit = splitDate.split(" ");

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
