import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  CalendarCheck,
  MessageCircle,
  User,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/../public/logo.png";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: "/", label: "Trang chủ" },
  { href: "#rooms", label: "Phòng" },
  { href: "#services", label: "Dịch vụ" },
  { href: "#contact", label: "Liên hệ" },
];

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const lastScrollY = useRef(0);
  const controls = useAnimation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current + 10) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY.current - 10) {
        setScrollDirection("up");
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    controls.start(scrollDirection === "down" ? "collapsed" : "expanded");
  }, [scrollDirection]);

  const headerVariants = {
    expanded: {
      paddingTop: "16px",
      paddingBottom: "16px",
      transition: { duration: 0.3 },
    },
    collapsed: {
      paddingTop: "6px",
      paddingBottom: "6px",
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.header
      className="sticky top-0 z-50 bg-[#003580] text-white w-full shadow-md"
      initial="expanded"
      animate={controls}
      variants={headerVariants}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 group">
            <div className="bg-[#feba02] p-2 rounded-full shadow-md group-hover:animate-pulse transition-all">
              <img
                src={Logo}
                alt="Logo"
                className={`object-contain transition-all duration-300 ${
                  scrollDirection === "down" ? "w-6 h-6" : "w-8 h-8"
                }`}
              />
            </div>
            <div className="text-center">
              <h1
                className={`font-roboto font-extrabold text-transparent bg-clip-text bg-white transition-all ${
                  scrollDirection === "down" ? "text-base" : "text-lg"
                }`}
              >
                Happy Travel
              </h1>
              <p
                className={`text-[#7c90a6] font-medium transition-all ${
                  scrollDirection === "down" ? "text-[10px]" : "text-xs"
                }`}
              >
                Premium Hotel Booking
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-white lg:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>

          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`font-roboto font-medium hover:brightness-125 transition-all group ${
                  scrollDirection === "down" ? "text-sm" : "text-base"
                } text-[#f2f6fa]`}
              >
                {item.label}
                <span className="block h-0.5 w-0 bg-[#feba02] group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}

            {!currentUser ? (
              <>
                <a
                  href="/login"
                  className={`font-roboto font-medium hover:brightness-125 transition-all group ${
                    scrollDirection === "down" ? "text-sm" : "text-base"
                  } text-[#f2f6fa]`}
                >
                  Đăng nhập
                  <span className="block h-0.5 w-0 bg-[#feba02] group-hover:w-full transition-all duration-300"></span>
                </a>

                <a
                  href="/register"
                  className={`font-roboto font-medium hover:brightness-125 transition-all group ${
                    scrollDirection === "down" ? "text-sm" : "text-base"
                  } text-[#feba02]`}
                >
                  Đăng ký
                  <span className="block h-0.5 w-0 bg-[#feba02] group-hover:w-full transition-all duration-300"></span>
                </a>
              </>
            ) : (
              <div ref={dropdownRef} className="relative ml-4">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-2"
                >
                  <img
                    src={
                      currentUser.photoURL ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        currentUser.displayName || currentUser.email || "U"
                      )}`
                    }
                    alt="avatar"
                    className="w-8 h-8 rounded-full border border-white"
                  />
                  <span className="text-sm font-medium">
                    {currentUser.displayName || currentUser.email}
                  </span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-none shadow-lg text-sm z-50">
                    <a
                      href="/bookings"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                    >
                      <CalendarCheck className="w-4 h-4 text-blue-600" />
                      Đơn đặt chỗ
                    </a>
                    <a
                      href="/reviews"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                    >
                      <MessageCircle className="w-4 h-4 text-green-600" />
                      Nhận xét của tôi
                    </a>
                    <a
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                    >
                      <User className="w-4 h-4 text-purple-600" />
                      Hồ sơ của tôi
                    </a>
                    <button
                      onClick={logout}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4" />
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            key="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed top-0 right-0 w-3/4 h-full bg-[#003580]/95 backdrop-blur-sm z-[60] p-6 lg:hidden"
          >
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className="text-white"
              >
                <X size={24} />
              </Button>
            </div>
            <div className="flex flex-col gap-4 mt-6 items-start">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={toggleMenu}
                  className="w-full py-2 px-3 rounded-md font-roboto text-base font-medium transition hover:bg-[#009fe3]/30 text-white"
                >
                  {item.label}
                </a>
              ))}
              {!currentUser ? (
                <>
                  <a
                    href="/login"
                    onClick={toggleMenu}
                    className="w-full group py-2 px-3 rounded-md font-roboto text-base font-medium text-white transition-all hover:bg-[#009fe3]/30"
                  >
                    <div className="flex flex-col">
                      <span>Đăng nhập</span>
                      <span className="block h-0.5 w-0  group-hover:w-full transition-all duration-300"></span>
                    </div>
                  </a>

                  <a
                    href="/register"
                    onClick={toggleMenu}
                    className="w-full group py-2 px-3 rounded-md font-roboto text-base font-medium text-[#feba02] transition-all hover:bg-[#009fe3]/30"
                  >
                    <div className="flex flex-col">
                      <span>Đăng ký</span>
                      <span className="block h-0.5 w-0 group-hover:w-full transition-all duration-300"></span>
                    </div>
                  </a>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 mt-4">
                    <img
                      src={
                        currentUser.photoURL ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          currentUser.displayName || currentUser.email || "U"
                        )}`
                      }
                      alt="avatar"
                      className="w-8 h-8 rounded-full border border-white"
                    />
                    <span className="text-white font-medium">
                      {currentUser.displayName || currentUser.email}
                    </span>
                  </div>

                  <a
                    href="/bookings"
                    onClick={toggleMenu}
                    className="w-full group flex items-center gap-2 px-3 py-2 rounded-md font-roboto text-base font-medium text-white hover:bg-[#009fe3]/30 transition-all"
                  >
                    <CalendarCheck className="w-4 h-4 text-blue-400" />
                    <span className="flex-1">
                      Đơn đặt chỗ
                      <span className="block h-0.5 w-0 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </a>

                  <a
                    href="/reviews"
                    onClick={toggleMenu}
                    className="w-full group flex items-center gap-2 px-3 py-2 rounded-md font-roboto text-base font-medium text-white hover:bg-[#009fe3]/30 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-green-400" />
                    <span className="flex-1">
                      Nhận xét của tôi
                      <span className="block h-0.5 w-0 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </a>

                  <a
                    href="/profile"
                    onClick={toggleMenu}
                    className="w-full group flex items-center gap-2 px-3 py-2 rounded-md font-roboto text-base font-medium text-white hover:bg-[#009fe3]/30 transition-all"
                  >
                    <User className="w-4 h-4 text-purple-400" />
                    <span className="flex-1">
                      Hồ sơ của tôi
                      <span className="block h-0.5 w-0 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </a>

                  <button
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                    className="w-full group flex items-center px-3 py-2 gap-2 rounded-md font-roboto text-base font-medium text-white hover:bg-[#009fe3]/30 transition-all"
                  >
                    <LogOut className="w-4 h-4 text-red-400" />
                    Đăng xuất
                  </button>
                </>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
