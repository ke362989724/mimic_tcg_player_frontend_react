import React, { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import PillButton from "../pill-button/pill-button";

type Props = {
  optionList: {
    name: string;
    value: string;
  }[];
  error?: string;
} & Partial<UseFormRegisterReturn>;

const PillButtonGroupComponent = (props: Props) => {
  const { optionList, ref, onChange, name, error } = props;
  const [userInput, setUserInput] = useState<string>();
  const handleOnClickCardCondition = (value: string) => {
    setUserInput(value);
    onChange?.({
      target: {
        name,
        value: value,
      },
    });
  };

  return (
    <div className="flex flex-wrap gap-2" ref={ref}>
      {optionList &&
        optionList.map((el) => {
          return (
            <PillButton
              type={"button"}
              value={el.value}
              key={el.value}
              handleOnClickCardCondition={handleOnClickCardCondition}
              isActive={userInput === el.value}
            >
              {el.name}
            </PillButton>
          );
        })}
      {error && <div className="text-destructive p3">{error}</div>}
    </div>
  );
};

export default PillButtonGroupComponent;
