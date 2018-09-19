import React from "react";

const Skeleton = ({ className, ...rest }) => (
  <div className={`${className} skeleton`} {...rest} />
);

export default Skeleton;
