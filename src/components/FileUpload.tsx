import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ActionPayload } from "../domain/models";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

type UploadFormProps = {
  dispatch?: React.Dispatch<ActionPayload>;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
};

const UploadForm: React.FC<UploadFormProps> = ({ handleFileUpload, label }) => {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      sx={{ mt: 2 }}
    >
      {label ? label : "Upload image"}
      <VisuallyHiddenInput
        multiple={true}
        type="file"
        onChange={(e) => handleFileUpload(e)}
      />
    </Button>
  );
};
export default UploadForm;
