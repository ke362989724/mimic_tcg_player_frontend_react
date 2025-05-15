import axios from "axios";

export const uploadMultipleImage = async ({
  preSignedUrl,
  file,
}: {
  preSignedUrl: string;
  file: File;
  fileNumber: number;
}) => {
  return axios.put(preSignedUrl, file, {
    headers: {
      "Content-Type": file.type, // Dynamic content type
    },
  });
};
