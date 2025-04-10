import React, { useState, useEffect } from "react";

interface AvatarFieldProps {
  initialValue?: File; // Initial value as a File object
  onFileChange?: (file: File | null) => void; // Callback for file change
}

const AvatarField: React.FC<AvatarFieldProps> = ({ initialValue, onFileChange }) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (initialValue) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string); // Convert File to base64 string
      };
      reader.readAsDataURL(initialValue);
    }
  }, [initialValue]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string); // Convert File to base64 string
        if (onFileChange) {
          onFileChange(file); // Trigger the callback with the selected file
        }
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      if (onFileChange) {
        onFileChange(null); // Trigger the callback with null if no file is selected
      }
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
          onClick={() => {
            setImage(null); // Clear the image
            if (onFileChange) {
              onFileChange(null); // Trigger the callback with null
            }
          }}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default AvatarField;