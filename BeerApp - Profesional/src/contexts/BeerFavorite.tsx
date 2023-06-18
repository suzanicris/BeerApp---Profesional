import { createContext, useEffect, useState } from "react";
import { getFavoriteList, updateFavoriteList } from "../utils/localStorage";
import { Beer } from "../types";

type ContextProps = {
  favoriteList: Beer[];
  addFavorite: (beer: Beer) => void;
  removeFavorite: (id: string) => void;
  removeAllFavorite: () => void;
};

export const Context = createContext<ContextProps>({
  favoriteList: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  removeAllFavorite: () => {},
});

const BeerFavoriteContext = ({ children }: { children: React.ReactNode }) => {
  const [favoriteList, setFavoriteList] = useState<Beer[]>(getFavoriteList());

  useEffect(() => {
    updateFavoriteList(favoriteList);
  }, [favoriteList]);

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
      value={{ favoriteList, addFavorite, removeFavorite, removeAllFavorite }}
    >
      {children}
    </Context.Provider>
  );
};

export default BeerFavoriteContext;
