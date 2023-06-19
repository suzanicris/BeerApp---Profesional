import { useEffect, useState } from "react";
import { Button, Paper } from "@mui/material";
import { fetchData } from "../../utils";
import { Beer } from "../../types";
import { getRandomBeerList } from "../../api";
import { useBeerFavorite } from "../../hooks/useBeerFavorite";
import AutocompleteAsync from "../../components/AutocompleteAsync";
import BeerList from "./BeerList";
import styles from "./Home.module.css";

const Home = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const { favoriteList, removeAllFavorite } = useBeerFavorite();

  const fetchRandom = () => fetchData(() => getRandomBeerList(), setBeerList);

  useEffect(() => {
    fetchRandom();
  }, []);

  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.listContainer}>
              <AutocompleteAsync />
            </div>
          </Paper>

          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Recommended For You</h3>
                <Button variant="contained" onClick={fetchRandom}>
                  Reload list
                </Button>
              </div>

              <BeerList list={beerList} />
            </div>
          </Paper>

          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Saved Beers</h3>
                <Button
                  variant="contained"
                  size="small"
                  onClick={removeAllFavorite}
                >
                  Remove all beers
                </Button>
              </div>
              <BeerList list={favoriteList} />
              {!favoriteList.length && <p>No saved beers</p>}
            </div>
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default Home;
