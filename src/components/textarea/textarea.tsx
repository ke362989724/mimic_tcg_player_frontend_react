import React, { useState, useEffect } from "react";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  placeholder: string;
  title: string;
  value?: string;
  className?: string;
  rows?: number;
  maxLength?: number;
  error?: string;
} & UseFormRegisterReturn;

const TextareaComponent = ({
  placeholder,
  title = "Description (Optional)",
  value = "",
  className,
  rows = 5,
  maxLength,
  ref,
  onChange,
  name,
  error,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  // Sync with external value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const shouldShowPlaceholder = isFocused && !inputValue;
  const isLabelCollapsed = isFocused || inputValue;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const syntheticEvent = {
      target: {
        name,
        value: e.target.value,
      },
    };
    setInputValue(e.target.value);

    // Call react-hook-form's onChange
    onChange?.(syntheticEvent);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
  };

  return (
    <div className="relative">
      <span
        className={cn(
          "absolute -z-10 px-3 pt-4 transition-all",
          {
            "pt-[2px] text-sm": isLabelCollapsed,
          },
          className,
        )}
      >
        {title}
      </span>
      <Textarea
        ref={ref}
        placeholder={shouldShowPlaceholder ? placeholder : ""}
        className={cn("h-40 resize-none pt-5 !text-lg break-all", className)}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        onChange={handleChange}
        value={inputValue}
        rows={rows}
        maxLength={maxLength}
      />
      {maxLength && (
        <div className="text-muted-foreground absolute right-2 bottom-1 mt-1 text-right text-xs">
          {inputValue.length}/{maxLength}
        </div>
      )}
      {error && <div className="text-destructive">{error}</div>}
    </div>
  );
};

export default TextareaComponent;
