// ProductService.ts
import axios from 'axios';

export interface SellerDto {
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
  }
  
  export interface ProductResponse {
    productId: string;
    productName: string;
    brand: string;
    price: number;
    quantityAvailable: number;
    model: string;
    year: number;
    used: boolean;
    fuelType: string;
    transmission: string;
    categoryName: string;
    seller: SellerDto; // This is the seller info we want to display
  }
  

const API_BASE_URL = 'http://localhost:8000/api/product';


export const getAllProducts = async (): Promise<ProductResponse[]> => {
  try {
    const response = await axios.get<ProductResponse[]>(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
