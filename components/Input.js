import { styled } from "styled-components";

export default function Input(props) {
    return <StyledInput {...props} />;
}

const StyledInput = styled.input`
    width: 100%;
    padding: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 10px;
    border-radius: 5px;
    box-sizing: border-box;
    /* font-family: "Poppins", sans-serif; */
`;
