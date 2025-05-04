// SubdomainHTMLPage.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

function getSubdomain() {
  const host = window.location.hostname;
  const parts = host.split('.');
  if (parts.length >= 3) return parts[0];
  return 'default';
}

export default function SubdomainHTMLPage() {
  const [html, setHtml] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHtml = async () => {
      const subdomain = getSubdomain();
      if (subdomain == "default"){
        
      }

      const { data, error } = await supabase
        .from('subdomain_sites')
        .select('html_content')
        .eq('subdomain', subdomain)
        .single();

      if (error) {
        //setError('站点加载失败，使用默认内容');
        const fallback = await supabase
          .from('subdomain_sites')
          .select('html_content')
          .eq('subdomain', 'default')
          .single();
        setHtml(fallback.data?.html_content || '<h1>默认内容</h1>');
      } else {
        setHtml(data.html_content);
      }
    };

    fetchHtml();
  }, []);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
