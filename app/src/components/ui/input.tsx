import * as React from "react";
import { cn } from "@/lib/utils"; // Utility class merging (bisa kamu ganti dengan cara lain jika tidak memakai ini)
import { Icon } from "@iconify/react"; // Assuming you are using Iconify for icons
import { Button } from "./button";

interface InputProps extends React.ComponentProps<"input"> {
    leading?: React.ReactNode;
    trailing?: React.ReactNode;
    type?: "text" | "password" | "email" | "number";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, leading, trailing, type = "text", ...props }, ref) => {
        const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

        const togglePasswordVisibility = () => {
            setIsPasswordVisible((prev) => !prev);
        };

        const inputType = type === "password" && isPasswordVisible ? "text" : type;

        return (
            <div className="relative w-full">
                {/* Leading Icon */}
                {leading && (
                    <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 px-3">
                        {leading}
                    </div>
                )}

                {/* Trailing Icon */}
                {trailing && (
                    <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 px-3">
                        {trailing}
                    </div>
                )}

                {/* Input */}
                <input
                    type={inputType}
                    className={cn(
                        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                        {
                            "pl-10": leading,
                            "pr-10": trailing,
                        },
                        className
                    )}
                    ref={ref}
                    {...props}
                />

                {/* Show/Hide Password Button (only for password inputs) */}
                {type === "password" && (
                    <Button
                        variant="ghost"
                        className="absolute right-1 rounded-full top-1/2 transform -translate-y-1/2"
                        size="icon"
                        onClick={togglePasswordVisibility}
                    >
                        <Icon
                            icon={isPasswordVisible ? "mdi:eye-off" : "mdi:eye"}
                            width={20}
                            className="text-gray-500"
                        />
                    </Button>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };
