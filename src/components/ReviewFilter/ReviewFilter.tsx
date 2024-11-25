import * as Coffee from "../../constants/enums";
import { useEffect, useState } from "react";
import Review from "../../interfaces/review";
import { Filters } from "../../services/apiClient";
import "./ReviewFilter.css";
import { Autocomplete, TextField } from "@mui/material";

interface Props {
  onChange: (filters: Filters<Review>) => void;
}

const ReviewFilter = ({ onChange }: Props) => {
  const [roast, setRoast] = useState<Filters<Review>["roast"]>();
  const roastOptions: string[] = Object.values(Coffee.Roast);

  const [type, setType] = useState<Filters<Review>["type"]>();
  const typeOptions: string[] = Object.values(Coffee.Type);

  useEffect(() => {
    onChange({ roast, type });
  }, [roast, type]);

  return (
    <div className="filter">
      <Autocomplete
        color="red"
        disablePortal
        options={roastOptions}
        value={roast}
        onChange={(event, value) => setRoast(value as Filters<Review>["roast"])}
        renderInput={(params) => (
          <TextField {...params} label="Roast" variant="outlined" />
        )}
      />

      <Autocomplete
        disablePortal
        options={typeOptions}
        value={type}
        onChange={(event, value) => setType(value as Filters<Review>["type"])}
        renderInput={(params) => (
          <TextField {...params} label="Type" variant="outlined" />
        )}
      />
    </div>
  );
};

export default ReviewFilter;
