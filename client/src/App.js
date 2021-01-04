import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import AppRouter from "./AppRouter";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <AppRouter />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
