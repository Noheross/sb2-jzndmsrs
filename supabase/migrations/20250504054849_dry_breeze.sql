/*
  # Update platform data with local image paths
  
  1. Changes
    - Update existing platform records with local image paths
    - Ensure no duplicate entries are created
*/

UPDATE platforms 
SET logo_url = CASE name
  WHEN 'CNFans' THEN '/platforms/cnfans.jpg'
  WHEN 'Mulebuy' THEN '/platforms/mulebuy.jpg'
  WHEN 'Hoobuy' THEN '/platforms/hoobuy.jpg'
  WHEN 'Oopbuy' THEN '/platforms/oopbuy.png'
  WHEN 'Allchinabuy' THEN '/platforms/allchinabuy.jpg'
  WHEN 'Kakobuy' THEN '/platforms/kakobuy.png'
  WHEN 'Ootdbuy' THEN '/platforms/ootdbuy.png'
  WHEN 'Joyabuy' THEN '/platforms/joyabuy.jpg'
  WHEN 'Orientdig' THEN '/platforms/orientdig.jpg'
  WHEN 'Eastmallbuy' THEN '/platforms/eastmallbuy.jpg'
  WHEN 'Ponybuy' THEN '/platforms/ponybuy.png'
  WHEN 'Lovegobuy' THEN '/platforms/lovegobuy.png'
  WHEN 'Panglobalbuy' THEN '/platforms/panglobalbuy.png'
  WHEN 'Acbuy' THEN '/platforms/acbuy.jpg'
  WHEN 'Bbdbuy' THEN '/platforms/bbdbuy.jpg'
END
WHERE name IN (
  'CNFans', 'Mulebuy', 'Hoobuy', 'Oopbuy', 'Allchinabuy', 
  'Kakobuy', 'Ootdbuy', 'Joyabuy', 'Orientdig', 'Eastmallbuy',
  'Ponybuy', 'Lovegobuy', 'Panglobalbuy', 'Acbuy', 'Bbdbuy'
);