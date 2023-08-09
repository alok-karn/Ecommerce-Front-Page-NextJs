/* eslint-disable @next/next/no-img-element */
import { isStyledComponent, styled } from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Featured = ({ product }) => {
    const { addProduct } = useContext(CartContext);
    const addFeaturedToCart = () => {
        addProduct(product._id);
    };

    return (
        <Bg>
            <Center>
                <Wrapper>
                    <div>
                        <Title>{product.title}</Title>
                        <Desc> {product.desc}</Desc>
                        <ButtonWrapper>
                            <ButtonLink
                                href={"/products/" + product._id}
                                outline={1}
                                white={1}
                                size="lg">
                                Read more
                            </ButtonLink>
                            <Button
                                primary={1}
                                size="lg"
                                onClick={addFeaturedToCart}>
                                <CartIcon /> &nbsp; Add to cart
                            </Button>
                        </ButtonWrapper>
                    </div>
                    <div>
                        <img
                            src="https://ecommerce-admin-ak.s3.ap-south-1.amazonaws.com/1691165811737.png"
                            alt=""
                        />
                    </div>
                </Wrapper>
            </Center>
        </Bg>
    );
};

const Bg = styled.div`
    background-color: #222;
    color: #ffffff;
    padding: 50px 0;
`;

const Title = styled.h1`
    margin: 0;
    font-weight: normal;
    font-size: 3rem;
`;

const Desc = styled.p`
    color: #aaa;
    font-size: 0.8rem;
    line-height: 1.3;
`;

const Wrapper = styled.div`
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-content: center;
    gap: 40px;

    img {
        max-width: 100%;
    }
`;

const ButtonWrapper = styled.div`
    margin-top: 20px;
    display: flex;
    gap: 10px;
`;

export default Featured;
