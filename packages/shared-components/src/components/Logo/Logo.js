import React from "react";
import LogoIcon from "./styles/Icon";
import LogoText from "./styles/Text";

const Logo = ({ ...rest }) => <LogoIcon {...rest} />;

Logo.Icon = LogoIcon;
Logo.Text = LogoText;

export default Logo;
