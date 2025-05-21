import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
  nickname: string;
  image: string;
};

const CustomAvatar = (props: Props) => {
  const { nickname, image } = props;
  return (
    <Avatar className="size-8">
      <AvatarImage src={image} />
      <AvatarFallback className="font-semibold">
        {nickname.slice(0, 1).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default CustomAvatar;
