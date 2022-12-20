import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useState } from "react";

interface ICreateOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: ({ volume }: { volume: number }) => void;
}

export const CreateOfferModal = ({
  isOpen,
  onClose,
  onCreate,
}: ICreateOfferModalProps) => {
  const [volume, setVolume] = useState<number>(100.00);
  
  const onChange = (value: any) => {
    setVolume(+value);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Make order</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <NumberInput
            value={volume}
            onChange={onChange}
            precision={2}
            step={0.01}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="green" onClick={() => onCreate({ volume })}>
            Order
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
