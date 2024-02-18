import { Box } from "@mui/material";
import onedrone from "./assets/onedrone.png";
import onedroneRaw from "./assets/onedrone.png?raw";
import three_drones from "./assets/3drones.png";
import nine_drones from "./assets/9drones.png";
import tanks from "./assets/tanks.png";
import tanksfiring from "./assets/tanksfiring.png";
import ImageCard from "./ImageCard";
import { availableImages } from "./domain/api";
import { useEffect, useState } from "react";

const ImagePanel: React.FC = () => {
  const [imageNames, setImageNames] = useState<string[]>([]);
  useEffect(() => {
    availableImages().then((i) => setImageNames(i));
  }, []);
  return (
    <Box
      sx={{
        display: "grid",
        gap: "1em",
        gridTemplateColumns: "repeat(3, 1fr)",
      }}
    >
      {imageNames.map((im, i) => (
        <ImageCard image={im} raw={onedroneRaw} key={i}></ImageCard>
      ))}
    </Box>
  );
};

export default ImagePanel;
