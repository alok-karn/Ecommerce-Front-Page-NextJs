import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { signIn, useSession } from "next-auth/react";
import React from "react";

const HomePage = ({ featuredProduct, newProducts }) => {
    // console.log(newProducts);
    const { data: session } = useSession();

    // if (!session) {
    //     return (
    //         <div>
    //             <h1>Login to Visit!</h1>
    //             <button onClick={() => signIn("google")}>
    //                 Login with Google
    //             </button>
    //         </div>
    //     );
    // }

    return (
        <div>
            <Header />
            <Featured product={featuredProduct} />
            <NewProducts products={newProducts} />
        </div>
    );
};

export default HomePage;

export async function getServerSideProps() {
    await mongooseConnect();
    const featuredProductID = "64cd24aa3b57b56002957397";
    const featuredProduct = await Product.findById(featuredProductID);
    const newProducts = await Product.find({}, null, {
        sort: { _id: -1 },
        limit: 10,
    });

    return {
        props: {
            featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
            newProducts: JSON.parse(JSON.stringify(newProducts)),
        },
    };
}
