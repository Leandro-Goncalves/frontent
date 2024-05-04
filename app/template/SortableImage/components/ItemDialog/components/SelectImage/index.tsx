import { ImageCropper } from "@/app/components/ImageCropper";
import { cn } from "@/lib/utils";
import { PlusCircle, XCircle } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { RefCallBack } from "react-hook-form";

interface SelectImageProps {
  name?: string;
  onBlur?: () => void;
  contentRef?: RefCallBack;
  disabled?: boolean;
  setImage: (file: File | undefined) => void;
  image?: File | string;
  size: {
    width: number;
    height: number;
  };
  className?: string;
  noCrop?: boolean;
  disableRemove?: boolean;
}

export const SelectImage: React.FC<SelectImageProps> = ({
  setImage,
  image,
  contentRef,
  size,
  className,
  noCrop,
  disableRemove,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState<File>();
  const [isHovered, setIsHovered] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (noCrop) {
        setImage(acceptedFiles[0]);
        return;
      }
      setIsOpen(acceptedFiles[0]);
    },
    [setIsOpen, noCrop, setImage]
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
          height={500}
          aspectRatio={size.width / size.height}
        />
      )}
      <div
        ref={contentRef}
        className={cn("relative", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          aspectRatio: size.width / size.height,
        }}
        {...rest}
      >
        <div
          {...getRootProps()}
          className="mx-auto flex items-center justify-center w-auto rounded-lg bg-background cursor-pointer max-h-[300px]"
          style={{
            aspectRatio: size.width / size.height,
          }}
        >
          <input {...getInputProps()} />
          {image ? (
            <>
              {typeof image === "string" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={image}
                  className={cn(
                    "w-full h-full object-cover rounded-lg z-10 transition-all",
                    {
                      "rounded-r-none": isHovered && !disableRemove,
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
                      "rounded-r-none": isHovered && !disableRemove,
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
        {image && !disableRemove && (
          <button
            className={cn(
              "absolute bg-red-700 top-1 bottom-1 right-[-30px] w-[30px] rounded-r-lg transition-all flex",
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
