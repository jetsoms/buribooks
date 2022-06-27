import React, { useEffect, useState } from "react";
import { FormField, Input, Button, useBase, Loader } from "@airtable/blocks/ui";

export interface BatchFormProps {
  onSave: (recordId: string) => void;
  disabled: boolean;
  defaultValue: string;
  isUseExisting: boolean;
}

export const BatchForm: React.FC<BatchFormProps> = ({
  disabled,
  defaultValue = "",
  isUseExisting,
  onSave,
}) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const base = useBase();

  const handleSave = async () => {
    setLoading(true);
    try {
      const table = base.getTableByName("Batch");
      const batchId = await table.createRecordAsync({
        "Batch Code": value,
      });
      onSave(batchId);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <React.Fragment>
      <FormField marginY={1} label="Batch Code">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
        />
      </FormField>
      {!isUseExisting && value && (
        <Button marginY={1} onClick={handleSave} icon="plus">
          {`Save New Batch`} {loading && <Loader scale={0.3} />}
        </Button>
      )}
    </React.Fragment>
  );
};

export default BatchForm;
