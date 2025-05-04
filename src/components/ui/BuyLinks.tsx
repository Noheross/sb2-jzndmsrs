import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import type { Platform } from '../../types';

interface BuyLinksProps {
  itemNo: string;
  isOpen: boolean;
  onClose: () => void;
}

const BuyLinks: React.FC<BuyLinksProps> = ({ itemNo, isOpen, onClose }) => {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const { data, error } = await supabase
          .from('platforms')
          .select('*')
          .order('name');

        if (error) {
          throw error;
        }

        setPlatforms(data || []);
      } catch (error) {
        console.error('Error fetching platforms:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchPlatforms();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getUrl = (urlPattern: string, itemNo: string) => {
    return urlPattern.replace('${itemNo}', itemNo);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div 
        ref={modalRef}
        className="relative max-h-[80vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-4 md:p-6"
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        
        <h2 className="mb-4 md:mb-6 text-xl md:text-2xl font-bold">Choose Platform</h2>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {platforms.map((platform) => (
              <a
                key={platform.id}
                href={getUrl(platform.url_pattern, itemNo)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="flex flex-col items-center rounded-lg border p-3 md:p-4 transition-all hover:border-gray-300 hover:shadow-md"
              >
                <img
                  src={platform.logo_url}
                  alt={`${platform.name} Logo`}
                  className="mb-2 md:mb-3 h-8 md:h-12 w-auto object-contain"
                />
                <span className="text-xs md:text-sm text-gray-600">{platform.name}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyLinks;