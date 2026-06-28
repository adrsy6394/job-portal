import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <footer className="bg-primary text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-8 text-center text-sm opacity-80">
          &copy; {new Date().getFullYear()} Job Portal Management System. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
