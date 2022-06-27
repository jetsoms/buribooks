import React, { useState } from "react";
import { Box, initializeBlock } from "@airtable/blocks/ui";
import Record from "@airtable/blocks/dist/types/src/models/record";
import BatchForm from "./BatchForm";
import SelectBook from "./SelectBook";
import ExistingBatch from "./ExistingBatch";
import GenerateAction from "./GenerateAction";

function BuriCardGeneratorApp() {
  const [state, setState] = useState({
    isUseExistingBatch: false,
    isBookSelection: false,
  });
  const [batchCode, setBatchCode] = useState("");
  const [batchRecordId, setBatchRecordId] = useState("");
  const [book, setBook] = useState({ id: "", title: "" });

  const handleSelect = (record?: Record) => {
    if (record) {
      const code = record.getCellValue("Batch Code") as string;
      const id = record.id as string;
      setBatchCode(code);
      setBatchRecordId(id);
      setState((prev) => ({
        ...prev,
        isUseExistingBatch: true,
        isBookSelection: true,
      }));
    } else {
      setBatchCode("");
      setBatchRecordId("");
      setState((prev) => ({ ...prev, isUseExistingBatch: false }));
      setBook({ id: "", title: "" });
    }
  };

  const handleSaveBatch = (recordId: string) => {
    setBatchRecordId(recordId);
    setState((prev) => ({
      ...prev,
      isUseExistingBatch: true,
      isBookSelection: true,
    }));
  };

  const handleSelectBook = (record?: Record) => {
    if (record) {
      const id = record.id;
      const title = record.getCellValue("Book Title") as string;
      setBook({ id, title });
      handleCloseBookSelection();
    }
  };

  const handleCloseBookSelection = () =>
    setState((prev) => ({ ...prev, isBookSelection: false }));

  return (
    <Box backgroundColor="white" padding={4} overflow="hidden">
      <ExistingBatch onSelect={handleSelect} />
      <BatchForm
        disabled={state.isUseExistingBatch}
        defaultValue={batchCode}
        isUseExisting={state.isUseExistingBatch}
        onSave={handleSaveBatch}
      />
      <SelectBook
        isOpen={state.isBookSelection}
        onSelect={handleSelectBook}
        close={handleCloseBookSelection}
      />
      <GenerateAction
        bookTitle={book.title}
        bookRecordId={book.id}
        batchRecordId={batchRecordId}
      />
    </Box>
  );
}

initializeBlock(() => <BuriCardGeneratorApp />);
