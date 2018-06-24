import styled from "styled-components";

const Label = styled.label`
  color: ${({ theme }) => theme.colors.textColor};
`;

Label.Small = styled(Label)`
  font-size: ${({ theme }) => theme.text.size.small};
`;

export default Label;
