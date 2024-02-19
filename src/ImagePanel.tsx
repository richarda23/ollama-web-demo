import { Box } from "@mui/material";
import ImageCard from "./ImageCard";
import { availableImages } from "./domain/api";
import { useEffect, useState } from "react";
import UploadButton from "./components/UploadButton";
import UploadForm from "./components/FileUpload";

const ImagePanel: React.FC = () => {
  const [imageNames, setImageNames] = useState<string[]>([]);
  useEffect(() => {
    availableImages().then((i) => setImageNames(i));
  }, []);
  return (
    <>
      <UploadForm sx={{ mt: 2 }} />
      <Box
        sx={{
          display: "grid",
          gap: "1em",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        {imageNames.map((im, i) => (
          <ImageCard image={im} key={i}></ImageCard>
        ))}
      </Box>
    </>
  );
};

export default ImagePanel;
