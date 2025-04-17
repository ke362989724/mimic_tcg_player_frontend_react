import React from "react";
import { CiHeart } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import { IoChatbubbleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import SignInDialog from "./sign-in-dialog/sign-in-dialog";
import SignUpDialog from "./sign-up-dialog/sign-up-dialog";

type Props = {};

const AvatarComponent = () => {
  return (
    <Avatar className="h-6 w-6">
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

const iconList = [
  {
    icon: <CiHeart size={24} />,
    link: "/",
  },
  {
    icon: <CiBellOn size={24} />,
    link: "/",
  },
  {
    icon: <IoChatbubbleOutline size={24} />,
    link: "/",
  },
];

const isLogin = false;

const Header = (props: Props) => {
  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <Link to={"/"}>
            <img src="/icon.svg" alt="icon" className="w-[166px]" />
          </Link>
          <div className="flex items-center">
            <SidebarTrigger />
            <div className="hidden md:flex">
              {iconList.map((el, index) => (
                <Link
                  key={index}
                  to={el.link}
                  className="hover:bg-accent p-2 md:p-3"
                >
                  {el.icon}
                </Link>
              ))}
            </div>
            {isLogin ? (
              <div className="hover:bg-accent cursor-pointer p-2">
                <AvatarComponent />
              </div>
            ) : (
              <div className="flex">
                <SignUpDialog />
                <SignInDialog />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
