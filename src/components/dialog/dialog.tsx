import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

import { IoIosClose } from "react-icons/io";

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  preventClose?: boolean;
  title?: string;
};

const CustomDialog = (props: Props) => {
  const { title, isOpen, children, preventClose } = props;

  const [localIsOpen, setLocalIsOpen] = useState(false);

  useEffect(() => {
    setLocalIsOpen(isOpen);
  }, [isOpen]);

  return (
    <Dialog
      open={localIsOpen}
      onOpenChange={() => {
        props.setIsOpen(false);
      }}
    >
      <DialogContent
        onInteractOutside={(e) => {
          if (preventClose) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader>
          {!preventClose && (
            <DialogClose className="flex justify-end">
              <IoIosClose size={25} />
            </DialogClose>
          )}
          <DialogTitle className="text-center" hidden={!title}>
            {title}
          </DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
