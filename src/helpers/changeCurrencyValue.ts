export const changeCurrencyValue = ({
  currenciesWithValues,
}: {
  currenciesWithValues: ICurrencyWithValue[];
}) => {
  return currenciesWithValues.map((currency) => {
    Math.random() > 0.5
      ? (currency.value += Math.random() / 100)
      : (currency.value -= Math.random() / 100);
    return currency;
  });
};
