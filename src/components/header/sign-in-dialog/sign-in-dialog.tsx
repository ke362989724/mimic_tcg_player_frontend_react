import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { postGoogleOauthCallback } from "@/api-service/main";
import LoginFormComponent from "../sign-in-form/sign-in-form";
import Cookies from "js-cookie";

type Props = {};

const SignInDialog = (props: Props) => {
  const {} = props;

  const [openSignInEmail, setOpenSignInEmail] = useState(false);

  const buttonList = [
    {
      icon: "/email-icon.svg",
      text: "Sign in with Email",
      onclick: () => {
        setOpenSignInEmail(true);
      },
    },
  ];

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse,
  ) => {
    try {
      await postGoogleOauthCallback(credentialResponse.credential as string);
      Cookies.set("isLogin", "true", {
        expires: 7,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog onOpenChange={() => setOpenSignInEmail(false)}>
      <DialogTrigger asChild className="mx-1">
        <Button className="cursor-pointer">Sign in</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="title flex justify-center">
          <DialogTitle>Sign In</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {}}
            useOneTap
          />
          {!openSignInEmail &&
            buttonList.map((el, index) => (
              <Button
                className="relative cursor-pointer"
                key={el.text + index}
                onClick={el.onclick}
              >
                <img
                  src={el.icon}
                  alt={el.icon}
                  width={24}
                  className="absolute left-4"
                />
                <div className="p1">{el.text}</div>
              </Button>
            ))}
        </div>
        {openSignInEmail && <LoginFormComponent />}
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
