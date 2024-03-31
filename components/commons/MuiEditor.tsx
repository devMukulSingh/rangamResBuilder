import { createTheme, ThemeProvider } from "@mui/material/styles";
import MUIRichTextEditor from "mui-rte";
import { FC } from "react";

export interface EditorProps {
  data: string;
}

const MuiEditor: FC<EditorProps> = ({ data }) => {
  const myTheme = createTheme({
    // Set up your custom MUI theme here
  });

  return (
    <div>
      <ThemeProvider theme={myTheme}>
        <MUIRichTextEditor defaultValue={data} label="Start typing..." />
      </ThemeProvider>
    </div>
  );
};

export default MuiEditor;
