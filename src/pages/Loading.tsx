import React from "react";
import { motion } from "framer-motion";

const LoadingPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 w-full h-full z-[1000] flex items-center justify-center bg-gradient-to-br from-[#e0f2fe] to-[#f0f9ff] text-[#003580]"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Pulse dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-[#003580] rounded-full"
              animate={{ y: [0, -6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 0.8,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.h2
          className="text-lg font-semibold font-roboto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Đang tải...
        </motion.h2>

        <p className="text-sm text-[#3b5998] font-light">
          Chuẩn bị chuyến đi của bạn ✈️
        </p>
      </div>
    </motion.div>
  );
};

export default LoadingPage;
