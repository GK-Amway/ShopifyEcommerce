import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const [itemsQuantity, setItemsQuantity] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if(cart) {
      const totalQuantity = cart.reduce((total, curr) => {
        return total + curr.quantity;
      }, 0);

      const totalPrice = cart.reduce((total, curr) => {
        return total + (curr.quantity * curr.price);
      }, 0);

      setItemsQuantity(totalQuantity);
      setTotalPrice(parseFloat(totalPrice).toFixed(2));
    }
  }, [cart]);

  const addToCart = (product, id) => {
    const newItem = { ...product, quantity: 1 };

    const cartItem = cart.find((item) => {
      return item.id === id;
    });


    console.log({cartItem});

    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  //remove from cart
  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  //update quantity
  const increaseQuantity = (id) => {
    const newCart = [...cart].map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      } else {
        return item;
      }
    });

    setCart(newCart);
  };

  const decreaseQuantity = (id) => {
    const newCart = [...cart].map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity - 1 };
      } else {
        return item;
      }
    });

    const filteredCart = newCart.filter((item) => item.quantity > 0);

    setCart(filteredCart);
  };

  //clear cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        itemsQuantity,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
