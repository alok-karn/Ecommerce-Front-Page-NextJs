import styled, { css } from "styled-components";

const Button = ({ children, ...props }) => {
    return <StyledButton {...props}>{children}</StyledButton>;
};

export const ButtonStyle = css`
    border: none;

    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    display: inline-flex;
    // gap: 5px;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    /* font-weight: bold; */
    font-family: "Poppins", sans-serif;
    svg {
        height: 16px;
        // width: 16px;
        /* margin-left: -5px;
        margin-right: 5px; */
    }

    ${(props) =>
        props.block &&
        css`
            display: block;
            width: 100%;
        `}

    ${(props) =>
        props.size === "lg" &&
        css`
            padding: 10px 20px;
            font-size: 1rem;
            svg {
                height: 20px;
                width: 20px;
            }
        `}

    ${(props) =>
        props.primary &&
        !props.outline &&
        css`
            background-color: #6d28d9;
            color: white;
            border: 1px solid #6d28d9;
        `}

    ${(props) =>
        props.primary &&
        props.outline &&
        css`
            background-color: transparent;
            color: #6d28d9;
            border: 1px solid #6d28d9;
        `}

${(props) =>
        props.white &&
        !props.outline &&
        css`
            background-color: white;
            color: #000;
        `}
${(props) =>
        props.white &&
        props.outline &&
        css`
            background-color: transparent;
            color: #fff;
            border: 1px solid #fff;
        `}

${(props) =>
        props.black &&
        !props.outline &&
        css`
            background-color: #000;
            color: #fff;
        `}
${(props) =>
        props.black &&
        props.outline &&
        css`
            background-color: transparent;
            color: #000;
            border: 1px solid #000;
        `}
`;

const StyledButton = styled.button`
    ${ButtonStyle}
`;

export default Button;
