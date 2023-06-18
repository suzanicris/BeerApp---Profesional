import { useContext } from "react";
import { Context } from "../contexts/BeerFavorite";

export const useBeerFavorite = () => useContext(Context);