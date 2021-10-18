import React from "react";
import ContentLoader from "react-content-loader";
import Colors from "../../../styles/colors.json";
import { ContentLoaderProps } from "./interface";

const CustomContentLoader: React.FC<ContentLoaderProps> = () => {
  return (
    <div>
      <ContentLoader
        height={140}
        speed={2.5}
        backgroundColor={Colors.whiteTransparent}
        foregroundColor={Colors.whiteTransparent}
        viewBox="0 -5 110 85"
      >
        <rect x="0" y="0" rx="3" ry="3" width="110" height="20" />
      </ContentLoader>
    </div>
  );
};

export default CustomContentLoader;
