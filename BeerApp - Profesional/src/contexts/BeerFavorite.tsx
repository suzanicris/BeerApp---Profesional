import { createContext, useEffect, useState } from "react";
import { getFavoriteList, updateFavoriteList } from "../utils/localStorage";
import { Beer } from "../types";

export type ContextProps = {
  favoriteList: Beer[];
  addFavorite: (beer: Beer) => void;
  removeFavorite: (id: string) => void;
  removeAllFavorite: () => void;
  getIsFavorite: (id: string) => boolean;
};

export const Context = createContext<ContextProps>({
  favoriteList: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  removeAllFavorite: () => {},
  getIsFavorite: () => false,
});

const BeerFavoriteContext = ({ children }: { children: React.ReactNode }) => {
  const [favoriteList, setFavoriteList] = useState<Beer[]>(getFavoriteList());

  useEffect(() => {
    updateFavoriteList(favoriteList);
  }, [favoriteList]);

  const getIsFavorite = (id: string) =>
    Boolean(favoriteList.find((beer) => beer.id === id));

  const addFavorite = (beer: Beer) => {
    setFavoriteList([...favoriteList, beer]);
  };

  const removeFavorite = (id: string) => {
    const newFavoriteList = favoriteList.filter((beer) => beer.id !== id);
    setFavoriteList(newFavoriteList);
  };

  const removeAllFavorite = () => {
    setFavoriteList([]);
  };

  return (
    <Context.Provider
      value={{
        favoriteList,
        addFavorite,
        removeFavorite,
        removeAllFavorite,
        getIsFavorite,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default BeerFavoriteContext;
