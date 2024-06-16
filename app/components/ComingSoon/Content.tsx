"use client";
import { Block } from "@/app/models/block";
import { useComingSoon } from "@/app/states/useCommingSoon.state";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

interface ContentProps {
  block: Block;
}

export const Content: React.FC<ContentProps> = ({ block }) => {
  const { shouldShow, setShow } = useComingSoon();
  const params = useSearchParams();
  const pathname = usePathname();

  const sShow = params?.get("show") === "true";
  const isMobile = useMediaQuery({ query: "(max-width: 850px)" });
  const isBlockActive = Object.keys(block).length > 0;

  const handleOpenLink = () => {
    window.open(block.link, "_blank");
  };

  useEffect(() => {
    const isPainel = pathname?.startsWith("/painel");
    if (!isBlockActive || sShow || isPainel) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [block, isBlockActive]); // eslint-disable-line

  if (shouldShow || !isBlockActive) {
    return (
      <>
        <style>
          {`
          #content {
            height: auto;
            overflow: auto;
            filter: none;
          }
        `}
        </style>
      </>
    );
  }

  return (
    <>
      <div className="absolute inset-0 bg-black/50 z-50 flex max-[850px]:p-0 p-6">
        <div
          className={cn(
            "rounded-3xl w-full p-20 bg-background flex flex-col max-w-[1600px] mx-auto relative",
            "after:absolute after:top-0 after:h-2 after:bg-primary after:rounded-full after:-translate-y-1/2 after:left-1/4 after:right-1/4",
            "max-[850px]:rounded-none max-[850px]:p-4"
          )}
        >
          <p className="max-[850px]:mt-10  text-8xl text-center text-primary font-bold max-[850px]:text-4xl">
            {block.name}
          </p>
          <p className="text-2xl mb-4 text-center mt-auto max-w-4xl mx-auto font-medium max-[850px]:text-lg">
            {block.description}
          </p>
          <Button
            className="h-auto px-20 mx-auto mt-auto font-bold text-xl max-[850px]:text-base"
            onClick={handleOpenLink}
          >
            {block.buttonText}
          </Button>
          <Image
            style={{ margin: "0 auto", marginTop: 50, marginBottom: -20 }}
            src={"/logo.png"}
            alt="Logo escrita Cacau"
            width={200}
            height={200}
          />
        </div>
      </div>
      <style>
        {`
          #content {
            height: 100vh;
            overflow: hidden;
            filter: blur(10px);
          }
        `}
      </style>
    </>
  );
};
