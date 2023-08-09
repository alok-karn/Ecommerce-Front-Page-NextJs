import { styled } from "styled-components";
import ProductBox from "./ProductBox";

export default function ProductsGrid({ products }) {
    return (
        <StyledProductsGrid>
            {products?.length > 0 &&
                products.map((product) => (
                    <ProductBox {...product} key={product._id} />
                ))}
        </StyledProductsGrid>
    );
}

const StyledProductsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
    padding-top: 20px;
`;
