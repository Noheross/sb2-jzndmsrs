/*
  # Add more shopping platforms

  1. Changes
    - Add additional shopping platforms to the platforms table
    - Each platform includes:
      - Name
      - Logo URL from Supabase storage
      - URL pattern for generating buy links

  2. New Platforms
    - Hagobuy
    - Kameymall
    - Weidian Direct
    - Taobao Direct
*/

INSERT INTO platforms (name, logo_url, url_pattern) 
VALUES 
  (
    'Hagobuy',
    'https://tzyltxobabytqwotgogx.supabase.co/storage/v1/object/public/image/platforms/hagobuy.png',
    'https://www.hagobuy.com/item?url=https://weidian.com/item.html?itemID=${itemNo}'
  ),
  (
    'Kameymall',
    'https://tzyltxobabytqwotgogx.supabase.co/storage/v1/object/public/image/platforms/kameymall.png',
    'https://www.kameymall.com/products?url=https://weidian.com/item.html?itemID=${itemNo}'
  ),
  (
    'Weidian',
    'https://tzyltxobabytqwotgogx.supabase.co/storage/v1/object/public/image/platforms/weidian.png',
    'https://weidian.com/item.html?itemID=${itemNo}'
  ),
  (
    'Taobao',
    'https://tzyltxobabytqwotgogx.supabase.co/storage/v1/object/public/image/platforms/taobao.png',
    'https://item.taobao.com/item.htm?id=${itemNo}'
  );