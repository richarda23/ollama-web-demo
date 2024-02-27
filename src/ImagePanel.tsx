import { Box } from "@mui/material";
import ImageCard from "./ImageCard";
import { availableImages, postImage } from "./domain/api";
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

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // const file = event.target.files[0];
    const formData = new FormData();
    const files = event.target.files;
    files && formData.append("file", files[0]);
    let name = "";
    if (files) {
      name = files[0].name;
    }

    console.info("file uploaded " + event.target.files?.length);
    //  formData.append("file", file);
    try {
      // You can write the URL of your server or any other endpoint used for file upload
      const result = await postImage(formData);
      dispatch({
        type: "add",
        payload: {
          analysis: { droneCount: -1 },
          originalImageDescription: "",
          filename: name,
        },
      });

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* TODO update stlying and show file details while uploading */}
      {/* TODO cache descriptions */}
      {/* local storage cache of descriptions */}
      <UploadForm handleFileUpload={handleUpload} />
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
