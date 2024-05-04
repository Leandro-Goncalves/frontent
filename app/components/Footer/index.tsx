"use client";

import Image from "next/image";
import { Item } from "./components/NavigationColumn";
import { Separator } from "@/components/ui/separator";
import { usePathname, useRouter } from "next/navigation";
import { Navigation } from "./components/Navigation";
import { Help } from "./components/Help";
import { Treatment } from "./components/Treatment";
import { SocialMedia } from "./components/SocialMedia";
import queryString from "query-string";

interface FooterProps {
  phone: string;
}

export const Footer: React.FC<FooterProps> = ({ phone }) => {
  const path = usePathname() ?? "";
  const router = useRouter();
  const isPainel = path?.startsWith("/painel");

  const moveToHome = (link: string, scrollId?: string) => {
    router.push(`/?${queryString.stringify({ link, scrollId })}`);
  };

  const focus = (item: Item) => {
    if (item.type === "external") {
      window.open(item.link, "_blank");
      return;
    }

    if (path !== "/") {
      moveToHome(item.link, item.scrollId);
      return;
    }

    const element = document.getElementById(item.link);
    if (!element) return;
    element.focus({ preventScroll: true });

    if (item.scrollId) {
      setTimeout(() => {
        if (!item.scrollId) return;
        const scrollElement = document.getElementById(item.scrollId);
        if (!scrollElement) return;
        scrollElement.scrollIntoView({ behavior: "smooth" });
      }, 300);
      return;
    }

    element.scrollIntoView({ behavior: "smooth" });
  };

  if (isPainel) return <></>;

  return (
    <>
      <Separator />
      <footer className="py-4 max-xl:p-4 max-sm:p-4 px-16 flex flex-col">
        <Image
          src={"/logo.png"}
          alt="Logo escrita Cacau"
          width={195}
          height={106}
          className="mx-auto w-[149px]"
        />
        <Separator className="my-4 h-[1px] bg-border" />
        <div className="my-8 flex flex-wrap justify-between">
          <div className="my-8 grid grid-cols-2 max-sm:grid-cols-1 gap-5 max-xl:w-full">
            <Navigation className="mx-auto max-sm:mx-0" onClick={focus} />
            <Help className="mx-auto max-sm:mx-0" onClick={focus} />
          </div>
          <div className="my-8 grid grid-cols-2 max-sm:grid-cols-1 max-sm:gap-5 max-xl:w-full">
            <Treatment phone={phone} className="mx-auto max-sm:mx-0" />
            <SocialMedia className="mx-auto max-sm:mx-0" />
          </div>
        </div>
      </footer>
    </>
  );
};
