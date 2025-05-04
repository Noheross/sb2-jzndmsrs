/*
  # Create platforms table

  1. New Tables
    - `platforms`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `logo_url` (text)
      - `url_pattern` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `platforms` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS platforms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  logo_url text NOT NULL,
  url_pattern text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE platforms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON platforms
  FOR SELECT
  TO public
  USING (true);

-- Create trigger for updating updated_at
CREATE TRIGGER update_platforms_updated_at
  BEFORE UPDATE ON platforms
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();