import React from "react";
import { Shield, Award, Headphones } from "lucide-react";

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    icon: <Shield className="w-8 h-8 text-white" />,
    title: "Bảo mật tuyệt đối",
    description:
      "Thông tin cá nhân & giao dịch của bạn luôn được mã hóa và bảo vệ toàn diện.",
  },
  {
    icon: <Award className="w-8 h-8 text-white" />,
    title: "Tiêu chuẩn 5 sao",
    description:
      "Khách sạn chất lượng cao được kiểm duyệt kỹ càng trước khi niêm yết.",
  },
  {
    icon: <Headphones className="w-8 h-8 text-white" />,
    title: "Hỗ trợ khách hàng 24/7",
    description:
      "Mọi vấn đề đều được phản hồi nhanh chóng bởi đội ngũ tận tâm.",
  },
];

const WhyUsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 font-roboto mb-3">
            Vì sao khách hàng chọn chúng tôi?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            Chúng tôi không chỉ cung cấp dịch vụ đặt phòng – chúng tôi mang đến
            sự yên tâm, tiện lợi và trải nghiệm cao cấp cho mỗi chuyến đi của
            bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl border border-[#feba02] p-6 text-center shadow hover:shadow-lg transition-all duration-300"
            >
              <div className="mx-auto mb-4 w-14 h-14 flex items-center justify-center bg-amber-500 rounded-full shadow-md">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
