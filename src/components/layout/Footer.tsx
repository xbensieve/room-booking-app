import React from "react";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="text-black pt-12 pb-6 border-t border-[#feba02]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <h3 className="text-2xl font-roboto font-bold mb-4">
              Happy Travel
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Trải nghiệm khách sạn đẳng cấp với vị trí đắc địa, dịch vụ chuyên
              nghiệp và không gian sang trọng bậc nhất.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Liên kết nhanh
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Trang chủ", href: "#" },
                { label: "Phòng", href: "#rooms" },
                { label: "Dịch vụ", href: "#services" },
                { label: "Liên hệ", href: "#contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group flex items-center gap-2 hover:text-amber-600 transition"
                  >
                    <ArrowRight
                      size={14}
                      className="text-amber-500 group-hover:translate-x-1 transition-transform duration-200"
                    />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Tiện ích nổi bật</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>Hồ bơi vô cực</li>
              <li>Phòng gym cao cấp</li>
              <li>Ẩm thực đa quốc gia</li>
              <li>Dịch vụ đưa đón sân bay</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Liên hệ</h4>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <MapPin size={16} /> 456 Lê Lợi, Quận 1, TP. Hồ Chí Minh
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} /> +84 987 654 321
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} /> support@happytravel.vn
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-6 text-center text-sm text-gray-600">
          © {currentYear} HotelLuxury. Tất cả quyền được bảo lưu.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
