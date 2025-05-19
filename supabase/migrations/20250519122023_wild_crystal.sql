/*
  # Initial database schema

  1. Tables
    - users
      - id (uuid, primary key)
      - email (text, unique)
      - name (text)
      - role (text)
      - avatar_url (text)
      - seller_status (text)
      - created_at (timestamp)
    
    - products
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - price (numeric)
      - image_url (text)
      - category (text)
      - seller_id (uuid, foreign key)
      - stock (integer)
      - rating (numeric)
      - reviews_count (integer)
      - status (text)
      - created_at (timestamp)
    
    - orders
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - total (numeric)
      - status (text)
      - shipping_address (jsonb)
      - payment_method (text)
      - created_at (timestamp)
    
    - order_items
      - id (uuid, primary key)
      - order_id (uuid, foreign key)
      - product_id (uuid, foreign key)
      - quantity (integer)
      - price (numeric)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role text NOT NULL CHECK (role IN ('buyer', 'seller', 'admin')),
  avatar_url text,
  seller_status text CHECK (seller_status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL CHECK (price > 0),
  image_url text NOT NULL,
  category text NOT NULL,
  seller_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  stock integer NOT NULL DEFAULT 0 CHECK (stock >= 0),
  rating numeric DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  reviews_count integer DEFAULT 0 CHECK (reviews_count >= 0),
  status text NOT NULL CHECK (status IN ('draft', 'published')),
  created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  total numeric NOT NULL CHECK (total >= 0),
  status text NOT NULL CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  shipping_address jsonb NOT NULL,
  payment_method text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  price numeric NOT NULL CHECK (price >= 0)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read their own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Products policies
CREATE POLICY "Anyone can view published products from approved sellers"
  ON products
  FOR SELECT
  TO authenticated
  USING (
    status = 'published' AND 
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = products.seller_id 
      AND users.seller_status = 'approved'
    )
  );

CREATE POLICY "Sellers can manage their own products"
  ON products
  FOR ALL
  TO authenticated
  USING (seller_id = auth.uid());

CREATE POLICY "Admins can manage all products"
  ON products
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Orders policies
CREATE POLICY "Users can view their own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create their own orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Sellers can view orders containing their products"
  ON orders
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM order_items oi
      JOIN products p ON p.id = oi.product_id
      WHERE oi.order_id = orders.id
      AND p.seller_id = auth.uid()
    )
  );

-- Order items policies
CREATE POLICY "Users can view their own order items"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create order items for their orders"
  ON order_items
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Sellers can view order items for their products"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = order_items.product_id
      AND products.seller_id = auth.uid()
    )
  );