import React, { useEffect, useState } from 'react';
import { getAllProducts, ProductResponse } from '../services/ProductService';
import { addItemToCart } from '../services/CartService';
import '../style/ProductPage.css';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductResponse | null>(null);
  const [quantity, setQuantity] = useState<number>(1); // Add state for quantity

  useEffect(() => {
    getAllProducts().then(setProducts).catch(err => console.error(err));
  }, []);

  const handleAddToCart = async (productId: string) => {
    try {
      const jwt = localStorage.getItem('jwt');
      if (!jwt) {
        alert('You need to be logged in to add items to the cart!');
        return;
      }

      // Ensure the quantity is greater than 0
      if (quantity <= 0) {
        alert('Please enter a valid quantity!');
        return;
      }

      await addItemToCart({
        productId: productId,
        quantity: quantity,
      });

      alert('Product added to cart!');
      setQuantity(1); // Reset the quantity after successful addition
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add product to cart.\n unsufficient quantity');
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  return (
    <div className="products-container">
      <h1 className="page-title">Products Page</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div
            key={product.productId}
            className="product-card"
            onClick={() => setSelectedProduct(product)}
          >
            <h2>{product.productName}</h2>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
            <p><strong>Year:</strong> {product.year}</p>
            <p><strong>Used:</strong> {product.used ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedProduct.productName} Details</h2>
            <p><strong>Brand:</strong> {selectedProduct.brand}</p>
            <p><strong>Model:</strong> {selectedProduct.model}</p>
            <p><strong>Year:</strong> {selectedProduct.year}</p>
            <p><strong>Price:</strong> ${selectedProduct.price.toFixed(2)}</p>
            <p><strong>Quantity Available:</strong> {selectedProduct.quantityAvailable}</p>
            <p><strong>Fuel Type:</strong> {selectedProduct.fuelType}</p>
            <p><strong>Transmission:</strong> {selectedProduct.transmission}</p>

            {/* Seller Info */}
            <div className="seller-info">
              <h3>Seller Information:</h3>
              <p><strong>Name:</strong> {selectedProduct.seller.firstname} {selectedProduct.seller.lastname}</p>
              <p><strong>Email:</strong> {selectedProduct.seller.email}</p>
              <p><strong>Phone:</strong> {selectedProduct.seller.phoneNumber}</p>
            </div>

            {/* Quantity Input */}
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                min="1"
                max={selectedProduct.quantityAvailable}
                onChange={handleQuantityChange}
              />
            </div>

            <button onClick={() => setSelectedProduct(null)}>Close</button>
            <button onClick={() => handleAddToCart(selectedProduct.productId)}>
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
