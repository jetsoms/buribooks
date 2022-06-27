import React, { useEffect, useState } from "react";
import { Button, Dialog, Heading, Switch, Text } from "@airtable/blocks/ui";
import BatchCardList from "./BatchCardList";
import Record from "@airtable/blocks/dist/types/src/models/record";

export interface ExistingBatchProps {
  onSelect: (record: Record) => void;
}

export const ExistingBatch: React.FC<ExistingBatchProps> = ({ onSelect }) => {
  const [batch, setBatch] = useState<Record>();
  const [isOpen, setIsOpen] = useState(false);
  const [isExist, setIsExist] = useState(false);
  const handleSelect = (record: Record) => setBatch(record);
  const handleClose = () => {
    setIsOpen(false);
    if (!batch) setIsExist(false);
  };
  const handleExistChange = (exist: boolean) => {
    setIsExist(exist);
    !batch && setIsOpen(true);
  };

  useEffect(() => {
    onSelect(batch);
    if (batch) {
      setIsOpen(false);
    }
  }, [batch]);

  useEffect(() => {
    !isExist && setBatch(undefined);
  }, [isExist]);

  return (
    <React.Fragment>
      <Switch
        label="Use existing batch"
        value={isExist}
        onChange={handleExistChange}
        marginY={1}
      />
      {isOpen && (
        <Dialog onClose={handleClose}>
          <Dialog.CloseButton />
          <Heading>Select existing batch</Heading>
          <BatchCardList onSelect={handleSelect} />
          <Button marginY={2} onClick={handleClose}>
            Close
          </Button>
        </Dialog>
      )}
    </React.Fragment>
  );
};

export default ExistingBatch;
