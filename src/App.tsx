import "./App.css";
import { Box } from "@mui/material";
import Header from "./Header";
import BasicTabs from "./CustomTabPanel";

function App() {
  return (
    <Box sx={{ display: "grid", gridTemplateRows: "repeat(3, auto)" }}>
      <Header />

      <BasicTabs />
    </Box>
  );
}

export default App;
