import React, { useState, useEffect } from "react";

interface AvatarFieldProps {
  initialImage?: string; // Nilai awal untuk gambar
}

const AvatarField: React.FC<AvatarFieldProps> = ({ initialImage }) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (initialImage) {
      setImage(initialImage); // Set nilai awal jika diberikan
    }
  }, [initialImage]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <label
          htmlFor="avatar-upload"
          className="cursor-pointer flex items-center justify-center w-full h-full rounded-full border-2 border-dashed border-gray-300 overflow-hidden bg-gray-100 hover:border-blue-500"
        >
          {image ? (
            <img
              src={image}
              alt="Avatar Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-500">Upload</span>
          )}
        </label>
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
      {image && (
        <button
          onClick={() => setImage(null)}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default AvatarField;