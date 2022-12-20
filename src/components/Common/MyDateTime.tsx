import { Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export const MyDateTime = () => {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);

    return function cleanup() {
      clearInterval(timer);
    };
  }, []);

  return <Text fontSize="6xl">{date.toLocaleTimeString()}</Text>;
};
