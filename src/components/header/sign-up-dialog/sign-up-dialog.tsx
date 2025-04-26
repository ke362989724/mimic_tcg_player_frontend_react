import React, { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { postGoogleOauthCallback } from "@/api-service/main";
import { CredentialResponse } from "@react-oauth/google";

type Props = {};

const SignUpDialog = (props: Props) => {
  const {} = props;

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse,
  ) => {
    try {
      await postGoogleOauthCallback(credentialResponse.credential as string);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog onOpenChange={() => {}}>
      <DialogTrigger asChild className="mx-1 my-3">
        <Button className="cursor-pointer">Sign Up</Button>
      </DialogTrigger>
    </Dialog>
  );
};

export default SignUpDialog;
