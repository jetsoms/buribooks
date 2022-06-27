import React from "react";
import { Box, RecordCardList, useBase, useRecords } from "@airtable/blocks/ui";
import Record from "@airtable/blocks/dist/types/src/models/record";

export interface BookCardListProps {
  onSelect: (record: Record) => void;
}

export const BookCardList = ({ onSelect }) => {
  const base = useBase();
  const table = base.getTableByName("Books");
  const queryResult = table.selectRecords();
  const records = useRecords(queryResult);
  return (
    <Box height="300px" border="thick" backgroundColor="lightGray1">
      <RecordCardList records={records} onRecordClick={onSelect} />
    </Box>
  );
};

export default BookCardList;
