import { currenciesPairsGenerator } from "../constants";

export const getCurrencyPairsData = (): ICurrencyPair[] => {
  let currencyPairs;
  const currenciesData = localStorage.getItem("currenciesPairs");
  if (!currenciesData) {
    currencyPairs = currenciesPairsGenerator;
    localStorage.setItem(
      "currenciesPairs",
      JSON.stringify(currenciesPairsGenerator)
    );
  } else {
    return JSON.parse(currenciesData);
  }
  return currencyPairs;
};

export const getTradeArchiveData = (): IOffer[] => {
  const tradeArchiveData = localStorage.getItem("tradeArchive");
  if (!tradeArchiveData) {
    localStorage.setItem("tradeArchive", JSON.stringify([]));
    return [];
  } else {
    return JSON.parse(tradeArchiveData);
  }
};
