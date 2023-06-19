import {
  Box,
  Button,
  Drawer,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { FormEvent, useEffect, useState } from "react";
import { FilterParams, TYPE } from "../../types";
import { getStringForApi } from "../../utils";

type FilterProps = {
  values?: FilterParams;
  onChange: (filter?: FilterParams) => void;
};

const Filter = ({ values, onChange }: FilterProps) => {
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState<FilterParams>();

  useEffect(() => {
    if (JSON.stringify(values) !== JSON.stringify(filter)) {
      setFilter(values);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const handleCancel = () => {
    setFilter(values);
    setShow(false);
  };

  const handleClear = () => {
    onChange();
    setShow(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (filter) onChange(filter);
    setShow(false);
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<FilterAltIcon />}
        onClick={() => setShow(true)}
      >
        Filters
      </Button>

      <Drawer anchor={"right"} open={show} onClose={handleCancel}>
        <Box
          component="form"
          style={{ height: "100%", padding: 24 }}
          onSubmit={handleSubmit}
        >
          <Grid
            container
            flexDirection="column"
            justifyContent="space-between"
            style={{ height: "inherit" }}
          >
            <Grid container flexDirection="column" gap={2}>
              <Typography>Filter</Typography>
              <Grid item>
                <TextField
                  label="By name"
                  variant="outlined"
                  value={filter?.by_name}
                  onChange={({ target: { value } }) =>
                    setFilter({ ...filter, by_name: getStringForApi(value) })
                  }
                />
              </Grid>
              <Grid item>
                <TextField
                  label="By city"
                  variant="outlined"
                  value={filter?.by_city}
                  onChange={({ target: { value } }) =>
                    setFilter({ ...filter, by_city: getStringForApi(value) })
                  }
                />
              </Grid>
              <Grid item>
                <TextField
                  label="By state"
                  variant="outlined"
                  value={filter?.by_state}
                  onChange={({ target: { value } }) =>
                    setFilter({ ...filter, by_state: getStringForApi(value) })
                  }
                />
              </Grid>
              <Grid item>
                <FormControl fullWidth>
                  <InputLabel id="filterByType">By type</InputLabel>
                  <Select
                    labelId="filterByType"
                    value={filter?.by_type ?? ""}
                    label="By type"
                    onChange={({ target: { value } }) =>
                      setFilter({ ...filter, by_type: value as TYPE })
                    }
                  >
                    <MenuItem value={"micro"}>micro</MenuItem>
                    <MenuItem value={"nano"}>nano</MenuItem>
                    <MenuItem value={"regional"}>regional</MenuItem>
                    <MenuItem value={"brewpub"}>brewpub</MenuItem>
                    <MenuItem value={"large"}>large</MenuItem>
                    <MenuItem value={"planning"}>planning</MenuItem>
                    <MenuItem value={"bar"}>bar</MenuItem>
                    <MenuItem value={"contract"}>contract</MenuItem>
                    <MenuItem value={"proprietor"}>proprietor</MenuItem>
                    <MenuItem value={"closed"}>closed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container justifyContent="space-between">
              <Grid item>
                <Button variant="outlined" onClick={handleClear}>
                  Clear
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" type="submit">
                  Filter
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </>
  );
};

export default Filter;
