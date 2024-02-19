import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { postImage } from "../domain/api";

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

const UploadForm: React.FC<{ onUpload: (arg: string) => void }> = ({
  onUpload,
}) => {
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // const file = event.target.files[0];
    const formData = new FormData();
    const files = event.target.files;
    files && formData.append("file", files[0]);

    console.info("file uploaded " + event.target.files?.length);
    //  formData.append("file", file);
    try {
      // You can write the URL of your server or any other endpoint used for file upload
      const result = await postImage(formData);
      onUpload(result);

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      sx={{ mt: 2 }}
    >
      Upload image
      <VisuallyHiddenInput
        multiple={true}
        type="file"
        onChange={(e) => handleUpload(e)}
      />
    </Button>
  );
};
export default UploadForm;
