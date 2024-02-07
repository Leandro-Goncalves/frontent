"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface VisibilitySwitchProps {
  isVisible: boolean;
  onVisibilityChange: (isVisible: boolean) => void;
}

export const VisibilitySwitch: React.FC<VisibilitySwitchProps> = ({
  isVisible,
  onVisibilityChange,
}) => {
  const activeRef = useRef<HTMLDivElement>(null);
  const inactiveRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ width: 0, left: 0 });

  const handleClick = () => {
    onVisibilityChange(!isVisible);
  };

  useEffect(() => {
    const elementActive = isVisible ? activeRef.current : inactiveRef.current;
    if (elementActive) {
      setPosition({
        width: elementActive?.offsetWidth,
        left: isVisible ? inactiveRef.current?.offsetWidth ?? 0 : 0,
      });
    }
  }, [isVisible]);

  return (
    <button
      className="flex bg-[#FCF4F4] rounded-lg relative overflow-hidden"
      onClick={handleClick}
    >
      <p
        className={cn(
          "py-2 px-3 text-sm font-medium z-10  transition-colors",
          isVisible ? "text-[#515151]" : "text-white"
        )}
        ref={inactiveRef}
      >
        Pausar
      </p>
      <p
        className={cn(
          "py-2 px-3 text-sm font-medium z-10 transition-colors",
          isVisible ? "text-white" : "text-[#515151]"
        )}
        ref={activeRef}
      >
        Ativo
      </p>
      <div
        className="absolute inset-0 bg-primary rounded-lg"
        style={{
          ...position,
          transition: "width 0.5s, left 0.5s",
        }}
      />
    </button>
  );
};
