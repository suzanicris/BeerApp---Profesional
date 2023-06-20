import { getFavoriteList, updateFavoriteList } from "./localStorage";
import { Beer } from "../types";

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("getFavoriteList", () => {
  afterEach(() => {
    localStorageMock.clear();
  });

  it("should return an empty array when localStorage is empty", () => {
    expect(getFavoriteList()).toEqual([]);
  });

  it("should return the parsed favoriteList from localStorage", () => {
    const favoriteList = [
      { id: 1, name: "Beer 1" },
      { id: 2, name: "Beer 2" },
    ];

    localStorageMock.setItem("favoriteList", JSON.stringify(favoriteList));

    expect(getFavoriteList()).toEqual(favoriteList);
  });
});

describe("updateFavoriteList", () => {
  afterEach(() => {
    localStorageMock.clear();
  });

  it("should store favoriteList in localStorage when it is not empty", () => {
    const favoriteList = [
      { id: "1", name: "Beer 1" },
      { id: "2", name: "Beer 2" },
    ] as Beer[];
    updateFavoriteList(favoriteList);
    expect(localStorageMock.getItem("favoriteList")).toEqual(
      JSON.stringify(favoriteList)
    );
  });

  it("should remove favoriteList from localStorage when it is empty", () => {
    localStorageMock.setItem("favoriteList", JSON.stringify([]));
    updateFavoriteList([]);
    expect(localStorageMock.getItem("favoriteList")).toBeNull();
  });
});
