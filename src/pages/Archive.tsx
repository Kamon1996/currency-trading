import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import { getTradeArchiveData } from "../helpers/getData";
declare global {
  interface IOffer {
    side: "sell" | "buy";
    price: number;
    instrument: string;
    volume: number;
    timestamp: string;
  }
}

export const Archive = () => {
  const offers = getTradeArchiveData();

  return (
    <TableContainer>
      <Table colorScheme="facebook" variant="striped" mb={20}>
        <Thead>
          <Tr>
            <Th>Side</Th>
            <Th>Price</Th>
            <Th>Instrument</Th>
            <Th>Volume</Th>
            <Th>Timestamp</Th>
          </Tr>
        </Thead>
        {offers.length > 0 && (
          <>
            <Tbody>
              {offers.map((offer) => (
                <Tr key={offer.timestamp}>
                  <Td color={offer.side === "sell" ? "red.500" : "green.500"}>
                    {offer.side.toUpperCase()}
                  </Td>
                  <Td>{offer.price}</Td>
                  <Td>{offer.instrument}</Td>
                  <Td>{offer.volume}</Td>
                  <Td>{offer.timestamp}</Td>
                </Tr>
              ))}
            </Tbody>
          </>
        )}
      </Table>
      {!offers.length && <Text>NO DATA FOUND</Text>}
    </TableContainer>
  );
};
