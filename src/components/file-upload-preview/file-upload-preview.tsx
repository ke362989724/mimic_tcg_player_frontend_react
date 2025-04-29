import React, { useState, useCallback, useEffect, useRef } from "react";
import { IoTrashBinOutline } from "react-icons/io5";

interface FileWithPreview {
  file: File;
  preview: string;
}

const DragDropUpload: React.FC = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

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

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setFiles(newFiles);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setFiles(newFiles);
    }
  };

  console.log("files", files);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    URL.revokeObjectURL(newFiles[index].preview);
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <div className="mx-auto my-10 max-w-[1240px]">
      <div
        className={`m-auto cursor-pointer rounded-lg border-2 border-dashed border-blue-500 py-60 text-center ${
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
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple
        />
      </div>
      {files.length > 0 && (
        <div className="mt-4">
          {/* <h3 className="mb-2 font-medium text-gray-900">Selected Files:</h3> */}
          <ul className="grid max-w-[1240px] grid-cols-3 space-y-2">
            {files.map(({ file, preview }, index) => (
              <li
                key={preview + index}
                className="flex items-center rounded-md border p-2"
              >
                {true ? (
                  <div className="relative">
                    <img
                      src={preview}
                      alt={file.name}
                      className="mr-3 object-cover"
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
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DragDropUpload;
