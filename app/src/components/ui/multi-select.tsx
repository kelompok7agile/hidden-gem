import * as React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface MultiSelectProps {
  options: { value: string; text: string }[];
  selectedValues: string[];
  onChange: (selectedValues: string[]) => void;
  placeholder?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedValues,
  onChange,
  placeholder = "Select options...",
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSelection = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((val) => val !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      {/* Button to toggle dropdown visibility */}
      <Button variant="outline" className="w-full text-left" onClick={toggleDropdown}>
        {selectedValues.length > 0
          ? `${selectedValues.length} selected`
          : placeholder}
      </Button>

      {/* Dropdown content, only shown when isDropdownOpen is true */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-md"
        >
          <div className="p-2">
            {options.length > 0 ? (
              options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedValues.includes(option.value)} 
                    onChange={() => toggleSelection(option.value)} 
                    onClick={() => toggleSelection(option.value)}
                    id={option.value}
                  />
                  <label htmlFor={option.value} className="text-sm">
                    {option.text}
                  </label>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center text-xs font-semibold text-gray-500">
                Tidak ada data
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
