import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  placeholder: string;
  title: string;
  type?: "text" | "number";
  value?: string | number;
  className?: string;
  error?: string;
} & UseFormRegisterReturn; // Merge register props

const InputField = ({
  placeholder,
  title,
  type = "text",
  value,
  onChange, // From register
  onBlur, // From register
  name, // From register
  ref, // From register
  className,
  error,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState<string | number | undefined>("");

  // Sync with external value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = type === "number" ? e.target.value : e.target.value;

    setInputValue(newValue);

    const syntheticEvent = {
      target: {
        name,
        value: type === "number" ? Number(newValue) : newValue,
      },
    };

    // Call react-hook-form's onChange
    onChange?.(syntheticEvent);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
  };

  const shouldShowPlaceholder = isFocused && !inputValue;
  const isLabelCollapsed = isFocused || inputValue;

  return (
    <div className="relative">
      <span
        className={cn(
          "absolute -z-10 px-3 pt-4 capitalize transition-all",
          {
            "pt-[2px] text-sm": isLabelCollapsed,
          },
          className,
        )}
      >
        {title}
      </span>
      <Input
        name={name}
        ref={ref}
        placeholder={shouldShowPlaceholder ? placeholder : ""}
        className="h-14 pt-4 !text-lg"
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        onChange={handleChange}
        value={inputValue}
        type={type === "number" ? "text" : type} // Better cross-browser behavior
      />
      {error && <div className="text-destructive">{error}</div>}
    </div>
  );
};

export default InputField;
