import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import * as Coffee from "../../constants/enums";
import Review from "../../interfaces/review";
import { Filters } from "../../services/apiClient";
import styles from "./ReviewFilter.module.css";

interface Props {
  onChange: (filters: Filters<Review>) => void;
}

const ReviewFilter = ({ onChange }: Props) => {
  const roastOptions: string[] = Object.values(Coffee.Roast);
  const typeOptions: string[] = Object.values(Coffee.Type);

  const [roast, setRoast] = useState<Filters<Review>["roast"]>();
  const [type, setType] = useState<Filters<Review>["type"]>();

  const handleRoastChange = (value: string | null) => {
    const newRoast = value as Filters<Review>["roast"];
    setRoast(newRoast);
    onChange({ roast: newRoast, type });
  };

  const handleTypeChange = (value: string | null) => {
    const newType = value as Filters<Review>["type"];
    setType(newType);
    onChange({ roast, type: newType });
  };

  return (
    <div className={styles.filter}>
      <Autocomplete
        disablePortal
        options={typeOptions}
        value={type || null}
        onChange={(_e, value) => handleTypeChange(value)}
        renderInput={(params) => (
          <TextField {...params} label="Type" variant="outlined" />
        )}
      />

      <Autocomplete
        disablePortal
        options={roastOptions}
        value={roast || null}
        onChange={(_e, value) => handleRoastChange(value)}
        renderInput={(params) => (
          <TextField {...params} label="Roast" variant="outlined" />
        )}
      />
    </div>
  );
};

export default ReviewFilter;
