"use client";
import { cn } from "@/lib/utils";
import { MutableRefObject, useImperativeHandle, useRef, useState } from "react";

export interface AddItemDialogRef {
  handleOpen: () => void;
  handleClose: () => void;
}

interface AddItemDialogProps {
  dialogRef: MutableRefObject<AddItemDialogRef | undefined>;
}

export const AddItemDialog: React.FC<AddItemDialogProps> = ({ dialogRef }) => {
  const timeoutId = useRef<NodeJS.Timeout>();
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(
    dialogRef,
    () => {
      const handleClose = () => {
        setIsOpen(false);

        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
        }
      };

      const handleOpen = () => {
        setIsOpen(true);

        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
        }

        timeoutId.current = setTimeout(handleClose, 3000);
      };

      return {
        handleOpen: handleOpen,
        handleClose: handleClose,
      };
    },
    []
  );

  return (
    <div
      className={cn(
        isOpen ? "opacity-100" : "opacity-0",
        "absolute bottom-[-110px] right-[40px] bg-[#DC024F] p-4 rounded-sm text-white font-semibold w-[240px]",
        "transition-opacity animate-bounce",
        "after:content-[''] after:absolute after:top-[-18px] after:right-0 after:w-5 after:h-5 after:bg-black",
        "after:[clip-path:polygon(100%_0,_0_100%,_100%_100%)] after:bg-[#DC024F]",
        "max-[1000px]:after:[clip-path:polygon(0_0,_0%_100%,_100%_100%)] max-[1000px]:after:right-auto max-[1000px]:after:left-0",
        "max-[1000px]:right-[-200px]"
      )}
    >
      <p className="text-center">
        Um item foi adicionado ao seu carrinho{" "}
        <span role="img" aria-label="rosto com olho piscando">
          😉
        </span>
      </p>
    </div>
  );
};
