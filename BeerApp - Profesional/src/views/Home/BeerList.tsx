import { Link as RouterLink } from "react-router-dom";
import { Link, List, ListItem, ListItemIcon } from "@mui/material";
import { Beer } from "../../types";
import FavoriteButton from "../../components/FavoriteButton";

type BeerListProps = {
  list: Beer[];
};

const BeerList = ({ list }: BeerListProps) => (
  <List>
    {list.map((beer) => (
      <ListItem key={beer.id}>
        <ListItemIcon>
          <FavoriteButton beer={beer} />
        </ListItemIcon>
        <Link component={RouterLink} to={`/beer/${beer.id}`}>
          {beer.name}
        </Link>
      </ListItem>
    ))}
  </List>
);

export default BeerList;
