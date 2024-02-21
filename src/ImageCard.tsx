import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import {
  Analysis,
  deleteImage,
  describeImage,
  getAnalysis,
} from "./domain/api";
export type ImageCardProps = {
  image: string;
  onChange: (file: string) => void;
};
type LoadingState = "LOADING" | "SUCCESS" | "FAILED" | "PENDING";
type Loading = {
  state: LoadingState;
  displayMessage: string;
};

const ImageCard: React.FC<ImageCardProps> = ({ image, onChange }) => {
  const [desc, setDesc] = useState<string>("");
  const [loading, setLoading] = useState<Loading>({
    state: "PENDING",
    displayMessage: "",
  });
  const [analysis, setAnalysis] = useState<Analysis | undefined>(undefined);

  const handleClick = async () => {
    setLoading({ state: "LOADING", displayMessage: "Describing image..." });
    setAnalysis(undefined);
    try {
      const desc = await describeImage(image);

      setDesc(desc.imageDesc);
      setLoading({ ...loading, displayMessage: "Analysing text..." });
      const parsedImageText = await getAnalysis(image, desc.imageDesc);
      setAnalysis(parsedImageText.analysis);
      setLoading({ state: "SUCCESS", displayMessage: "" });
    } catch (e) {
      setLoading({ state: "FAILED", displayMessage: "Failed" });
    }
  };

  const handleDelete = async () => {
    setAnalysis(undefined);
    deleteImage(image)
      .then((c) => {
        c && onChange(image);
      })
      .finally(() => {});
  };
  return (
    <Box sx={{ p: "1em" }}>
      <img
        src={`http://localhost:3000/images/${image}`}
        width={300}
        height={300}
      />
      <Button disabled={loading.state === "LOADING"} onClick={handleClick}>
        Describe
      </Button>
      <Button disabled={loading.state === "LOADING"} onClick={handleDelete}>
        Delete
      </Button>
      {desc && <Button onClick={() => setDesc("")}>Clear</Button>}
      <Typography>{loading.displayMessage}</Typography>
      <Box display="flex" justifyContent={"space-between"}>
        {desc && analysis && (
          <>
            <Box>Drone Count: {analysis?.droneCount}</Box>
          </>
        )}
      </Box>
      <Typography>{desc}</Typography>
    </Box>
  );
};

export default ImageCard;
