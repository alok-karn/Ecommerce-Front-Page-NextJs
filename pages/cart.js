/* eslint-disable @next/next/no-img-element */
import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { css, styled } from "styled-components";

const CartPage = () => {
    const { cartProducts, addProduct, removeProduct, clearCart } =
        useContext(CartContext);
    const [products, setProducts] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [country, setCountry] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (cartProducts.length > 0) {
            axios.post("/api/cart", { ids: cartProducts }).then((response) => {
                setProducts(response.data);
            });
        } else {
            setProducts([]);
        }
    }, [cartProducts]);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }
        if (window?.location.href.includes("success")) {
            // console.log(window.location);
            setIsSuccess(true);
            clearCart();
        }
    }, []);

    function moreOfThisProduct(id) {
        addProduct(id);
    }

    function lessOfThisProduct(id) {
        removeProduct(id);
    }

    async function goToPayment() {
        const response = await axios.post("/api/checkout", {
            name,
            email,
            city,
            postalCode,
            streetAddress,
            country,
            cartProducts,
        });

        if (response.data.url) {
            window.location = response.data.url;
        }
    }

    let total = 0;

    for (const productId of cartProducts) {
        const price = products.find((p) => p._id === productId)?.price || 0;
        total += price;
    }

    const router = useRouter();
    const isOrderSuccess = router.asPath.includes("success");
    // ("use server");

    if (isSuccess) {
        // console.log(window.location);
        return (
            <>
                <Header />
                <Center>
                    <ColumnsWrapper>
                        <Box>
                            <h1>Thanks for Purchasing!</h1>
                            <p>
                                Further details will be shared through mail ...
                            </p>
                        </Box>
                    </ColumnsWrapper>
                </Center>
            </>
        );
    }

    return (
        <div>
            <Header />
            <Center>
                <ColumnsWrapper>
                    <Box>
                        {!cartProducts?.length && (
                            <h2>Nothing in your Bucket</h2>
                        )}
                        {products?.length > 0 && <h2>Your Cart</h2>}
                        {products?.length > 0 && (
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product._id}>
                                            <ProductInfoCell>
                                                <ProductImageBox>
                                                    <img
                                                        src={product.images[0]}
                                                        alt=""
                                                    />
                                                </ProductImageBox>

                                                {product.title}
                                            </ProductInfoCell>
                                            <td>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        gap: "5px",
                                                        alignItems: "center",
                                                    }}>
                                                    <Button
                                                        onClick={() =>
                                                            lessOfThisProduct(
                                                                product._id
                                                            )
                                                        }>
                                                        -
                                                    </Button>
                                                    <QuantityLabel>
                                                        {
                                                            cartProducts.filter(
                                                                (id) =>
                                                                    id ===
                                                                    product._id
                                                            ).length
                                                        }{" "}
                                                    </QuantityLabel>

                                                    <Button
                                                        onClick={() =>
                                                            moreOfThisProduct(
                                                                product._id
                                                            )
                                                        }>
                                                        +
                                                    </Button>
                                                </div>
                                            </td>
                                            <td>
                                                Rs.
                                                {cartProducts.filter(
                                                    (id) => id === product._id
                                                ).length * product.price}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td></td>
                                        <td>
                                            <strong>Total</strong>
                                        </td>
                                        <td>
                                            <strong>Rs. {total}</strong>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        )}
                    </Box>
                    {!!cartProducts?.length && (
                        <Box>
                            <h2>Order Information</h2>

                            <Input
                                type="text"
                                placeholder="Name"
                                value={name}
                                name="name"
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Input
                                type="text"
                                placeholder="Email"
                                value={email}
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <CityHolder>
                                <Input
                                    type="text"
                                    placeholder="City"
                                    value={city}
                                    name="city"
                                    onChange={(e) => setCity(e.target.value)}
                                />
                                <Input
                                    type="text"
                                    placeholder="Postal Code"
                                    value={postalCode}
                                    name="postalCode"
                                    onChange={(e) =>
                                        setPostalCode(e.target.value)
                                    }
                                />
                            </CityHolder>

                            <Input
                                type="text"
                                placeholder="Street Address"
                                value={streetAddress}
                                name="streetAddress"
                                onChange={(e) =>
                                    setStreetAddress(e.target.value)
                                }
                            />
                            <Input
                                type="text"
                                placeholder="Country"
                                value={country}
                                name="country"
                                onChange={(e) => setCountry(e.target.value)}
                            />
                            {/* <input
                                    type="hidden"
                                    name="products"
                                    value={cartProducts.join(",")}
                                /> */}
                            <Button block black onClick={goToPayment}>
                                {" "}
                                Continue to payment
                            </Button>
                        </Box>
                    )}
                </ColumnsWrapper>
            </Center>
        </div>
    );
};

const ColumnsWrapper = styled.div`
    margin-top: 40px;
    display: grid;
    grid-template-columns: 1.3fr 0.7fr;
    gap: 40px;
    /* padding: 20px; */
`;

const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
`;

const ProductInfoCell = styled.td`
    padding: 10px 0;
`;

const ProductImageBox = styled.div`
    width: 100px;
    height: 100px;
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        max-width: 80px;
        max-height: 80px;
    }
`;

const QuantityLabel = styled.span`
    padding: 0 3px;
`;

const CityHolder = styled.div`
    display: flex;
    gap: 5px;
`;

export default CartPage;
