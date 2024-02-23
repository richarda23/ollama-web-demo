import { Box } from "@mui/material";
import ImageCard from "./ImageCard";
import { availableImages } from "./domain/api";
import { useEffect, useReducer } from "react";
import UploadForm from "./components/FileUpload";
import { ImageCards, reducer } from "./domain/models";
const ImagePanel: React.FC = () => {
  const [imageCards, dispatch] = useReducer(reducer, []);

  // refresh when new image added/deleted
  useEffect(() => {
    availableImages().then((i) => {
      const cards: ImageCards = i.map((i) => ({
        analysis: { droneCount: -1 },
        originalImageDescription: "",
        filename: i,
      }));
      dispatch({ type: "replace", payload: cards });
    });
  }, []);
  return (
    <>
      {/* TODO update stlying and show file details while uploading */}
      {/* TODO cache descriptions */}
      {/* TODO fix state when adding/ deleting images - keep state high up */}
      <UploadForm dispatch={dispatch} />
      <Box
        sx={{
          display: "grid",
          gap: "1em",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        {imageCards.map((im, i) => (
          <ImageCard image={im} key={i} dispatch={dispatch}></ImageCard>
        ))}
      </Box>
    </>
  );
};

export default ImagePanel;
