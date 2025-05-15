import React, { useState, useCallback, useRef } from "react";
import { IoTrashBinOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { UseFormRegisterReturn } from "react-hook-form";

interface FileWithPreview {
  file: File;
  preview: string;
}

type DragDropUploadProps = {
  error?: string;
} & UseFormRegisterReturn;

const DragDropUpload = (props: DragDropUploadProps) => {
  const { error } = props;
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const { onChange, ref, name } = props;
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createSyntheticEvent = (name: string, value: typeof files) => {
    return {
      target: {
        name,
        value,
      },
    };
  };

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const newFiles = [
          ...files,
          ...Array.from(e.dataTransfer.files).map((file) => ({
            file,
            preview: URL.createObjectURL(file),
          })),
        ];
        onChange?.(createSyntheticEvent(name, newFiles));
        setFiles(newFiles);
      }
    },
    [files, onChange],
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = [
        ...files,
        ...Array.from(e.target.files).map((file) => ({
          file,
          preview: URL.createObjectURL(file),
        })),
      ];

      onChange?.(createSyntheticEvent(name, newFiles));
      setFiles(newFiles);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (index: number) => {
    // Create a new array first
    const prevFiles = files;
    const updatedFiles = [...prevFiles];

    // Get the file to be removed
    const fileToRemove = updatedFiles[index];

    // Remove the file from array
    updatedFiles.splice(index, 1);

    // Revoke the URL after a small delay to ensure React has updated
    setTimeout(() => {
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
    }, 100);

    onChange?.(createSyntheticEvent(name, updatedFiles));

    setFiles(updatedFiles);
  };

  return (
    <div
      className={cn("", {
        "rounded-2xl border p-4 shadow-2xl": files.length > 0,
      })}
      ref={ref}
    >
      <div
        className={`m-auto cursor-pointer rounded-lg border-2 border-dashed border-blue-500 py-20 text-center md:py-60 ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <p className="mb-2 text-gray-600">
          {isDragging ? "Drop your files here" : "Drag and drop files here or"}
        </p>
        <button
          type="button"
          className="cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          Select Files
        </button>
        <p className="mb-2 text-gray-600">Maximum 10 picture</p>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple
          accept=".jpg,.jpeg,.png"
        />
      </div>
      {error && <div className="text-destructive p3">{error}</div>}
      {files.length > 0 && (
        <div className="mt-4">
          <ul className="grid max-w-[1240px] grid-cols-2 gap-3 md:grid-cols-3">
            {files.map(({ file, preview }, index) => (
              <li key={preview + index} className="flex items-end">
                {index > 0 ? (
                  <div className="bg-accent mb-2 flex h-50 w-full items-center justify-center rounded-sm">
                    <div className="relative h-full w-full rounded-md">
                      <img
                        src={preview}
                        alt={file.name}
                        className="h-full w-full object-contain"
                      />
                      <div
                        className="absolute top-2 right-2 cursor-pointer rounded-full bg-white p-1"
                        onClick={() => {
                          removeFile(index);
                        }}
                      >
                        <IoTrashBinOutline className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full rounded-sm bg-black pt-12 pr-1 pb-2 pl-1">
                    <div className="p2 absolute top-2 left-1/2 -translate-x-1/2 text-white">
                      Cover
                    </div>
                    <div className="bg-accent flex h-50 items-center justify-center rounded-sm">
                      <div className="relative h-full w-full rounded-md">
                        <img
                          src={preview}
                          alt={file.name}
                          className="h-full w-full object-contain"
                        />
                        <div
                          className="absolute top-2 right-2 cursor-pointer rounded-full bg-white p-1"
                          onClick={() => {
                            removeFile(index);
                          }}
                        >
                          <IoTrashBinOutline className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DragDropUpload;
