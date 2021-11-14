import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import dayjs from "dayjs";

import GlobalStyle from "./styles/global";

import Colors from "./styles/colors.json";

import AppProvider from "./hooks";
import Routes from "./routes";
import theme from "./styles/theme";
import { dayjsConfig } from "./services/dayjs";

export const Version = styled.span`
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: ${Colors.blackTransparent};
`;

const App: React.FC = () => {
  dayjs.locale("pt-BR", dayjsConfig);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppProvider>
          <Routes />
        </AppProvider>
        <GlobalStyle />
        <Version>0.0.6</Version>
      </ThemeProvider>
    </Router>
  );
};

export default App;
