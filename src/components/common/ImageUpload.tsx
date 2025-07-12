import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  className?: string;
}

export const ImageUpload = ({
  images,
  onImagesChange,
  maxImages = 5,
  className = "",
}: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    try {
      // Simulate upload - trong thực tế sẽ upload lên server
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      const updatedImages = [...images, ...newImages].slice(0, maxImages);
      onImagesChange(updatedImages);
    } catch (error) {
      console.error("Lỗi upload ảnh:", error);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onImagesChange(updatedImages);
  };

  return (
    <div className={className}>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <img
              src={image}
              alt={`Ảnh ${index + 1}`}
              className="w-full h-24 sm:h-32 object-cover rounded-lg border"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => removeImage(index)}
            >
              <X className="h-3 w-3" />
            </Button>
            {index === 0 && (
              <div className="absolute bottom-1 left-1 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                Ảnh chính
              </div>
            )}
          </div>
        ))}

        {images.length < maxImages && (
          <label className="flex flex-col items-center justify-center h-24 sm:h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
            <ImageIcon className="h-6 w-6 text-gray-400 mb-1" />
            <span className="text-xs text-gray-500 text-center px-2">
              {uploading ? "Đang tải..." : "Thêm ảnh"}
            </span>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={uploading}
            />
          </label>
        )}
      </div>

      <p className="text-sm text-gray-500">
        Tối đa {maxImages} ảnh. Ảnh đầu tiên sẽ là ảnh chính.
      </p>
    </div>
  );
};
