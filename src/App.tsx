import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import HomePage from './pages/HomePage'; // 你自己写的首页组件
import SubdomainHTMLPage from './pages/SubdomainHTMLPage'; // 渲染数据库内容的组件

function isRootDomain() {
  const host = window.location.hostname;
  console.log("host," ,host);
  if (host.startsWith("sb2jzndmsrs")){
    return true;
  }
  return (
    host === 'localhost' ||                 // 本地调试
    host === '127.0.0.1' ||
    host === 'example.com' ||              // 你的主域名
    /^[0-9.:]+$/.test(host)                // 其他可能的本地IP访问
  );
}

function App() {
  const showLocalHome = isRootDomain();

  return (
    <Router>
      <Routes>
        <Route path="/" element={showLocalHome ? <HomePage /> : <SubdomainHTMLPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
