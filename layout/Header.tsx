"use client";

import { useState } from 'react';
import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter, usePathname } from 'next/navigation';
import UserDropdown from './UserDropdown';
import NotificationDropdown from './NotificationDropdown';
import { headerData } from '@/constants/headerData';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/store/slices/global';

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const { user } = useSelector((state: any) => state.global);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuClick = (menu: any) => {
    dispatch(setLoading(true));
    router.push(menu?.link);
    setIsMobileMenuOpen(false);
    setTimeout(() => dispatch(setLoading(false)), 600);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl shadow-sm px-6 md:px-12 py-4">
      <div className="flex justify-between items-center">
        <div
          onClick={() => {
            dispatch(setLoading(true));
            router.push(`/`);
            setTimeout(() => dispatch(setLoading(false)), 600);
          }}
          className="cursor-pointer select-none"
        >
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">MedCare Hospital</h1>
          <p className="text-sm text-gray-500 -mt-1">Sağlamlığınız bizimlə güvəndədir</p>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl hover:bg-gray-100 transition"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-7 h-7 text-gray-800" />
            ) : (
              <Bars3Icon className="w-7 h-7 text-gray-800" />
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex gap-8 text-gray-700 font-medium">
            {headerData.map((data) => (
              <li
                key={data?.value}
                onClick={() => handleMenuClick(data)}
                className={`cursor-pointer transition font-semibold text-[15px] px-2 py-1 rounded-xl hover:bg-blue-50 hover:text-blue-600 ${
                  pathname === data?.link ? 'text-blue-600 bg-blue-50' : ''
                }`}
              >
                {data?.value}
              </li>
            ))}
          </ul>
        </nav>

        {/* Icons */}
        <div className="hidden md:flex items-center gap-5">
          {user?.role === "doctor" && <NotificationDropdown />} 
          <UserDropdown />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden mt-4 animate-fade-in">
          <ul className="flex flex-col gap-3 text-gray-700 font-medium bg-white p-4 rounded-2xl shadow-lg">
            {headerData.map((data) => (
              <li
                key={data?.value}
                onClick={() => handleMenuClick(data)}
                className="cursor-pointer py-2 px-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
              >
                {data?.value}
              </li>
            ))}

            <li className="flex gap-3 px-2 mt-2 items-center border-t pt-3">
              {user?.role === "doctor" && <NotificationDropdown />} 
              <UserDropdown />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
