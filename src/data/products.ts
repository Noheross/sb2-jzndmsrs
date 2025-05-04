import { supabase } from '../lib/supabase';
import type { Product } from '../types';

const PAGE_SIZE = 12;

export const getProducts = async (page: number = 1): Promise<{ data: Product[], hasMore: boolean }> => {
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error, count } = await supabase
    .from('products')
    .select('id, title, price, main_image, category, channel_item_no, qc_image_group_map', { count: 'exact' })
    .range(from, to)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return { data: [], hasMore: false };
  }

  return { 
    data: data || [], 
    hasMore: count ? from + PAGE_SIZE < count : false 
  };
};

export const getNewProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('id, title, price, main_image, category, channel_item_no, qc_image_group_map')
    .order('created_at', { ascending: false })
    .limit(8);

  if (error) {
    console.error('Error fetching new products:', error);
    return [];
  }

  return data || [];
};

export const getProductsByCategory = async (category: string, page: number = 1): Promise<{ data: Product[], hasMore: boolean, total: number }> => {
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  if (category === 'all') {
    const { data, error, count } = await supabase
      .from('products')
      .select('id, title, price, main_image, category, channel_item_no, qc_image_group_map', { count: 'exact' })
      .range(from, to)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all products:', error);
      return { data: [], hasMore: false, total: 0 };
    }

    return {
      data: data || [],
      hasMore: count ? from + PAGE_SIZE < count : false,
      total: count || 0
    };
  }

  const { count, error: countError } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('category', category);

  if (countError) {
    console.error('Error getting product count:', countError);
    return { data: [], hasMore: false, total: 0 };
  }

  if (!count || from >= count) {
    return { data: [], hasMore: false, total: count || 0 };
  }

  const { data, error } = await supabase
    .from('products')
    .select('id, title, price, main_image, category, channel_item_no, qc_image_group_map')
    .eq('category', category)
    .range(from, to)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products by category:', error);
    return { data: [], hasMore: false, total: count || 0 };
  }

  return { 
    data: data || [], 
    hasMore: from + PAGE_SIZE < (count || 0),
    total: count || 0
  };
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .select('id, title, price, main_image, category, channel_item_no, qc_image_group_map')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product by id:', error);
    return null;
  }

  return data;
};

export const getCategoryName = (category: string): string => {
  if (category === 'all') return 'All Products';
  
  switch(category.toLowerCase()) {
    case 'shoes': return 'Shoes';
    case 't_shirt': return 'T-Shirts';
    case 'pants': return 'Pants & Shorts';
    case 'hoodies-sweaters': return 'Hoodies & Sweaters';
    case 'jackets': return 'Jackets';
    case 'accessories': return 'Accessories';
    case 'others': return 'Others';
    default: return category;
  }
};