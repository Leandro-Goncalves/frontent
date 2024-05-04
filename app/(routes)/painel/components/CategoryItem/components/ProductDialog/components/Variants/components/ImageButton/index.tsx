import { ImageCropper } from "@/app/components/ImageCropper";
import env from "@/app/env";
import { cn } from "@/lib/utils";
import { PlusCircle, X, XCircle } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageButtonProps {
  setImage: (file: File | undefined) => void;
  image?: File | string;
}

export const ImageButton: React.FC<ImageButtonProps> = ({
  setImage,
  image,
}) => {
  const [isOpen, setIsOpen] = useState<File>();
  const [isHovered, setIsHovered] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setIsOpen(acceptedFiles[0]);
    },
    [setIsOpen]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <>
      {isOpen && (
        <ImageCropper
          isOpen
          onOpenChange={() => setIsOpen(undefined)}
          imagePath={isOpen}
          onSave={(file) => {
            setIsOpen(undefined);
            setImage(file);
          }}
          height={501}
          aspectRatio={3 / 4}
        />
      )}
      <div
        className="relative w-28 h-28 mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          {...getRootProps()}
          className="mx-auto flex items-center justify-center w-28 h-28 rounded-lg bg-card cursor-pointer"
        >
          <input {...getInputProps()} />
          {image ? (
            <>
              {typeof image === "string" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`${env.CDN_URL}/${image}`}
                  className={cn(
                    "w-full h-full object-cover rounded-lg z-10 transition-all",
                    {
                      "rounded-r-none": isHovered,
                    }
                  )}
                  alt="Imagem"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={URL.createObjectURL(image)}
                  className={cn(
                    "w-full h-full object-cover rounded-lg z-10 transition-all",
                    {
                      "rounded-r-none": isHovered,
                    }
                  )}
                  alt="Imagem"
                />
              )}
            </>
          ) : (
            <PlusCircle className="text-primary" />
          )}
        </div>
        {image && (
          <button
            className={cn(
              "absolute bg-red-700 top-0 bottom-0 right-[-30px] w-[30px] rounded-r-lg transition-all flex",
              { "right-0": !isHovered }
            )}
            onClick={() => {
              setImage(undefined);
            }}
          >
            <XCircle className="text-white m-auto" />
          </button>
        )}
      </div>
    </>
  );
};
