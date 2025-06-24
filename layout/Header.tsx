"use client";

import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import UserDropdown from './UserDropdown';
import { headerData } from '@/constants/headerData';
import { useDispatch, useSelector } from 'react-redux';
import { setScrollTarget } from '@/store/slices/global';
import NotificationDropdown from './NotificationDropdown';
import { usePathname } from "next/navigation";

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const { user } = useSelector((state: any) => state.global);

  const [showSearch, setShowSearch] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuClick = (menu: any) => {
    if (pathname === "/") {
      router.push(menu?.link);
      if (menu?.ref === "doctors") {
        dispatch(setScrollTarget(menu?.ref));
      }
    } else {
      setIsMobileMenuOpen(false);
      router.push(menu?.link);
      dispatch(setScrollTarget(menu?.ref));
    }
  };
  return (
    <header style={{ boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }} className="px-6 md:px-10 py-4 bg-white">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div onClick={() => router.push("/")} className="cursor-pointer">
          <h1 className="text-2xl font-bold text-gray-900">MedCare Hospital</h1>
          <p className="text-sm text-gray-500">Sağlamlığınız bizimlə güvəndədir</p>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded hover:bg-gray-100 transition">
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6 text-gray-700" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex gap-6 text-gray-700 font-medium">
            {
              headerData.map((data) => (
                <li
                  key={data?.value}
                  onClick={() => handleMenuClick(data)}
                  className="cursor-pointer hover:text-blue-600 transition"
                >
                  {data?.value}
                </li>
              ))
            }
          </ul>
        </nav>

        {/* Right Icons */}
        <div className="hidden md:flex items-center gap-4">
          {/* Search */}
          {
            user?.role === "doctor" && (
              <NotificationDropdown />
            )
          }
          <UserDropdown />
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden mt-4">
          <ul className="flex flex-col gap-3 text-gray-700 font-medium">
            {
              headerData.map((data) => (
                <li
                  key={data?.value}
                  onClick={() => handleMenuClick(data)}
                  className="cursor-pointer hover:text-blue-600 transition px-2 py-1"
                >
                  {data?.value}
                </li>
              ))
            }
            <li className="flex gap-3 px-2 mt-2">
              {
                user?.role === "doctor" && (
                  <NotificationDropdown />
                )
              }
              <UserDropdown />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
