import { IconButton } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { Beer } from "../../types";
import { useBeerFavorite } from "../../hooks/useBeerFavorite";

type FavoriteButtonProps = {
  beer: Beer;
};

const FavoriteButton = ({ beer }: FavoriteButtonProps) => {
  const { getIsFavorite, addFavorite, removeFavorite } = useBeerFavorite();
  const isFavorite = getIsFavorite(beer.id);

  return (
    <IconButton
      edge="end"
      aria-label={isFavorite ? "favorite" : "not-favorite"}
      onClick={() => (isFavorite ? removeFavorite(beer.id) : addFavorite(beer))}
      title={isFavorite ? "Remove from favorite" : "Add to favorite"}
    >
      {isFavorite ? (
        <StarIcon color="primary" />
      ) : (
        <StarBorderIcon color="primary" />
      )}
    </IconButton>
  );
};

export default FavoriteButton;
