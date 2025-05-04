/*
  # Insert platform data
  
  1. Changes
    - Insert initial platform data with logos and URL patterns
  
  2. Data
    - Platform names
    - Logo URLs from Supabase storage
    - URL patterns for generating buy links
*/

INSERT INTO platforms (name, logo_url, url_pattern) 
VALUES 
  (
    'Loongbuy',
    'https://tzyltxobabytqwotgogx.supabase.co/storage/v1/object/public/image/platforms/loongbuy.png',
    'https://loongbuy.com/product-details?url=https://weidian.com/item.html?itemID=${itemNo}'
  ),
  (
    'Pandabuy',
    'https://tzyltxobabytqwotgogx.supabase.co/storage/v1/object/public/image/platforms/pandabuy.png',
    'https://www.pandabuy.com/product?url=https://weidian.com/item.html?itemID=${itemNo}'
  ),
  (
    'Sugargoo',
    'https://tzyltxobabytqwotgogx.supabase.co/storage/v1/object/public/image/platforms/sugargoo.png',
    'https://www.sugargoo.com/index/item/index.html?tp=taobao&url=https://weidian.com/item.html?itemID=${itemNo}'
  ),
  (
    'Superbuy',
    'https://tzyltxobabytqwotgogx.supabase.co/storage/v1/object/public/image/platforms/superbuy.png',
    'https://www.superbuy.com/en/page/buy?url=https://weidian.com/item.html?itemID=${itemNo}'
  ),
  (
    'Wegobuy',
    'https://tzyltxobabytqwotgogx.supabase.co/storage/v1/object/public/image/platforms/wegobuy.png',
    'https://www.wegobuy.com/en/page/buy?from=search-input&url=https://weidian.com/item.html?itemID=${itemNo}'
  ),
  (
    'Cssbuy',
    'https://tzyltxobabytqwotgogx.supabase.co/storage/v1/object/public/image/platforms/cssbuy.png',
    'https://www.cssbuy.com/item-micro-weidian${itemNo}'
  );