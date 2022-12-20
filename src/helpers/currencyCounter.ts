declare global {
  interface ICurrencyPair {
    id: number;
    sell: number;
    buy: number;
    firstCurrency: ICurrencyWithValue;
    secondCurrency: ICurrencyWithValue;
  }
}

export const countCurrencyPairs = (
  currenies: ICurrencyWithValue[]
): ICurrencyPair[] => {
  const currenciesPairs = new Array();
  let genId = 0;
  return currenies.reduce((acc, currency, index) => {
    for (let x = index + 1; x < currenies.length; x++) {
      acc.push({
        id: genId++,
        buy: (currency.value / currenies[x].value).toFixed(4),
        sell: (currency.value / currenies[x].value / 1.0285).toFixed(4),
        firstCurrency: currency,
        secondCurrency: currenies[x],
      });
    }
    return acc;
  }, currenciesPairs);
};
