import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BeerFavoriteContext, { ContextProps, Context } from "./BeerFavorite";
import { getFavoriteList, updateFavoriteList } from "../utils/localStorage";
import { Beer } from "../types";

const mockGetFavoriteList = getFavoriteList as jest.MockedFunction<
  typeof getFavoriteList
>;
const mockUpdateFavoriteList = updateFavoriteList as jest.MockedFunction<
  typeof updateFavoriteList
>;

jest.mock("../utils/localStorage", () => ({
  getFavoriteList: jest.fn(),
  updateFavoriteList: jest.fn(),
}));

const beer = { id: "1", name: "beer" } as Beer;
const beer2 = { id: "2", name: "beer2" } as Beer;

describe("BeerFavoriteContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("provides the correct context values", async () => {
    (mockGetFavoriteList as jest.Mock).mockReturnValue([]);

    render(
      <BeerFavoriteContext>
        <Context.Consumer>
          {(context: ContextProps) => (
            <div>
              <span data-testid="favoriteList">
                {context.favoriteList.length}
              </span>
              <span>
                {context.getIsFavorite("1") ? "Favorite" : "Not Favorite"}
              </span>
              <button onClick={() => context.addFavorite(beer)}>
                addFavorite
              </button>
            </div>
          )}
        </Context.Consumer>
      </BeerFavoriteContext>
    );

    expect(mockGetFavoriteList).toHaveBeenCalled();

    expect(screen.getByTestId("favoriteList").textContent).toBe("0");
    expect(screen.getByText("Not Favorite")).toBeInTheDocument();

    userEvent.click(screen.getByText("addFavorite"));

    await waitFor(() => {
      expect(screen.getByTestId("favoriteList").textContent).toBe("1");
    });
    expect(mockUpdateFavoriteList).toHaveBeenLastCalledWith([beer]);
    expect(screen.getByText("Favorite")).toBeInTheDocument();
  });

  it("should update favorite list when adding and removing favorites", async () => {
    (mockGetFavoriteList as jest.Mock).mockReturnValue([beer2]);

    render(
      <BeerFavoriteContext>
        <Context.Consumer>
          {(context: ContextProps) => (
            <div>
              <span data-testid="favoriteList">
                {context.favoriteList.length}
              </span>
              <button onClick={() => context.addFavorite(beer)}>
                addFavorite
              </button>
              <button onClick={() => context.removeFavorite(beer2.id)}>
                removeFavorite
              </button>
              <button onClick={() => context.removeAllFavorite()}>
                removeAllFavorite
              </button>
            </div>
          )}
        </Context.Consumer>
      </BeerFavoriteContext>
    );

    expect(screen.getByTestId("favoriteList").textContent).toBe("1");

    userEvent.click(screen.getByText("addFavorite"));

    await waitFor(() => {
      expect(screen.getByTestId("favoriteList").textContent).toBe("2");
    });
    expect(mockUpdateFavoriteList).toHaveBeenLastCalledWith([beer2, beer]);

    userEvent.click(screen.getByText("removeFavorite"));
    await waitFor(() => {
      expect(screen.getByTestId("favoriteList").textContent).toBe("1");
    });
    expect(mockUpdateFavoriteList).toHaveBeenLastCalledWith([beer]);

    userEvent.click(screen.getByText("removeAllFavorite"));
    await waitFor(() => {
      expect(screen.getByTestId("favoriteList").textContent).toBe("0");
    });
    expect(mockUpdateFavoriteList).toHaveBeenLastCalledWith([]);
  });
});
