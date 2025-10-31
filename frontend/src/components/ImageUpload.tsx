import React, { useCallback, type SetStateAction } from "react";
import { useDropzone } from "react-dropzone";
import clsx from "clsx";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ImageUpload = ({
  loading,
  error,
  value,
  setImageFile,
  setFieldValue,
  setFieldError,
  setFieldTouched,
}: {
  loading: boolean;
  error: Error | null;
  setImageFile: React.Dispatch<SetStateAction<File | undefined>>;
  setFieldValue: (
    field: string,
    value: File | string,
    shouldValidate?: boolean
  ) => void;
  setFieldError: (field: string, error: string) => void;
  setFieldTouched: (
    field: string,
    touched?: boolean,
    shouldValidate?: boolean
  ) => void;
  value: string;
}) => {
   

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const blobUrl = URL.createObjectURL(file);
   

      setFieldError("imageUrl", "");
      setFieldValue("imageUrl", blobUrl);
      setImageFile(file);

      return () => URL.revokeObjectURL(blobUrl);
    },
    [ setFieldError, setFieldValue, setImageFile]
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
        setFieldTouched("imageUrl", true, false);
      });
    },
  });

  return (
    <div
      className={clsx(
        " flex gap-4 items-center bg-gray-100 justify-center h-24   px-1 py-1",
        value && "flex overflow-hidden   justify-start bg-transparent"
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
              value && "size-fit "
            )}
          >
            <img
              src={value || "/Add Image.svg"}
              alt="test"
              width={200}
              height={200}
              className={clsx(
                "h-12  ",
                value
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
                click to {value ? "change" : "add"} image{" "}
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
