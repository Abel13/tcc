import React from "react";

import { ScrollViewContainer } from "./styles";

const ScrollView: React.FC = ({ children }) => (
  <ScrollViewContainer>{children}</ScrollViewContainer>
);

export default ScrollView;
