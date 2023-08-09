import { useState } from "react";
import { styled } from "styled-components";

const ProductImages = ({ images }) => {
    const [activeImage, setActiveImage] = useState(images?.[0]);
    return (
        <>
            <ImageWrapper>
                <BigImage src={activeImage} />
            </ImageWrapper>
            <ImageButtons>
                {images?.map((image, index) => (
                    <ImageButton
                        active={image === activeImage}
                        key={index}
                        onClick={() => setActiveImage(image)}>
                        <img
                            src={image}
                            style={{
                                width: "40px",
                                height: "40px",
                            }}
                        />
                    </ImageButton>
                ))}
            </ImageButtons>
        </>
    );
};
const ImageWrapper = styled.div`
    text-align: center;
`;

const BigImage = styled.img`
    max-width: 100%;
    max-height: 200px;
`;
const ImageButtons = styled.div`
    display: flex;
    gap: 10px;
`;
const ImageButton = styled.div`
    border: 1px solid transparent;

    padding: 3px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* box-shadow: 0 0 1px #aaa; */
    &:hover {
        border-color: #ccc;
    }

    ${(props) => (props.active ? `border-color: #aaa` : `border-color: #fff`)}
`;

export default ProductImages;
