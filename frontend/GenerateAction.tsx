import React, { useState } from "react";
import {
  Button,
  useBase,
  Loader,
  FormField,
  Input,
  Text,
} from "@airtable/blocks/ui";

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
  const [created, setCreated] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const base = useBase();
  const handleGenerate = async () => {
    setLoading(true);
    try {
      const table = base.getTableByName("Cards");
      const records = [...Array(count).keys()].map((_) => ({
        fields: {
          "Book ID": bookRecordId,
          "Book Title": bookTitle,
          Batch: [{ id: batchRecordId }],
        },
      }));
      const recordCreated = await table.createRecordsAsync(records);
      setCreated(recordCreated.length);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const handleCountChange = (value: string) => {
    const count = parseInt(value, 10);
    setCount(count > 50 ? 50 : count);
  };
  return (
    bookRecordId &&
    bookTitle && (
      <React.Fragment>
        <FormField label="How many cards?">
          <Input
            value={String(count)}
            type="number"
            onChange={(e) => handleCountChange(e.target.value)}
            max={50}
          />
        </FormField>
        {count > 0 && (
          <Button disabled={loading} onClick={handleGenerate} icon="bolt">
            {`Generate (${count}) Cards for ${bookTitle}`}{" "}
            {loading && <Loader scale={0.3} />}
          </Button>
        )}
        {created > 0 && (
          <Text
            marginY={2}
          >{`${created} cards successfully, please add QR Code`}</Text>
        )}
      </React.Fragment>
    )
  );
};

export default GenerateAction;
