import { ImageCropper } from "@/app/components/ImageCropper";
import env from "@/app/env";
import { PlusCircle } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageButtonProps {
  setImage: (file: File) => void;
  image?: File | string;
}

export const ImageButton: React.FC<ImageButtonProps> = ({
  setImage,
  image,
}) => {
  const [isOpen, setIsOpen] = useState<File>();

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
        />
      )}
      <div
        {...getRootProps()}
        className="mx-auto flex items-center justify-center w-28 h-28 rounded-lg bg-[#FFCFCF] cursor-pointer"
      >
        <input {...getInputProps()} />
        {image ? (
          <>
            {typeof image === "string" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`${env.CDN_URL}/${image}`}
                className="w-full h-full object-cover rounded-lg"
                alt="Imagem"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={URL.createObjectURL(image)}
                className="w-full h-full object-cover rounded-lg"
                alt="Imagem"
              />
            )}
          </>
        ) : (
          <PlusCircle color="#e16767" />
        )}
      </div>
    </>
  );
};
