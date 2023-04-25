import React, { useContext } from "react";
import { IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/io";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

const CartItem = ({ item }) => {
  const { id, title, image, price, quantity } = item;
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  return (
    <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500">
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        {/* Image */}
        <Link to={`/product/${id}`}>
          <img className="max-w-[80px]" src={image} alt={title} />
        </Link>
        <div className="w-full flex flex-col">
          {/* Title & Remove Icon  */}
          <div className="flex justify-between mb-2">
            {/* Title  */}
            <Link
              to={`/product/${id}`}
              className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline"
            >
              {title}
            </Link>

            {/* Remove Icon  */}
            <div
              onClick={() => removeFromCart(id)}
              className="text-xl cursor-pointer"
            >
              <IoMdClose className="text-gray-500 hover:text-red-500 transition" />
            </div>
          </div>
          <div className="flex gap-x-2 h-[36px] text-sm">
            {/* Quantity  */}
            <div className="flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium">
              <div className="flex-1 flex justify-center items-center cursor-pointer h-full" onClick={() => decreaseQuantity(id)}>
                {/* Minus Icon */}
                <IoMdRemove />
              </div>
              {/* Quantity */}
              <div className="h-full flex justify-center items-center px-2">
                {quantity}
              </div>
              <div className="flex-1 h-full flex justify-center items-center cursor-pointer" onClick={() => increaseQuantity(id)}>
                {/* Plus Icon  */}
                <IoMdAdd />
              </div>
            </div>
            {/* Item price  */}
            <div className="flex-1 flex items-center justify-around">$ {price}</div>
            {/* Final Price  */}
            <div className="flex-1 flex justify-end items-center text-primary font-medium">{`$ ${parseFloat(price * quantity).toFixed(2)}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
