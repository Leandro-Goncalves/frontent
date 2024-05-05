"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export type Item =
  | {
      name: string;
      link: string;
      scrollId?: string;
      type: "internal";
    }
  | {
      name: string;
      link: string;
      type: "external";
    };

interface NavigationColumnProps {
  title: string;
  itens: Item[];
  className?: string;
  onClick(item: Item): void;
}
export const NavigationColumn: React.FC<NavigationColumnProps> = ({
  title,
  itens,
  className,
  onClick,
}) => {
  const searchParams = useSearchParams();
  const link = searchParams?.get("link");
  const scrollId = searchParams?.get("scrollId");

  useEffect(() => {
    if (link) {
      const item = itens.find(
        (item) =>
          item.link === link &&
          (item.type === "external" || item.scrollId === scrollId)
      );
      if (item) {
        console.log("focus", item);
        onClick(item);
      }
    }
  }, [link, scrollId, onClick, itens]);

  return (
    <div className={className}>
      <p className="font-bold text-lg text-primary">{title}</p>
      <div className="mt-4 flex flex-col gap-5">
        {itens.map((item, index) => (
          <button
            key={index}
            className="group text-sm text-foreground mr-auto"
            onClick={() => onClick(item)}
          >
            <span className="relative">
              <span className="absolute left-0 right-0 bottom-0 bg-primary transition-all h-0.5 w-0 group-hover:w-full"></span>
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
