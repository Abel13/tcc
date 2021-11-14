import { createMuiTheme } from "@material-ui/core/styles";
import Colors from "./colors.json";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
    },
    error: {
      main: Colors.danger,
    },
    background: {
      default: Colors.white,
    },
    type: "dark",
  },
});

export default theme;
