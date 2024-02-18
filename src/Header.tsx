import { Box, Typography } from "@mui/material";
import theme from "./theme";

const Header: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        borderRadius: "1em",
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Typography variant="h2">Ollama LLM demo</Typography>
    </Box>
  );
};

export default Header;
