import React, { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type Props = {};

const SignUpDialog = (props: Props) => {
  const {} = props;
  const navigate = useNavigate();

  return (
    <Dialog
      onOpenChange={() => {
        navigate("/sign-up");
      }}
    >
      <DialogTrigger asChild className="mx-1">
        <Button className="cursor-pointer">Sign Up</Button>
      </DialogTrigger>
    </Dialog>
  );
};

export default SignUpDialog;
