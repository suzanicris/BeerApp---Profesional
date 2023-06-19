import { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import { SORT } from "../../types";

type SortByProps = {
  onChange: (value: SORT) => void;
};

const SortBy = ({ onChange }: SortByProps) => {
  const [sortAsc, setSortAsc] = useState(true);

  const handleChange = () => {
    const value = !sortAsc;
    setSortAsc(value);
    onChange(value ? "asc" : "desc");
  };

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Typography
          variant="overline"
          display="block"
          gutterBottom
          style={{ display: "initial" }}
        >
          Sort by
        </Typography>
      </Grid>
      <Grid item>
        <Button
          startIcon={
            <SortIcon style={{ transform: sortAsc ? "none" : "scaleY(-1)" }} />
          }
          style={{ margin: "0 24px 0 4px" }}
          onClick={handleChange}
        >
          {sortAsc ? "A to Z" : "Z to A"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default SortBy;
