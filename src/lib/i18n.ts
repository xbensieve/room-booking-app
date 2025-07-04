import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      header: {
        login: "Login",
        register: "Register",
      },
      footer: {
        about: "About Us",
        contact: "Contact",
        copyright: "© 2025 Room Booking. All rights reserved.",
      },
    },
  },
  vi: {
    translation: {
      header: {
        login: "Đăng nhập",
        register: "Đăng ký",
      },
      footer: {
        about: "Về chúng tôi",
        contact: "Liên hệ",
        copyright: "© 2025 Đặt phòng. Mọi quyền được bảo lưu.",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
