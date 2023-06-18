import { useEffect, useState } from "react";
import { Alert, Button } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Beer as IBeer } from "../../types";
import { useNavigate, useParams } from "react-router-dom";
import { getBeer } from "../../api";
import { fetchData } from "../../utils";
import BeerCard from "./BeerCard";

const Beer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [beer, setBeer] = useState<IBeer>();

  useEffect(() => {
    if (!id) return;

    fetchData(() => getBeer(id), setBeer);
  }, [id]);

  return (
    <article>
      <Button
        startIcon={<KeyboardBackspaceIcon />}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>

      {!beer ? (
        <Alert variant="filled" severity="info">
          This is an error alert — check it out!
        </Alert>
      ) : (
        <BeerCard beer={beer} />
      )}
    </article>
  );
};

export default Beer;
