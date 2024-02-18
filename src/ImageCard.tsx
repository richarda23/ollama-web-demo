import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import cities from "./domain/api";
export type ImageCardProps = {
  image: string;
  raw: string;
};
const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  const [desc, setDesc] = useState<string>("");

  React.useEffect(() => {
    cities().then((c) =>
      setDesc(c.destinations.map((c) => c.description).join(","))
    );
  }, []);

  const handleClick = () => {
    setDesc((desc) => desc + ".");
  };
  return (
    <Box sx={{ p: "1em" }}>
      <img
        src={`http://localhost:3000/images/${image}`}
        width={300}
        height={300}
      />
      <Button onClick={handleClick}>Describe</Button>
      <Button onClick={() => setDesc("")}>Clear</Button>
      <Typography>{desc}</Typography>
    </Box>
  );
};

export default ImageCard;
