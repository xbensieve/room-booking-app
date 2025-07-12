import { Menu, Hotel } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export const MobileHeader = ({ onMenuClick }: MobileHeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30 lg:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-2">
          <Hotel className="h-6 w-6 text-blue-600" />
          <h1 className="text-lg font-semibold text-gray-900">
            Admin Khách Sạn
          </h1>
        </div>
        <Button variant="ghost" size="sm" onClick={onMenuClick} className="p-2">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};
