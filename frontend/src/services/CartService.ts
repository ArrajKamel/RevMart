import axios from 'axios';

// Seller info
export interface SellerDto {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
}

// Product inside cart item
export interface CartItemProductDto {
  productId: string;
  productName: string;
  brand: string;
  price: number;
  model: string;
  year: number;
  used: boolean;
  fuelType: string;
  transmission: string;
  categoryName: string;
  seller: SellerDto;
}

// Cart item
export interface CartItemDto {
  id: string;
  product: CartItemProductDto;
  quantity: number;
  unitPrice: number;
}

// Add-to-cart request body
export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

const API_BASE_URL = 'http://localhost:8000/api/cart';


export const isCartExisted = async (): Promise<boolean> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/is-existed`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
          }
      });
      return response.status === 200;
    } catch (error) {
      return false;
    }
  };

  export const initCart = async (): Promise<void> => {
await axios.post(`${API_BASE_URL}/init`, {}, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
});

  };
  
  export const addItemToCart = async (request: AddToCartRequest): Promise<void> => {
    await axios.post(`${API_BASE_URL}/item`, request, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
          }
    });
  };
  
  export const getCartItems = async (): Promise<CartItemDto[]> => {
    const response = await axios.get<CartItemDto[]>(`${API_BASE_URL}/items`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
        }
    );
    return response.data;
  };