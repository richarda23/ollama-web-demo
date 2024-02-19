import { SxProps, Theme } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";

type UploadButtonProps = {
  sx?: SxProps<Theme>;
};
const UploadButton: React.FC<UploadButtonProps> = ({ sx }) => {
  return (
    <Button
      sx={[...(Array.isArray(sx) ? sx : [sx])]}
      variant="contained"
      color="primary"
    >
      Upload image
    </Button>
  );
};
export default UploadButton;
