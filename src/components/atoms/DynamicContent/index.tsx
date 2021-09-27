import React from 'react';
import { DynamicProps } from './interfaces';

const DynamicContent: React.FC<DynamicProps> = ({
  visible,
  children,
  style,
}) => {
  return visible ? (
    <div style={style}>{children}</div>
  ) : (
    <div style={{ width: 0, height: 0 }} />
  );
};

export default DynamicContent;
