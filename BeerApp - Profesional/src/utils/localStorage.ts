import { Beer } from "../types";

export const getFavoriteList = (): Beer[] => {
  const favoriteList = localStorage.getItem("favoriteList");
  return favoriteList ? JSON.parse(favoriteList) : [];
};

export const updateFavoriteList = (favoriteList: Beer[]) => {
  if (favoriteList.length) {
    localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
    return;
  }

  localStorage.removeItem("favoriteList");
};
