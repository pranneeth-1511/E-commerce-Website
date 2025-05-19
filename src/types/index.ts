export type UserRole = 'buyer' | 'seller' | 'admin';

export type SellerStatus = 'pending' | 'approved' | 'rejected';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  sellerStatus?: SellerStatus;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  sellerId: string;
  sellerName: string;
  stock: number;
  rating: number;
  reviews: number;
  createdAt: string;
  status: 'draft' | 'published';
}

export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: string;
}

export interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}