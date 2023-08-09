import Link from "next/link";
import { styled } from "styled-components";
import { ButtonStyle } from "./Button";

const ButtonLink = (props) => {
    return <StyledLinkButton {...props} />;
};

const StyledLinkButton = styled(Link)`
    ${ButtonStyle}
`;

export default ButtonLink;
