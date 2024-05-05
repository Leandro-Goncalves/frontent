"use client";

import Image from "next/image";
import { Item } from "./components/NavigationColumn";
import { Separator } from "@/components/ui/separator";
import { usePathname, useRouter } from "next/navigation";
import { Navigation } from "./components/Navigation";
import { Help } from "./components/Help";
import { Treatment } from "./components/Treatment";
import { SocialMedia } from "./components/SocialMedia";

interface FooterProps {
  phone: string;
}

export const Footer: React.FC<FooterProps> = ({ phone }) => {
  const path = usePathname() ?? "";
  const router = useRouter();
  const isPainel = path?.startsWith("/painel");

  const moveToHome = (link: string, scrollId?: string) => {
    let path = "/";
    if (link) {
      path += `?link=${link}`;
    }
    if (scrollId) {
      path += `&scrollId=${scrollId}`;
    }
    router.push(path);
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

    const focusOnScrollId = (ttl = 50) => {
      setTimeout(() => {
        const element = document.getElementById(item.link);
        if (!element) {
          if (ttl === 0) return;
          focusOnScrollId(ttl - 1);
          return;
        }
        element.focus({ preventScroll: true });

        if (!item.scrollId) {
          element.scrollIntoView({ behavior: "smooth" });
          return;
        }

        console.log("item", item);
        const scrollElement = document.getElementById(item.scrollId);
        console.log(scrollElement);
        if (!scrollElement) {
          console.log("retry");
          if (ttl === 0) return;
          focusOnScrollId(ttl - 1);
          return;
        }
        scrollElement.scrollIntoView({ behavior: "smooth" });
      }, 300);
    };

    focusOnScrollId();
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
