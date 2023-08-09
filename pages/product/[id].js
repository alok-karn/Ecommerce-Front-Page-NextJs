import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import CartIcon from "@/components/icons/CartIcon";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useContext } from "react";
import { styled } from "styled-components";

export default function ProductPage({ product }) {
    const { addProduct } = useContext(CartContext);

    return (
        <>
            <Header />
            <Center>
                <ColumnsWrapper>
                    <Box>
                        <ProductImages images={product.images} />
                    </Box>
                    <div>
                        <Title>{product.title}</Title>
                        <p>{product.desc}</p>
                        <p style={{ fontWeight: "bold", fontSize: "1rem" }}>
                            Rs. {product.price}
                        </p>
                        <Button primary onClick={() => addProduct(product._id)}>
                            <CartIcon /> &nbsp; Add to Cart
                        </Button>
                    </div>
                </ColumnsWrapper>
            </Center>
        </>
    );
}

const Title = styled.h1`
    font-size: 1.5em;
`;

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 0.8fr 1.2fr;
    gap: 40px;
    margin-top: 40px;
`;
const Box = styled.div`
    background: #fff;
    padding: 30px;
    border-radius: 10px;
`;

export async function getServerSideProps(context) {
    // console.log({ query: context.query });
    const { id } = context.query;
    await mongooseConnect();
    const product = await Product.findById(id);
    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        },
    };
}
