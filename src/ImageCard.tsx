import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Analysis, deleteImage, describeImage } from "./domain/api";
export type ImageCardProps = {
  image: string;
  onChange: (file: string) => void;
};

const ImageCard: React.FC<ImageCardProps> = ({ image, onChange }) => {
  const [desc, setDesc] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<Analysis | undefined>(undefined);

  const handleClick = async () => {
    setLoading(true);
    setAnalysis(undefined);
    describeImage(image)
      .then((c) => {
        setDesc(c.originalImageDescription);
        setAnalysis(c.analysis);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleDelete = async () => {
    setLoading(true);
    setAnalysis(undefined);
    deleteImage(image)
      .then((c) => {
        c && onChange(image);
      })
      .finally(() => setLoading(false));
  };
  return (
    <Box sx={{ p: "1em" }}>
      <img
        src={`http://localhost:3000/images/${image}`}
        width={300}
        height={300}
      />
      <Button disabled={loading} onClick={handleClick}>
        Describe
      </Button>
      <Button disabled={loading} onClick={handleDelete}>
        Delete
      </Button>
      {desc && <Button onClick={() => setDesc("")}>Clear</Button>}
      {loading && <Typography>Loading...</Typography>}
      <Box display="flex" justifyContent={"space-between"}>
        {desc && analysis && (
          <>
            <Box>Drone Count: {analysis?.droneCount}</Box>
            <Box>Threat: {analysis?.threat}</Box>
          </>
        )}
      </Box>
      <Typography>{desc}</Typography>
    </Box>
  );
};

export default ImageCard;
