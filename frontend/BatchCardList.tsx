import React from "react";
import { Box, RecordCardList, useBase, useRecords } from "@airtable/blocks/ui";

export const BatchCardList = ({ onSelect }) => {
  const base = useBase();
  const table = base.getTableByName("Batch");
  const queryResult = table.selectRecords();
  const records = useRecords(queryResult);
  return (
    <Box height="300px" border="thick" backgroundColor="lightGray1">
      {/* Specify which fields are shown with the `fields` prop */}
      <RecordCardList records={records} onRecordClick={onSelect} />
    </Box>
  );
};

export default BatchCardList;
