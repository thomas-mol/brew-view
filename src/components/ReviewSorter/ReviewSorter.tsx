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
import styles from "./ReviewSorter.module.css";

interface Props {
  onChange: (sort: any) => void;
}

const sortingOptions = [
  {
    label: "Date",
    value: SortingOptions.DATE_DESC,
    text: "(New to Old)",
    icon: <ArrowDownward />,
  },
  {
    label: "Date",
    value: SortingOptions.DATE_ASC,
    text: "(Old to New)",
    icon: <ArrowUpward />,
  },
  {
    label: "Score",
    value: SortingOptions.SCORE_DESC,
    text: "(High to Low)",
    icon: <ArrowDownward />,
  },
  {
    label: "Score",
    value: SortingOptions.SCORE_ASC,
    text: "(Low to High)",
    icon: <ArrowUpward />,
  },
  {
    label: "Roast",
    value: SortingOptions.ROAST_ASC,
    text: "(Light to Dark)",
    icon: <ArrowDownward />,
  },
  {
    label: "Roast",
    value: SortingOptions.ROAST_DESC,
    text: "(Dark to Light)",
    icon: <ArrowUpward />,
  },
];

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
    <div className={styles.select}>
      <FormControl fullWidth>
        <InputLabel id="order-label">Order By</InputLabel>
        <Select
          labelId="order-label"
          id="order"
          value={sortOrder}
          label="Order By"
          onChange={(e) => handleChange(e)}
        >
          {sortingOptions.map(({ label, value, text, icon }) => (
            <MenuItem key={value} value={value}>
              {label}
              {"  "}
              <em className={styles.option}>
                {text}
                {icon && (
                  <span
                    className="icon-align"
                    style={{ fontSize: "medium", marginLeft: ".25rem" }}
                  >
                    {icon}
                  </span>
                )}
              </em>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default ReviewSorter;
