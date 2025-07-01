'use client';
import { useEffect } from 'react';

export default function RemoveLoader() {
  useEffect(() => {
    const loader = document.getElementById('global-loader');
    if (loader) {
      loader.classList.add('fade-out');
      setTimeout(() => loader.remove(), 300);
    }
  }, []);
  return null;
} 