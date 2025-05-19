import { User, Product } from '../types';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'John Seller',
    email: 'seller@example.com',
    role: 'seller',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    createdAt: '2023-01-15T14:23:45Z',
    sellerStatus: 'approved'
  },
  {
    id: 'user-2',
    name: 'Jane Buyer',
    email: 'buyer@example.com',
    role: 'buyer',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    createdAt: '2023-02-20T09:15:30Z'
  },
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    createdAt: '2023-01-01T00:00:00Z'
  }
];

export const mockProducts: Product[] = [
  {
    id: 'product-1',
    title: 'Premium Wireless Headphones',
    description: 'Experience crystal clear sound with our premium wireless headphones. Features noise cancellation and 20-hour battery life.',
    price: 149.99,
    imageUrl: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Electronics',
    sellerId: 'user-1',
    sellerName: 'John Seller',
    stock: 15,
    rating: 4.7,
    reviews: 124,
    createdAt: '2023-03-10T11:45:22Z',
    status: 'published'
  },
  {
    id: 'product-2',
    title: 'Smart Fitness Watch',
    description: 'Track your fitness goals with this smart watch. Features heart rate monitoring, sleep tracking, and more.',
    price: 99.99,
    imageUrl: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Electronics',
    sellerId: 'user-1',
    sellerName: 'John Seller',
    stock: 23,
    rating: 4.5,
    reviews: 89,
    createdAt: '2023-03-15T14:30:10Z',
    status: 'published'
  }
];

export const categories = [
  'All',
  'Electronics',
  'Fashion',
  'Home Decor',
  'Furniture',
  'Photography',
  'Books',
  'Sports',
  'Toys',
  'Beauty',
];