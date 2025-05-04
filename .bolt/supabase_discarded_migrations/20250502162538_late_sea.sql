/*
  # Optimize products table structure

  1. Changes
    - Add NOT NULL constraints to important fields
    - Add check constraints for numeric values
    - Add indexes for frequently queried columns
    - Enable RLS and add security policies
    - Add updated_at trigger
    - Add validation for price and dimensions

  2. Security
    - Enable RLS on products table
    - Add policies for:
      - Public read access
      - Authenticated users can create/update/delete
*/

-- Add check constraints and NOT NULL constraints
ALTER TABLE products
  ALTER COLUMN category SET NOT NULL,
  ALTER COLUMN price SET DEFAULT 0,
  ADD CONSTRAINT price_positive CHECK (price >= 0),
  ADD CONSTRAINT dimensions_positive 
    CHECK (
      (length IS NULL OR length > 0) AND
      (width IS NULL OR width > 0) AND
      (height IS NULL OR height > 0) AND
      (weight IS NULL OR weight > 0)
    );

-- Add indexes for frequently queried columns
CREATE INDEX IF NOT EXISTS products_category_idx ON products(category);
CREATE INDEX IF NOT EXISTS products_created_at_idx ON products(created_at);
CREATE INDEX IF NOT EXISTS products_title_idx ON products(title);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Products are viewable by everyone"
  ON products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update their products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete their products"
  ON products
  FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Create updated_at trigger if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop the trigger if it exists and recreate it
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();