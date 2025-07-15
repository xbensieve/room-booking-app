import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export const HeaderSkeleton = () => {
  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-[#003580] shadow-md h-16 sm:hidden">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full bg-[#6e85a8]" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-24 bg-[#6e85a8]" />
              <Skeleton className="h-3 w-16 bg-[#6e85a8]" />
            </div>
          </div>
          <Skeleton className="h-6 w-6 bg-[#6e85a8]" />
        </div>
      </header>
      <header className="hidden sm:flex fixed top-0 z-50 w-full bg-[#003580] shadow-md h-20">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          {/* Left: Logo + Titles */}
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Skeleton className="h-12 w-12 rounded-full bg-[#6e85a8]" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-1"
            >
              <Skeleton className="h-5 w-32 bg-[#6e85a8]" />
              <Skeleton className="h-3 w-24 bg-[#6e85a8]" />
            </motion.div>
          </div>
          <div className="flex items-center gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-16 rounded bg-[#6e85a8]" />
            ))}
            <Skeleton className="h-6 w-20 bg-[#6e85a8] rounded" />
            <Skeleton className="h-8 w-8 rounded-full bg-[#6e85a8]" />
          </div>
        </div>
      </header>
    </>
  );
};
