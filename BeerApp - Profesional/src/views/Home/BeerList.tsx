import { useCallback } from "react";
import { List, ListItem } from "@mui/material";
import BeerListItem from "./BeerListItem";
import { Beer } from "../../types";
import { useBeerFavorite } from "../../hooks/useBeerFavorite";

type BeerListProps = {
  list: Beer[];
};

const BeerList = ({ list }: BeerListProps) => {
  const { favoriteList, addFavorite, removeFavorite } = useBeerFavorite();

  const getIsFavorite = useCallback(
    (id: string) => Boolean(favoriteList.find((beer) => beer.id === id)),
    [favoriteList]
  );

  return (
    <List>
      {list.map(({ id, ...beer }) => {
        const isFavorite = getIsFavorite(id);

        const handleClick = () =>
          isFavorite ? removeFavorite(id) : addFavorite({ id, ...beer });

        return (
          <ListItem key={id}>
            <BeerListItem
              beer={{ id, ...beer }}
              isFavorite={isFavorite}
              onClick={handleClick}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default BeerList;
