import React, { useContext } from "react";

import { useParams } from "react-router-dom";

import { CartContext } from "../contexts/CartContext";

import { ProductContext } from "../contexts/ProductContext";

import { Link } from "react-router-dom";

const ProductDetails = () => {
  //get the product id from url
  const { id } = useParams();
  const products = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  //get the single product based on id
  const product = products.find((item) => item.id === parseInt(id));
  
  if (!product) {
    return (
      <>
        <section className="h-screen flex flex-col justify-center items-center">
          No product found. Go to HomePage.
          <div>
            <Link to={"/"}>
              <button className="p-4 m-4 bg-red-400 text-white"> Home </button>
            </Link>
          </div>
        </section>
      </>
    );
  }

  //destructure product
  const { title, price, description, image } = product;

  return (
    <section className="pt-32 pb-12 lg:py-32 flex items-center justify-center h-screen">
      <div className="container mx-auto">
        {/* Image and Text Wrapper  */}
        <div className="flex flex-col lg:flex-row items-center">
          {/* Image  */}
          <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
            <img className="max-w-[200px] lg:max-w-sm" src={image} alt="" />
          </div>
          {/* Text  */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
              {title}
            </h1>
            <div className="text-xl text-red-500 font-medium mb-6">$ {price}</div>
            <p className="mb-8">{description}</p>
            <button onClick={() => addToCart(product, parseInt(id))} className="bg-primary py-4 px-8 text-white">Add to cart</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
