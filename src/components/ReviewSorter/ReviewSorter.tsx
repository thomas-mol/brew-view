import { useState } from "react";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { SortingOptions } from "../../constants/enums";
import "./ReviewSorter.css";

interface Props {
  onChange: (sort: any) => void;
}

const ReviewSorter = ({ onChange }: Props) => {
  const [sortOrder, setSortOrder] = useState<SortingOptions>(
    SortingOptions.DATE_DESC
  );

  function handleChange(e: SelectChangeEvent<unknown>) {
    const newSortOrder = e.target.value as SortingOptions;
    if (!Object.values(SortingOptions).includes(newSortOrder)) return; // ! Implement error handling
    setSortOrder(newSortOrder);
    onChange(newSortOrder);
  }

  return (
    <div className="select">
      <FormControl fullWidth>
        <InputLabel id="order-label">Order By</InputLabel>
        <Select
          labelId="order-label"
          id="order"
          value={sortOrder}
          label="Order By"
          onChange={(e) => handleChange(e)}
        >
          <MenuItem value={SortingOptions.DATE_DESC}>
            Date{"  "}
            <em className="option-text">
              (New to Old)
              <ArrowDownward
                style={{ fontSize: "medium", marginLeft: ".25rem" }}
                className="icon-align"
              />
            </em>
          </MenuItem>
          <MenuItem value={SortingOptions.DATE_ASC}>
            Date{"  "}
            <em className="option-text">
              (Old to New)
              <ArrowUpward
                style={{ fontSize: "medium", marginLeft: ".25rem" }}
                className="icon-align"
              />
            </em>
          </MenuItem>
          <MenuItem value={SortingOptions.SCORE_DESC}>
            Score{" "}
            <em className="option-text">
              (High to Low)
              <ArrowDownward
                style={{ fontSize: "medium", marginLeft: ".25rem" }}
                className="icon-align"
              />
            </em>
          </MenuItem>
          <MenuItem value={SortingOptions.SCORE_ASC}>
            Score{" "}
            <em className="option-text">
              (Low to High)
              <ArrowUpward
                style={{ fontSize: "medium", marginLeft: ".25rem" }}
                className="icon-align"
              />
            </em>
          </MenuItem>
          <MenuItem value={SortingOptions.ROAST_ASC}>
            Roast{" "}
            <em className="option-text">
              (Light to Dark)
              <ArrowDownward
                style={{ fontSize: "medium", marginLeft: ".25rem" }}
                className="icon-align"
              />
            </em>
          </MenuItem>
          <MenuItem value={SortingOptions.ROAST_DESC}>
            Roast{" "}
            <em className="option-text">
              (Dark to Light)
              <ArrowUpward
                style={{ fontSize: "medium", marginLeft: ".25rem" }}
                className="icon-align"
              />
            </em>
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default ReviewSorter;
