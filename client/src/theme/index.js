import { createMuiTheme, colors } from "@material-ui/core";
import shadows from "./shadows";
import typography from "./typography";

const theme = createMuiTheme({
  palette: {
    background: {
      dark: "#F4F6F8",
      default: colors.common.white,
      paper: colors.common.white,
    },
    primary: {
      main: colors.indigo[500],
    },
    secondary: {
      main: "#008000",
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600],
    },
  },
  colorPrimary: {
    backgroundColor: "green",
  },
  shadows,
  typography,
});

export default theme;
