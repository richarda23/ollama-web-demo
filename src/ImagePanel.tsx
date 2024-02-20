import { Box } from "@mui/material";
import ImageCard from "./ImageCard";
import { availableImages } from "./domain/api";
import { useEffect, useState } from "react";
import UploadForm from "./components/FileUpload";

const ImagePanel: React.FC = () => {
  const [imageNames, setImageNames] = useState<string[]>([]);

  // refresh when new image added
  const [filesChanged, setFilesChanged] = useState<string>();
  useEffect(() => {
    availableImages().then((i) => setImageNames(i));
  }, [filesChanged]);
  return (
    <>
      {/* TODO update stlying and show file details while uploading */}
      {/* TODO sort images by file upload order */}
      {/* TODO cache descriptions */}
      {/* TODO split description from analysis for faaster response */}
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
