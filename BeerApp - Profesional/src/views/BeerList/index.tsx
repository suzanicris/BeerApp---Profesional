import { useEffect, useState } from "react";
import { Beer, SORT } from "../../types";
import { fetchData } from "../../utils";
import {
  Avatar,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import SportsBar from "@mui/icons-material/SportsBar";
import { useNavigate } from "react-router-dom";
import { useBeerMetaData } from "../../hooks/useBeerMetaData";
import { getBeerList } from "../../api";

const PARAMS = { per_page: 10 };

const BeerList = () => {
  const navigate = useNavigate();
  const [sort, setSort] = useState<SORT>("asc");
  const [page, setPage] = useState(1);
  const [beerList, setBeerList] = useState<Array<Beer>>([]);

  const { totalPages } = useBeerMetaData(PARAMS);

  useEffect(() => {
    fetchData(
      () => getBeerList({ ...PARAMS, page, sort: `name:${sort}` }),
      setBeerList
    );
  }, [page, sort]);

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  const handleSelectChange = (e: SelectChangeEvent<"asc" | "desc">) => {
    setPage(1);
    setSort(e.target.value as SORT);
  };

  return (
    <article>
      <section>
        <header>
          <Grid container justifyContent="space-between">
            <Grid item>
              <h1>BeerList page</h1>
            </Grid>
            <Grid item>
              <FormControl>
                <InputLabel id="sortBy">Sort by</InputLabel>
                <Select
                  labelId="sortBy"
                  value={sort}
                  label="Sort by"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="asc">A to Z</MenuItem>
                  <MenuItem value="desc">Z to A</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </header>
        <main>
          <List>
            {beerList.map(({ id, name, brewery_type }) => (
              <ListItemButton key={id} onClick={() => onBeerClick(id)}>
                <ListItemAvatar>
                  <Avatar>
                    <SportsBar />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={name} secondary={brewery_type} />
              </ListItemButton>
            ))}
          </List>

          <Grid container justifyContent="center">
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
            />
          </Grid>
        </main>
      </section>
    </article>
  );
};

export default BeerList;
