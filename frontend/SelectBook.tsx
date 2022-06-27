import React, { useEffect, useState } from "react";
import { Button, Dialog, Heading, Switch, Text } from "@airtable/blocks/ui";
import BookCardList from "./BookCardList";
import Record from "@airtable/blocks/dist/types/src/models/record";

export interface SelectBookProps {
  onSelect: (record: Record) => void;
  isOpen: boolean;
  close: () => void;
}

export const SelectBook: React.FC<SelectBookProps> = ({
  onSelect,
  isOpen,
  close,
}) => {
  return (
    isOpen && (
      <Dialog onClose={close}>
        <Dialog.CloseButton />
        <Heading>Select book</Heading>
        <BookCardList onSelect={onSelect} />
        <Button marginY={2} onClick={close}>
          Close
        </Button>
      </Dialog>
    )
  );
};

export default SelectBook;
