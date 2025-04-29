import React from "react";
import { CiHeart } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import { IoChatbubbleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import SignInDialog from "./sign-in-dialog/sign-in-dialog";
import SignUpDialog from "./sign-up-dialog/sign-up-dialog";
import useAuth from "@/custom-hook/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    type: "link",
  },
  {
    icon: <CiBellOn size={24} />,
    link: "/",
    type: "dropdown",
  },
  {
    icon: <IoChatbubbleOutline size={24} />,
    link: "/",
    type: "link",
  },
];

const Header = (props: Props) => {
  const isAuth = useAuth();

  return (
    <div className="flex items-center justify-between">
      <Link to={"/"}>
        <img src="/icon.svg" alt="icon" className="w-[166px]" />
      </Link>
      <div className="flex items-center">
        <SidebarTrigger />
        {isAuth ? (
          <>
            <div className="flex">
              {iconList.map((el, index) =>
                el.type === "link" ? (
                  <Link
                    key={index}
                    to={el.link}
                    className="hover:bg-accent p-1 sm:p-2 md:p-2 lg:p-3"
                  >
                    {el.icon}
                  </Link>
                ) : (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <div className="hover:bg-accent cursor-pointer p-1 sm:p-2 md:p-2 lg:p-3">
                          {el.icon}
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem className="cursor-pointer">
                          Profile
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ),
              )}
            </div>
            <div className="hover:bg-accent cursor-pointer p-1 md:p-3">
              <AvatarComponent />
            </div>
          </>
        ) : (
          <div className="flex">
            <SignUpDialog />
            <SignInDialog />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
