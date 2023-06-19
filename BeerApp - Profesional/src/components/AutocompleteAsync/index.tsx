import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Autocomplete, TextField } from "@mui/material";
import { fetchData } from "../../utils";
import { searchBeerList } from "../../api";

type BeerOption = {
  id: string;
  name: string;
};

const AutocompleteAsync = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [options, setOptions] = useState<BeerOption[]>([]);

  useEffect(() => {
    if (!value) {
      setOptions([]);
      return;
    }

    fetchData(() => searchBeerList(value, true), setOptions);
  }, [value]);

  return (
    <Autocomplete
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      filterOptions={(x) => x}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name}
      options={options}
      onChange={(_, value) => navigate("/beer/" + value!.id)}
      noOptionsText={!value ? 'Start typing to search...' : 'No beer found.'}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search beer"
          onChange={(e) => setValue(e.target.value)}
        />
      )}
    />
  );
};

export default AutocompleteAsync;
