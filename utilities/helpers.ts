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
  console.log({ incomingNumber });
  if (incomingNumber == 0) return "";
  const numString = incomingNumber.toString();

  //remove the first charachter which is a dollar sign

  return numString;
};

export const convertDisplayAmountToNumber = (
  onChangeAmount: string
): number => {
  console.log({ onChangeAmount });
  if (onChangeAmount == "") return 0;

  const onChangeAmountToInt = parseInt(onChangeAmount);
  console.log({ onChangeAmountToInt });
  return onChangeAmountToInt;
};

let debounceTimer;

export const debounceInput = (number, stateSetter) => {
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    stateSetter(number);
  }, 500);
};
