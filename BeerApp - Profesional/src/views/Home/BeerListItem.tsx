import { IconButton, Link, ListItemIcon } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { Beer } from "../../types";

type BeerListItemProp = {
  beer: Beer;
  isFavorite: boolean;
  onClick: () => void;
};

const BeerListItem = ({ beer, isFavorite, onClick }: BeerListItemProp) => (
  <>
    <ListItemIcon>
      <IconButton edge="end" aria-label="favorite" onClick={onClick}>
        {isFavorite ? (
          <StarIcon color="primary" />
        ) : (
          <StarBorderIcon color="primary" />
        )}
      </IconButton>
    </ListItemIcon>
    <Link component={RouterLink} to={`/beer/${beer.id}`}>
      {beer.name}
    </Link>
  </>
);

export default BeerListItem;
