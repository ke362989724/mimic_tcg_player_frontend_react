import React, { useState, useRef } from "react";
import FilePreviewUpload from "@/components/file-upload-preview/file-upload-preview";
import { cn } from "@/lib/utils";

type Props = {};

const CreateProduct = () => {
  const havePicture = false;

  return (
    <div
      className={cn("m-auto flex max-w-[1240px] flex-col", {
        "md:flex-row": havePicture,
        "md:flex-col": !havePicture,
      })}
    >
      <div className="flex-1">
        <FilePreviewUpload />
      </div>
      <div className="flex-1/4"></div>
    </div>
  );
};

export default CreateProduct;
