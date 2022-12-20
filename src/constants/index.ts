import { countCurrencyPairs } from "../helpers/currencyCounter";

declare global {
  interface ICurrency {
    ISOCode: string;
    description: string;
    symbol: string;
  }
  interface ICurrencyWithValue extends ICurrency {
    value: number;
  }
  type DayToOffer = "TOD" | "TOM" | "SPOT";
}

const DAYS_TO_OFFER: DayToOffer[] = ["TOD", "TOM", "SPOT"];

const CURRENCIES: ICurrency[] = [
  {
    ISOCode: "USD",
    description: "US dollar",
    symbol: "$",
  },
  {
    ISOCode: "EUR",
    description: "Euro",
    symbol: "€",
  },
  {
    ISOCode: "JPY",
    description: "Japanese yen",
    symbol: "¥",
  },
  {
    ISOCode: "GBP",
    description: "Pound sterling",
    symbol: "£",
  },
  {
    ISOCode: "RUB",
    description: "Russian ruble",
    symbol: "₽",
  },
];

const getCurrencyValue = (currency: ICurrency): ICurrencyWithValue => {
  return { ...currency, value: Math.random() * 10 };
};


const currenciesWithValues = CURRENCIES.map(getCurrencyValue);
const currenciesPairsGenerator = countCurrencyPairs(currenciesWithValues);

export {
  currenciesWithValues,
  currenciesPairsGenerator,
  CURRENCIES,
  DAYS_TO_OFFER,
};
