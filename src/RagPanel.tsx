import {
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import UploadForm from "./components/FileUpload";
import { availablePdfs, postImage, rag, ragIndex } from "./domain/api";
import { useEffect, useState } from "react";

type State =
  | "pending"
  | "uploading"
  | "indexing"
  | "pendingQuery"
  | "answeringQuery";
const RagPanel: React.FC = () => {
  const [appState, setAppState] = useState<State>("pending");
  const [fName, setFName] = useState<string>();
  const [query, setQuery] = useState<string>();
  const [error, setError] = useState<string>();
  const [answer, setAnswer] = useState<string>();
  const [pdfs, setPdfs] = useState<string[]>([]);
  useEffect(() => {
    availablePdfs().then((pdfs) => setPdfs(pdfs));
  }, [fName]);
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setAppState("uploading");
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
      if (result) {
        console.log(`uploaded ${name}`);
        setFName(name);
        setAppState("indexing");
        await ragIndex(name);
        setAppState("pendingQuery");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const submitQuery = async () => {
    if (pdfs.length == 0 || !query) {
      setError("query or filename is unknown");
      return;
    }
    setAppState("answeringQuery");
    const response = await rag(pdfs[0] ?? "unknown", query);
    setAnswer(response);
    setAppState("pendingQuery");
  };

  return (
    <>
      {/* TODO update stlying and show file details while uploading */}
      {/* TODO cache descriptions */}
      {/* local storage cache of descriptions */}
      <Box display={"flex"} flexDirection={"column"}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <UploadForm handleFileUpload={handleUpload} label={"Upload PDF"} />
          {appState === "indexing" && <CircularProgress sx={{ pt: 2 }} />}
          {appState && (
            <Typography color={"blue"}>
              Current app state: {appState}
            </Typography>
          )}
        </Box>
        <Typography pt={1} textAlign={"start"}>
          Indexed files available for search
        </Typography>
        <Box>
          <List>
            {pdfs.map((file, i) => (
              <ListItem key={i}>{file}</ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <Box mt={2} display={"flex"} flexDirection="column" gap={2}>
        <>
          <TextField
            multiline
            fullWidth
            rows={5}
            label={fName && `Ask a question about ${fName}`}
            placeholder="Ask a question"
            onChange={handleChange}
          ></TextField>

          <Box display={"flex"} justifyContent={"center"}>
            <Button
              variant="contained"
              disabled={
                !query ||
                query.length == 0 ||
                (appState !== "pendingQuery" && appState !== "pending")
              }
              onClick={submitQuery}
            >
              Submit query
            </Button>

            {error && <Typography color={"red"}>{error}</Typography>}
          </Box>
        </>

        {answer && (
          <Typography color={appState == "answeringQuery" ? "grey" : "black"}>
            {answer}
          </Typography>
        )}
      </Box>
      <Box>
        <Typography textAlign={"start"}> Example questions</Typography>
        <List>
          <ListItem>What are the main threats posed by Russia</ListItem>
          <ListItem>How do we collaborate with South Korea</ListItem>
          <ListItem>How does the uk defend free shipping navigation</ListItem>
          <ListItem>
            How does the uk plan to develop relations with China
          </ListItem>
          <ListItem>What is the policy to replace Trident</ListItem>
        </List>
      </Box>
    </>
  );
};

export default RagPanel;
