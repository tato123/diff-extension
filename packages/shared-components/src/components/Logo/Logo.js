import React from "react";
import LogoIcon from "./styles/LogoIcon";

const Logo = ({ ...rest }) => <LogoIcon {...rest} />;

Logo.Icon = LogoIcon;

export default Logo;
