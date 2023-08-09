import { styled } from "styled-components";

const Center = ({ children }) => {
    return <StyledDiv>{children}</StyledDiv>;
};

const StyledDiv = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
`;

export default Center;
