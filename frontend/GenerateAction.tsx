import React, { useState } from "react";
import { Button, useBase, Loader } from "@airtable/blocks/ui";

export interface GenerateActionProps {
  bookTitle: string;
  bookRecordId: string;
  batchRecordId: string;
}

export const GenerateAction: React.FC<GenerateActionProps> = ({
  bookTitle,
  bookRecordId,
  batchRecordId,
}): React.ReactElement => {
  const [loading, setLoading] = useState(false);
  const base = useBase();
  const handleGenerate = async () => {
    setLoading(true);
    try {
      const table = base.getTableByName("Cards");
      const records = [...Array(50).keys()].map((_) => ({
        fields: {
          "Book ID": bookRecordId,
          "Book Title": bookTitle,
          Batch: [{ id: batchRecordId }],
        },
      }));
      await table.createRecordsAsync(records);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    bookRecordId &&
    bookTitle && (
      <Button disabled={loading} onClick={handleGenerate} icon="bolt">
        {`Generate (50) Cards for ${bookTitle}`}{" "}
        {loading && <Loader scale={0.3} />}
      </Button>
    )
  );
};

export default GenerateAction;
