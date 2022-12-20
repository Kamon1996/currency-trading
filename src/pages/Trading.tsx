import { Box, Button, Flex, Select, Stack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { currenciesWithValues, DAYS_TO_OFFER } from "../constants";
import { MyDateTime } from "../components/Common/MyDateTime";
import { CreateOfferModal } from "../components/CurrencyTradeForm/CreateOfferModal";
import { getCurrencyPairsData, getTradeArchiveData } from "../helpers/getData";
import { changeCurrencyValue } from "../helpers/changeCurrencyValue";
import { countCurrencyPairs } from "../helpers/currencyCounter";

export const Trading = () => {
  const [currenciesPairs, setCurrenciesPairs] = useState(
    getCurrencyPairsData()
  );
  const [currentCurrencyPair, setCurrentCurrencyPair] = useState(
    currenciesPairs[0]
  );
  const [dayToOfferSelect, setDayToOffer] = useState<DayToOffer>("TOD");
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const currencyWithUpdatedValues = changeCurrencyValue({
        currenciesWithValues,
      });
      const newCurrencyPairs = countCurrencyPairs(currencyWithUpdatedValues);
      localStorage.setItem("currenciesPairs", JSON.stringify(newCurrencyPairs));
      setCurrenciesPairs(newCurrencyPairs);
      setCurrentCurrencyPair((prev) => {
        const newCurrentCurrencyPair = newCurrencyPairs.find(
          (s) => s.id === prev.id
        );
        if (!newCurrentCurrencyPair) return prev;
        return newCurrentCurrencyPair;
      });
    }, 5000);

    return function cleanup() {
      clearInterval(timer);
    };
  }, []);

  const onChangeCurrency = (event: any) => {
    const selectedCurrencyPair = currenciesPairs.find(
      (pair) => pair.id === +event.target.value
    );
    if (!selectedCurrencyPair) return;
    setCurrentCurrencyPair(selectedCurrencyPair);
  };

  const onOpen = (side: "buy" | "sell") => {
    setSide(side);
    setModalIsOpen(true);
  };

  const onOffer = ({ volume }: { volume: number }) => {
    const instrument = `${currentCurrencyPair.firstCurrency.ISOCode}/${currentCurrencyPair.secondCurrency.ISOCode}_${dayToOfferSelect}`;
    const newOffer: IOffer = {
      side,
      price: currentCurrencyPair[side],
      instrument,
      volume,
      timestamp: new Date().toLocaleString(),
    };
    const tradeArchiveData = getTradeArchiveData();
    tradeArchiveData.push(newOffer);
    localStorage.setItem("tradeArchive", JSON.stringify(tradeArchiveData));
    setModalIsOpen(false);
  };

  return (
    <Stack spacing={20}>
      <MyDateTime />
      {currenciesPairs.length ? (
        <>
          <Flex>
            <Select onChange={onChangeCurrency} value={currentCurrencyPair?.id}>
              {currenciesPairs.map((pair) => (
                <option
                  key={pair.id}
                  value={pair.id}
                >{`${pair.firstCurrency.ISOCode} / ${pair.secondCurrency.ISOCode}`}</option>
              ))}
            </Select>
            <Select
              onChange={(event: any) => setDayToOffer(event.target.value)}
            >
              {DAYS_TO_OFFER.map((day) => (
                <option key={day}>{day}</option>
              ))}
            </Select>
          </Flex>
          <Flex gap={20} justify={"center"}>
            <Box color={"green"}>
              <Text>{currentCurrencyPair?.buy}</Text>
              <Button onClick={() => onOpen("buy")} colorScheme="green">
                Buy
              </Button>
            </Box>
            <Box color={"red"}>
              <Text colorScheme={"red"}>{currentCurrencyPair?.sell}</Text>
              <Button onClick={() => onOpen("sell")} colorScheme="red">
                Sell
              </Button>
            </Box>
          </Flex>
          <CreateOfferModal
            onClose={() => setModalIsOpen(false)}
            onCreate={onOffer}
            isOpen={modalIsOpen}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Stack>
  );
};
