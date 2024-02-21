import { Box } from "@mui/material";
import ImageCard from "./ImageCard";
import { availableImages } from "./domain/api";
import { useEffect, useState } from "react";
import UploadForm from "./components/FileUpload";

const ImagePanel: React.FC = () => {
  const [imageNames, setImageNames] = useState<string[]>([]);

  // refresh when new image added/deleted
  const [filesChanged, setFilesChanged] = useState<string>();
  useEffect(() => {
    availableImages().then((i) => setImageNames(i));
  }, [filesChanged]);
  return (
    <>
      {/* TODO update stlying and show file details while uploading */}
      {/* TODO cache descriptions */}
      {/* TODO fix state when adding/ deleting images - keep state high up */}
      <UploadForm onUpload={setFilesChanged} />
      <Box
        sx={{
          display: "grid",
          gap: "1em",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        {imageNames.map((im, i) => (
          <ImageCard image={im} key={i} onChange={setFilesChanged}></ImageCard>
        ))}
      </Box>
    </>
  );
};

export default ImagePanel;
