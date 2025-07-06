import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    const now = new Date();
    const hour = now.getHours();

    // Mode sombre auto entre 18h et 6h si aucun thème choisi
    const autoDark = hour >= 18 || hour < 6;

    if (theme === 'dark' || (!theme && (window.matchMedia('(prefers-color-scheme: dark)').matches || autoDark))) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return { isDark, toggleTheme };
};