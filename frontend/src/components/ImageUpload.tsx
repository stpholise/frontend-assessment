import React, { useCallback, type SetStateAction, useState } from "react";
import { useDropzone } from "react-dropzone";
import clsx from "clsx";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ImageUpload = ({
  imageUrl,
  setImageUrl,
  setFieldValue,
  setFieldError,
  setFieldTouched,
}: {
  imageUrl: string;
  setImageUrl: React.Dispatch<SetStateAction<string>>;
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean
  ) => void;
  setFieldError: (field: string, error: string) => void;
  setFieldTouched: (field:string,  touched?: boolean, shouldValidate?: boolean ) => void
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!acceptedFiles || acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];

      setLoading(true);
      setError(null);
      setFieldError("imageUrl", "");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "y6acfyrq");

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dmuhmpdkm/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        setLoading(false);

        if (data.secure_url) {
          setImageUrl(data.secure_url);
          setFieldValue("imageUrl", data.secure_url);
        } else {
          setError("image not found");
        }
      } catch (err) {
        if (err instanceof Error) {
          setLoading(false);
          setError("sorry try again somethin went wrong");
          setFieldError("imageUrl", "Upload failed. Try again.");
        }
      } finally {
        setLoading(false);
      }
    },
    [setImageUrl, setFieldError, setFieldValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    maxFiles: 1,
    multiple: false,
    maxSize: MAX_FILE_SIZE,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    onDropRejected: (fileRejections) => {
      fileRejections.forEach(({ errors }) => {
        const message =
          errors[0]?.message ||
          "File rejected. Please upload a valid image (max 5 MB).";
        setFieldError("imageUrl", message);
        setFieldTouched("imageUrl", true, false)
        console.log(errors[0].message); // logs error details (too large, invalid type, etc.)
      });
    },
  });

  return (
    <div
      className={clsx(
        " flex gap-4 items-center bg-gray-100 justify-center h-24   px-1 py-1",
        imageUrl && "flex overflow-hidden   justify-start bg-transparent"
      )}
      {...getRootProps()}
    >
      <div className=" ">
        {loading ? (
          <p>uploading...</p>
        ) : error ? (
          <div className="text-red-500 text-sm"> an error occoured </div>
        ) : (
          <div
            className={clsx(
              " size-12 rounded-xs    flex items-center justify-center ",
              imageUrl && "size-fit "
            )}
          >
            <img
              src={imageUrl || "/Add Image.svg"}
              alt="test"
              width={200}
              height={200}
              className={clsx(
                "h-12  ",
                imageUrl
                  ? "h-20 min-w-24 sm:max-w-40 sm:h-30 rounded-sm"
                  : "h-12 w-12"
              )}
            />
          </div>
        )}
      </div>
      <div className="border-b border-gray-400  py-1 cursor-pointer">
        <label
          htmlFor="imageUrl"
          className="font-medium text-sm cursor-pointer "
        >
          {isDragActive ? (
            <p className="flex items-center justify-center gap-4 text-lg ">
              <img
                src="/data-access-file-upload-svgrepo-com.svg"
                alt="upload image"
                width={24}
                height={24}
              />
              Drop the files here ...
            </p>
          ) : (
            <p className={clsx("text-medium text-sm")}>
              <span className="text-blue-500 ">
                click to {imageUrl ? "change" : "add"} image{" "}
              </span>
              <span className="hidden sm:inline">
                or drag and drop image here
              </span>
            </p>
          )}
        </label>
        <input type="file" {...getInputProps()} />
      </div>
    </div>
  );
};

export default ImageUpload;
