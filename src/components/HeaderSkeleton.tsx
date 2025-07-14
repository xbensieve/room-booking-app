import React from "react";
import ContentLoader from "react-content-loader";

export const HeaderSkeleton = () => (
  <header className="fixed top-0 z-50 w-full bg-[#003580] shadow-md h-16">
    <div className="container mx-auto px-4 h-full flex items-center justify-between">
      <ContentLoader
        speed={2}
        width="100%"
        height={64}
        backgroundColor="#4f6789"
        foregroundColor="#6e85a8"
        className="w-full"
      >
        {/* Logo circle */}
        <circle cx="32" cy="32" r="20" />
        {/* Brand text */}
        <rect x="64" y="20" rx="4" ry="4" width="120" height="12" />
        <rect x="64" y="40" rx="3" ry="3" width="80" height="8" />
        {/* Avatar + Button */}
        <rect x="85%" y="20" rx="6" ry="6" width="80" height="24" />
        <circle cx="95%" cy="32" r="14" />
      </ContentLoader>
    </div>
  </header>
);
