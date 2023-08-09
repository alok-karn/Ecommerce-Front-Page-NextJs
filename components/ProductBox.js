/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { styled } from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const ProductBox = ({ _id, title, desc, price, images }) => {
    const altImage = `${title} image`;
    const url = "/product/" + _id;
    const { addProduct } = useContext(CartContext);

    return (
        <ProductWrapper>
            <WhiteBox href={url}>
                {/* <img src={!images[0] ? dummyImage : images[0]} alt={altImage} /> */}

                {!images[0] ? (
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20.5869 3.423L22.0009 4.837L19.9999 6.84V18C19.9999 18.5304 19.7892 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 17.9999 20H6.83895L4.83295 22.006L3.41895 20.592L20.5869 3.423ZM12.4199 14.42L13.4209 15.421L14.4209 14.421C14.7251 14.1777 15.1079 14.0546 15.4969 14.0748C15.8858 14.0951 16.2537 14.2574 16.5309 14.531L17.9999 16V8.839L12.4199 14.419V14.42ZM15.1619 6H5.99995V12.38L8.18995 10.19L9.58095 11.581L3.99995 17.162V6C3.99995 5.46957 4.21066 4.96086 4.58573 4.58579C4.9608 4.21072 5.46951 4 5.99995 4H17.1619L15.1619 6Z"
                            // fill="black"
                            style={{
                                fill: "#222222",
                                // stroke: "#222222",
                            }}
                        />
                    </svg>
                ) : (
                    <img src={images[0]} alt={altImage} />
                )}
            </WhiteBox>
            <ProductInfoBox>
                <Title href={url}>{title}</Title>
                <PriceRow>
                    <Price>Rs. {price}</Price>
                    <Button primary outline onClick={() => addProduct(_id)}>
                        <CartIcon />
                    </Button>
                </PriceRow>
            </ProductInfoBox>
        </ProductWrapper>
    );
};

const WhiteBox = styled(Link)`
    background-color: #fff;
    padding: 20px;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);

    img {
        max-width: 100%;
        max-height: 80px;
    }
`;

const ProductWrapper = styled.div``;

const Title = styled(Link)`
    font-weight: normal;
    font-size: 0.9rem;
    margin: 0;
    text-decoration: none;
    color: #222222;
    text-transform: capitalize;
    font-weight: 600;
`;

const ProductInfoBox = styled.div`
    margin-top: 10px;
`;

const PriceRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 5px;
`;

const Price = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
`;

export default ProductBox;
