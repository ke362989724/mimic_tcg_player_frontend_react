import React, { useState } from "react";
import { Input } from "../ui/input";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  placeholder: string;
  unit: string;
  className?: string;
  error?: string;
} & UseFormRegisterReturn;

const InputFieldUnit = (props: Props) => {
  const { placeholder, unit, className, onChange, onBlur, name, ref, error } =
    props;
  const [userInput, setUserInput] = useState<string>("0");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue =
      e.target.value
        .replace(/[^0-9.]/g, "") // Keep only digits and dots
        .replace(/^\./, "0.") // Convert ".5" to "0.5"
        .replace(/(\..*)\./g, "$1") // Allow only one dot
        .replace(/^0+(?=\d)/, "") || // Remove leading zeros (but keep "0" if alone)
      "0";

    setUserInput(newValue);

    const syntheticEvent = {
      target: {
        name,
        value: Number(newValue),
      },
    };

    // Call react-hook-form's onChange
    onChange?.(syntheticEvent);
  };

  return (
    <div>
      <div className="relative">
        <span className="absolute top-1/2 left-2 -translate-y-1/2">HKD</span>
        <Input
          ref={ref}
          className="px-12"
          type="string"
          onChange={handleChange}
          onBlur={() => {
            if (!userInput) {
              setUserInput("0");
            }
          }}
          value={userInput}
        />
      </div>
      {error && <div className="text-destructive p3">{error}</div>}
    </div>
  );
};

export default InputFieldUnit;
