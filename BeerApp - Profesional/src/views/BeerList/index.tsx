import { useEffect, useState } from "react";
import { Beer, FilterParams, SORT } from "../../types";
import { fetchData } from "../../utils";
import {
  Avatar,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Pagination,
} from "@mui/material";
import SportsBar from "@mui/icons-material/SportsBar";
import { useNavigate } from "react-router-dom";
import { useBeerMetaData } from "../../hooks/useBeerMetaData";
import { getBeerList } from "../../api";
import Filter from "./Filter";
import SortBy from "./SortBy";

const PARAMS = { per_page: 10 };

const BeerList = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SORT>("asc");
  const [filter, setFilter] = useState<FilterParams>();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);

  const { totalPages } = useBeerMetaData({ ...PARAMS, ...filter });

  useEffect(() => {
    fetchData(
      () =>
        getBeerList({
          ...PARAMS,
          ...filter,
          page,
          sort: `name:${sort}`,
        }),
      setBeerList
    );
  }, [page, sort, filter]);

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  return (
    <article>
      <section>
        <header>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <h1>BeerList page</h1>
            </Grid>
            <Grid item alignItems="center">
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <SortBy onChange={setSort} />
                </Grid>

                <Grid item>
                  <Filter
                    values={filter}
                    onChange={(filter) => {
                      setFilter(filter);
                      setPage(1);
                    }}
                  />
                </Grid>
              </Grid>
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
