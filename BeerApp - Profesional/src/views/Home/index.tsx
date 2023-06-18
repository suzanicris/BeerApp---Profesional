import { useEffect, useState } from "react";
import { Button, Paper, TextField } from "@mui/material";
import { fetchData } from "../../utils";
import { Beer } from "../../types";
import { getRandomBeerList } from "../../api";
import BeerList from "./BeerList";
import styles from "./Home.module.css";
import { useBeerFavorite } from "../../hooks/useBeerFavorite";

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
              <div className={styles.listHeader}>
                <TextField label="Filter..." variant="outlined" />
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
                <h3>Saved items</h3>
                <Button
                  variant="contained"
                  size="small"
                  onClick={removeAllFavorite}
                >
                  Remove all items
                </Button>
              </div>
              <BeerList list={favoriteList} />
              {!favoriteList.length && <p>No saved items</p>}
            </div>
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default Home;
