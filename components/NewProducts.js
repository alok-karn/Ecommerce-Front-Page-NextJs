import { styled } from "styled-components";
import Center from "./Center";
import ProductBox from "./ProductBox";
import ProductsGrid from "./ProductsGrid";

const NewProducts = ({ products }) => {
    return (
        <Center>
            <Title>New Arrivals</Title>
            <ProductsGrid products={products} />
        </Center>
    );
};

const Title = styled.h2`
    font-size: 2rem;
    /* margin: 0; */
    color: #0f0f0f;
`;

export default NewProducts;
