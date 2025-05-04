/*
  # Update products table security policies
  
  1. Changes
    - Enable Row Level Security (RLS) on products table
    - Remove existing policies
    - Add new policy for public read access only
    
  2. Security
    - Only allow SELECT operations
    - No INSERT, UPDATE, or DELETE operations allowed
*/

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON products;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON products;
DROP POLICY IF EXISTS "Enable read access for all users" ON products;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON products;

-- Create read-only policy
CREATE POLICY "Allow public read access"
ON products
FOR SELECT
TO public
USING (true);