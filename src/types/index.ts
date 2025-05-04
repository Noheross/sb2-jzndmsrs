export type Category = 
  | 'shoes' 
  | 't_shirt' 
  | 'pants'
  | 'hoodies' 
  | 'jackets' 
  | 'accessories' 
  | 'others';

export interface QCImage {
  id: number;
  imageUrl: string;
  webpUrl: string;
  groupCode: string;
  productChannel: string;
  productLink: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  main_image: string;
  category: Category;
  channel_item_no: string;
  qc_image_group_map: {
    [key: string]: QCImage[];
  } | null;
}

export interface Platform {
  id: string;
  name: string;
  logo_url: string;
  url_pattern: string;
}