import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import FavoriteButton from "../../components/FavoriteButton";
import { Beer } from "../../types";

type BeerCardProps = {
  beer: Beer;
};

const BeerCard = ({ beer }: BeerCardProps) => {
  const { name, brewery_type, state, country, website_url } = beer;

  return (
    <Card variant="outlined">
      <CardHeader
        title={
          <>
            <FavoriteButton beer={beer} />
            <span style={{ marginLeft: 16 }}>{name}</span>
          </>
        }
        subheader={`${state}, ${country}.`}
      />
      <CardContent>
        <Chip label={brewery_type} />
      </CardContent>
      <CardActions>
        <Button
          startIcon={<OpenInNewIcon />}
          size="small"
          href={website_url}
          target="_blank"
        >
          Website
        </Button>
      </CardActions>
    </Card>
  );
};

export default BeerCard;
