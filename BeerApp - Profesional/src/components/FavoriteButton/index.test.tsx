import { fireEvent, render, screen } from "@testing-library/react";
import { useBeerFavorite } from "../../hooks/useBeerFavorite";
import FavoriteButton from "./index";
import { Beer } from "../../types";

jest.mock("../../hooks/useBeerFavorite", () => ({
  useBeerFavorite: jest.fn(() => ({
    getIsFavorite: jest.fn(),
    addFavorite: jest.fn(),
    removeFavorite: jest.fn(),
  })),
}));

const addFavorite = jest.fn();
const removeFavorite = jest.fn();
const removeAllFavorite = jest.fn();
const favoriteList: Beer[] = [];

const beer = { id: "1", name: "Beer 1" } as Beer;

describe("FavoriteButton", () => {
  const mockedUseBeerFavorite = useBeerFavorite as jest.MockedFunction<
    typeof useBeerFavorite
  >;

  beforeEach(() => {
    mockedUseBeerFavorite.mockClear();
  });

  it("should render with a star border icon when not a favorite", () => {
    mockedUseBeerFavorite.mockReturnValue({
      getIsFavorite: jest.fn(() => false),
      addFavorite,
      removeFavorite,
      removeAllFavorite,
      favoriteList,
    });

    render(<FavoriteButton beer={beer} />);

    expect(screen.getByTestId("StarBorderIcon")).toBeTruthy();
  });

  it("should render with a filled star icon when it is a favorite", () => {
    mockedUseBeerFavorite.mockReturnValue({
      getIsFavorite: jest.fn(() => true),
      addFavorite,
      removeFavorite,
      removeAllFavorite,
      favoriteList,
    });

    render(<FavoriteButton beer={beer} />);

    expect(screen.getByTestId("StarIcon")).toBeTruthy();
  });

  it("should call addFavorite when clicked and not a favorite", () => {
    mockedUseBeerFavorite.mockReturnValue({
      getIsFavorite: jest.fn(() => false),
      addFavorite,
      removeFavorite,
      removeAllFavorite,
      favoriteList,
    });

    render(<FavoriteButton beer={beer} />);

    const button = screen.getByLabelText("not-favorite");

    fireEvent.click(button);

    expect(addFavorite).toHaveBeenCalledWith(beer);
    expect(removeFavorite).not.toHaveBeenCalled();
  });

  it("should call removeFavorite when clicked and is a favorite", () => {
    mockedUseBeerFavorite.mockReturnValue({
      getIsFavorite: jest.fn(() => true),
      addFavorite,
      removeFavorite,
      removeAllFavorite,
      favoriteList,
    });

    render(<FavoriteButton beer={beer} />);

    const button = screen.getByLabelText("favorite");

    fireEvent.click(button);

    expect(removeFavorite).toHaveBeenCalledWith("1");
    expect(addFavorite).not.toHaveBeenCalled();
  });
});
