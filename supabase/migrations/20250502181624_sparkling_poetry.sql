/*
  # Add all shopping platforms

  1. Changes
    - Add new platforms to the platforms table including:
      - CNFans
      - Mulebuy
      - Hoobuy
      - Oopbuy
      - Allchinabuy
      - Kakobuy
      - Ootdbuy
      - Joyabuy
      - Orientdig
      - Eastmallbuy
      - Ponybuy
      - Lovegobuy
      - Panglobalbuy
      - Acbuy
      - Bbdbuy
*/

INSERT INTO platforms (name, logo_url, url_pattern) 
VALUES 
  (
    'CNFans',
    'https://tzyltxobabytqwotgogx.supabase.co/storage/v1/object/public/image/platforms/cnfans.jpg',
    'https://cnfans.com/product/?shop_type=weidian&id=${itemNo}&ref=658156'
  ),
  (
    'Mulebuy',
    'https://tzyltxobabytqwotgogx.supabase.co/storage/v1/object/public/image/platforms/mulebuy.jpg',
    'https://mulebuy.com/zh/product/?shop_type=weidian&id=${itemNo}&ref=200232406'
  ),
  (
    'Hoobuy',
    'https://tzyltxobabytqwotgogx.supabase.co/storage/v1/object/public/image/platforms/hoobuy.jpg',
    'https://hoobuy.com/product/2/${itemNo}?utm_source=share&utm_medium=product_details&inviteCode=vXpLpmrX'
  ),
  (
    'Oopbuy',
    'https://tzyltxobabytqwotgogx.supabase.co/storage/v1/object/public/image/platforms/oopbuy.png',
    'https://oopbuy.com/product/weidian/${itemNo}?inviteCode=U68CWQBN5'
  ),
  (
    'Allchinabuy',
    'https://tzyltxobabytqwotgogx.supabase.co/storage/v1/object/public/image/platforms/allchinabuy.jpg',
    'https://www.allchinabuy.com/cn/page/buy/?nTag=Home-search&from=search-input&_search=url&position=&url=https://weidian.com/item.html?itemId=${itemNo}&partnercode=wbVgOT'
  ),
  (
    'Kakobuy',
    'https://tzyltxobabytqwotgogx.supabase.co/storage/v1/object/public/image/platforms/kakobuy.png',
    'https://kakobuy.com/item/details?url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D${itemNo}'
  ),
  (
    'Ootdbuy',
    'https://tzyltxobabytqwotgogx.supabase.co/storage/v1/object/public/image/platforms/ootdbuy.png',
    'https://www.ootdbuy.com/goods/details?id=${itemNo}&channel=weidian&inviteCode=179LQ1SVA'
  ),
  (
    'Joyabuy',
    'https://tzyltxobabytqwotgogx.supabase.co/storage/v1/object/public/image/platforms/joyabuy.jpg',
    'https://joyagoo.com/product?id=${itemNo}&platform=WEIDIAN&ref=300189539'
  ),
  (
    'Orientdig',
    'https://tzyltxobabytqwotgogx.supabase.co/storage/v1/object/public/image/platforms/orientdig.jpg',
    'https://orientdig.com/product/?shop_type=weidian&id=${itemNo}&ref=100114240'
  ),
  (
    'Eastmallbuy',
    'https://tzyltxobabytqwotgogx.supabase.co/storage/v1/object/public/image/platforms/eastmallbuy.jpg',
    'https://eastmallbuy.com/index/weidian/itemID=${itemNo}&inviter=lianglook520'
  ),
  (
    'Ponybuy',
    'https://tzyltxobabytqwotgogx.supabase.co/storage/v1/object/public/image/platforms/ponybuy.png',
    'https://www.ponybuy.com/en-gb/goods?tracking=e6cd1dcf21&product_id=${itemNo}&platform=weidian'
  ),
  (
    'Lovegobuy',
    'https://tzyltxobabytqwotgogx.supabase.co/storage/v1/object/public/image/platforms/lovegobuy.png',
    'https://www.lovegobuy.com/product?id=${itemNo}&shop_type=weidian&invite_code=161CPG'
  ),
  (
    'Panglobalbuy',
    'https://tzyltxobabytqwotgogx.supabase.co/storage/v1/object/public/image/platforms/panglobalbuy.png',
    'https://panglobalbuy.com/#/details?type=3&offerId=${itemNo}&share_id=14918'
  ),
  (
    'Acbuy',
    'https://tzyltxobabytqwotgogx.supabase.co/storage/v1/object/public/image/platforms/acbuy.jpg',
    'https://acbuy.com/product?id=${itemNo}&source=WD&share_id=14918'
  ),
  (
    'Bbdbuy',
    'https://tzyltxobabytqwotgogx.supabase.co/storage/v1/object/public/image/platforms/bbdbuy.jpg',
    'https://bbdbuy.com/index/item/index.html?tp=taobao&tid=&searchlang=en&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D${itemNo}'
  );