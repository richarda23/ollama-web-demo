import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import {
  ImageAnalysis,
  deleteImage,
  describeImage,
  getAnalysis,
} from "./domain/api";
import { ActionPayload } from "./domain/models";
export type ImageCardProps = {
  image: ImageAnalysis;
  dispatch: React.Dispatch<ActionPayload>;
};
type LoadingState = "LOADING" | "SUCCESS" | "FAILED" | "PENDING";
type Loading = {
  state: LoadingState;
  displayMessage: string;
};

const ImageCard: React.FC<ImageCardProps> = ({ image, dispatch }) => {
  // const [desc, setDesc] = useState<string>("");
  // const [analysis, setAnalysis] = useState<Analysis | undefined>(undefined);
  const [loading, setLoading] = useState<Loading>({
    state: "PENDING",
    displayMessage: "",
  });

  const handleClick = async () => {
    setLoading({ state: "LOADING", displayMessage: "Describing image..." });

    try {
      const desc = await describeImage(image.filename);

      dispatch({
        type: "changed",
        payload: { ...image, originalImageDescription: desc.imageDesc },
      });
      setLoading({ ...loading, displayMessage: "Analysing text..." });
      const parsedImageText = await getAnalysis(image.filename, desc.imageDesc);
      dispatch({
        type: "changed",
        payload: {
          ...image,
          originalImageDescription: desc.imageDesc,
          analysis: parsedImageText.analysis,
        },
      });

      setLoading({ state: "SUCCESS", displayMessage: "" });
    } catch (e) {
      setLoading({ state: "FAILED", displayMessage: "Failed" });
    }
  };

  const handleDelete = async () => {
    deleteImage(image.filename)
      .then((c) => {
        c && dispatch({ type: "remove", payload: image });
      })
      .finally(() => {});
  };
  return (
    <Box sx={{ p: "1em" }}>
      <img
        src={`http://localhost:3000/images/${image.filename}`}
        width={300}
        height={300}
      />
      <Button disabled={loading.state === "LOADING"} onClick={handleClick}>
        Describe
      </Button>
      <Button disabled={loading.state === "LOADING"} onClick={handleDelete}>
        Delete
      </Button>
      {image.originalImageDescription && (
        <Button
          onClick={() =>
            dispatch({
              type: "changed",
              payload: { ...image, originalImageDescription: "" },
            })
          }
        >
          Clear
        </Button>
      )}
      <Typography>{loading.displayMessage}</Typography>
      <Box display="flex" justifyContent={"space-between"}>
        {image.originalImageDescription.length > 0 && image.analysis && (
          <>
            <Box>Drone Count: {image.analysis?.droneCount}</Box>
          </>
        )}
      </Box>
      <Typography>{image.originalImageDescription}</Typography>
    </Box>
  );
};

export default ImageCard;
