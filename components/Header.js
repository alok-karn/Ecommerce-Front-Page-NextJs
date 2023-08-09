"use client";
import Link from "next/link";
import { styled } from "styled-components";
import Center from "./Center";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Header = () => {
    const { cartProducts } = useContext(CartContext);
    return (
        <StyledHeader>
            <Center>
                <Wrapper>
                    <Logo href={"/"}>Ecommerce</Logo>
                    <StyledNav>
                        <NavLink href={"/"}>Home</NavLink>
                        <NavLink href={"/products"}>All Products</NavLink>
                        <NavLink href={"/categories"}>Categories</NavLink>
                        <NavLink href={"/account"}>Account</NavLink>
                        <NavLink href={"/cart"}>
                            Cart ({cartProducts.length})
                        </NavLink>
                    </StyledNav>
                </Wrapper>
            </Center>
        </StyledHeader>
    );
};

const StyledHeader = styled.div`
    background-color: #333;
    /* position: fixed;
    width: 100%; */
`;
const Logo = styled(Link)`
    color: #fff;
    text-decoration: none;
    font-size: 1.2rem;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
`;

const NavLink = styled(Link)`
    color: #aaa;
    text-decoration: none;
`;

const StyledNav = styled.nav`
    display: flex;
    gap: 15px;
`;

export default Header;
