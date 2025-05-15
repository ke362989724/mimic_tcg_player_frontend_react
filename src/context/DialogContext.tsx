import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the DialogContext
interface DialogContextType {
  isOpen: boolean;
  content: React.ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  preventClose: boolean;
  setPreventClose: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  openDialog: (props: OpenDialogProps) => void;
  closeDialog: () => void;
}

// Create Dialog Context with TypeScript type
const DialogContext = createContext<DialogContextType | undefined>(undefined);

// Define props for OpenDialog
type OpenDialogProps = {
  dialogContent: string;
  preventClose?: boolean;
  dialogTitle?: string;
};

// Dialog Provider
export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [preventClose, setPreventClose] = useState(false);

  const openDialog = (props: OpenDialogProps) => {
    const { dialogContent, preventClose = false, dialogTitle = "" } = props;
    setContent(dialogContent);
    setIsOpen(true);
    setPreventClose(preventClose);
    setTitle(dialogTitle);
  };

  const closeDialog = () => {
    if (preventClose) return; // Respect preventClose
    setIsOpen(false);
    setPreventClose(false);
    setContent("");
    setTitle("");
  };

  return (
    <DialogContext.Provider
      value={{
        isOpen,
        content,
        setIsOpen,
        preventClose,
        setPreventClose,
        title,
        setTitle,
        openDialog,
        closeDialog,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

// Custom Hook for Dialog Context
export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};
