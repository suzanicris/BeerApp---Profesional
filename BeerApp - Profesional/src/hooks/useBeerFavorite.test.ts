import { renderHook } from "@testing-library/react";
import { useBeerFavorite } from "./useBeerFavorite";

describe("useBeerFavorite", () => {
  it("returns the beer favorite context", () => {
    const { result } = renderHook(() => useBeerFavorite());

    expect(result.current).toMatchInlineSnapshot(`
Object {
  "addFavorite": [Function],
  "favoriteList": Array [],
  "getIsFavorite": [Function],
  "removeAllFavorite": [Function],
  "removeFavorite": [Function],
}
`)
  });
});