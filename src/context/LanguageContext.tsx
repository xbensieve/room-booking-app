import React, { createContext, useContext, useState, ReactNode } from "react";

type Lang = "vi" | "en";

const translations = {
  vi: {
    home: "Trang chủ",
    rooms: "Phòng",
    services: "Dịch vụ",
    contact: "Liên hệ",
    bookNow: "Đặt phòng ngay",
    login: "Đăng nhập",
    register: "Đăng ký",
    // ...thêm các key khác cho toàn bộ app
  },
  en: {
    home: "Home",
    rooms: "Rooms",
    services: "Services",
    contact: "Contact",
    bookNow: "Book Now",
    login: "Login",
    register: "Register",
    // ...thêm các key khác cho toàn bộ app
  },
};

interface LanguageContextProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (typeof translations)["vi"];
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("vi");
  const t = translations[lang];
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
