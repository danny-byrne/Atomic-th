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

export const convertNumberToDollarAmount = (num: number): string => {
  console.log({ num });
  if (num == 0) return "";

  const numString = num.toString();

  // Calculate the length of the number
  const length = numString.length;

  // Determine dollars and cents parts
  let dollars, cents;

  if (length <= 2) {
    dollars = "0";
    cents = numString.padStart(2, "0");
  } else {
    dollars = numString.slice(0, -2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    cents = numString.slice(-2);
  }

  // Return the formatted string
  return `${dollars}.${cents}`;
};

export const convertDollarAmountToNumber = (onChangeAmount: string): number => {
  console.log({ onChangeAmount });
  if (onChangeAmount === "0.0") return 0;
  //remove the decimal point
  const amountWithoutDecimalPoint = onChangeAmount.replace("." || ",", "");
  //convert to a number
  const amountAsNumber = parseInt(amountWithoutDecimalPoint);
  console.log({ amountAsNumber });
  //return the number
  return amountAsNumber;
};

let debounceTimer;

export const debounceInput = (number, stateSetter) => {
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    stateSetter(number);
  }, 500);
};
