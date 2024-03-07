"use client";

import { useComingSoon } from "@/app/states/useCommingSoon.state";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

interface ComingSoonProps {}

export const ComingSoon: React.FC<ComingSoonProps> = () => {
  const { shouldShow, setShow } = useComingSoon();
  const params = useSearchParams();

  const sShow = params?.get("show") === "true";
  const isMobile = useMediaQuery({ query: "(max-width: 850px)" });

  console.log(sShow, shouldShow);
  useEffect(() => {
    if (sShow) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, []); // eslint-disable-line

  if (shouldShow) {
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
      <div className="absolute inset-0 bg-transparent z-50 flex max-[850px]:p-0 p-6">
        {isMobile ? (
          <Image
            src="/comingSoon-mobile.png"
            alt="coming soon"
            width={418}
            height={652}
            style={{
              objectFit: "cover",
              margin: "auto",
              filter: "drop-shadow(0 4px 30px #0000006e)",
              borderRadius: "0.5rem",
            }}
          />
        ) : (
          <Image
            src="/comingSoon.jpg"
            alt="coming soon"
            width={1508}
            height={848}
            style={{
              objectFit: "cover",
              margin: "auto",
              filter: "drop-shadow(0 4px 30px #0000006e)",
              borderRadius: "0.5rem",
            }}
          />
        )}
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
