import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const CreateProductButton = (props: Props) => {
  const navigate = useNavigate();
  return (
    <Dialog
      onOpenChange={() => {
        window.location.href = "/create-product";
      }}
    >
      <DialogTrigger asChild className="mx-1">
        <Button className="mx-0 cursor-pointer">Sell item</Button>
      </DialogTrigger>
    </Dialog>
  );
};

export default CreateProductButton;
