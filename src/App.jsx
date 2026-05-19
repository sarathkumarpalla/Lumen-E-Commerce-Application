import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import PageLayout from './components/layout/PageLayout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import { useThemeStore } from './store/themeStore';

function App() {
  const darkMode = useThemeStore((state) => state.darkMode);

  // Initialize theme on mount
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
      <Toaster 
        position="bottom-right" 
        richColors 
        theme={darkMode ? 'dark' : 'light'} 
      />
    </BrowserRouter>
  );
}

export default App;
