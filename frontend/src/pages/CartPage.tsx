// CartPage.tsx
import React, { useEffect, useState } from 'react';
import {
  isCartExisted,
  initCart,
  getCartItems,
  CartItemDto,
} from '../services/CartService';
import '../style/CartPage.css';

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemDto[]>([]);
  const [cartExists, setCartExists] = useState<boolean>(false);

  useEffect(() => {
    isCartExisted().then((exists) => {
      setCartExists(exists);
      if (exists) {
        getCartItems()
          .then(setCartItems)
          .catch((err) => console.error(err));
      }
    });
  }, []);

  const handleCreateCart = () => {
    initCart()
      .then(() => setCartExists(true))
      .then(() => getCartItems().then(setCartItems))
      .catch((err) => console.error(err));
  };

  return (
    <div className="cart-container">
      <h1 className="page-title">Cart Page</h1>
      {!cartExists ? (
        <div className="create-cart-wrapper">
          <button className="create-cart-button" onClick={handleCreateCart}>
            Create a Cart
          </button>
        </div>
      ) : (
        <div className="cart-grid">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-card">
              <h2>{item.product.productName}</h2>
              <p><strong>Brand:</strong> {item.product.brand}</p>
              <p><strong>Price:</strong> ${item.unitPrice.toFixed(2)}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Year:</strong> {item.product.year}</p>
              <p><strong>Used:</strong> {item.product.used ? 'Yes' : 'No'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;