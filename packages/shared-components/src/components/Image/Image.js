import styled from "styled-components";

const avatarCss = () => `
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
`;

export default styled.img`
    ${({avatar}) => avatarCss()}
`;
