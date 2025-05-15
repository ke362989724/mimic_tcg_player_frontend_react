import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  type: "button" | "submit" | "reset" | undefined;
  value: string;
  handleOnClickCardCondition: (cardCondition: string) => void;
  isActive: boolean;
};

const PillButton = (props: Props) => {
  const { children, type, value, isActive, handleOnClickCardCondition } = props;
  return (
    <Button
      className={cn(
        "text-primary hover:bg-primary cursor-pointer bg-white hover:text-white",
        {
          "bg-primary text-white": isActive,
        },
      )}
      type={type}
      value={value}
      onClick={() => {
        handleOnClickCardCondition(value);
      }}
    >
      {children}
    </Button>
  );
};

export default PillButton;
