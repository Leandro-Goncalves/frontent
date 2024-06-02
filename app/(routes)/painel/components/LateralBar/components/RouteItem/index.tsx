"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

type RouteItemProps = {
  icon?: React.ReactNode;
  name: string;
  href?: string;
  content?: Omit<RouteItemProps, "content">[];
};

export const RouteItem: React.FC<RouteItemProps> = (route) => {
  const { push } = useRouter();
  const path = usePathname();

  const handleClick = (route: string) => {
    push("/painel" + route);
  };

  const isActive = path === `/painel${route.href}`;
  const Icon = route.icon;

  if (route.content) {
    return (
      <AccordionItem
        value={route.name}
        className={"border-0 w-full text-primary justify-start"}
      >
        <AccordionTrigger className="px-4 py-2 h-10 bg-card/50 rounded-md">
          <div className="flex items-center uppercase font-medium text-sm">
            {Icon}
            {route.name}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="w-full flex flex-col gap-4 pl-4 pt-4">
            {route.content.map((route) => (
              <RouteItem {...route} key={route.name} />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Button
      onClick={() => route.href && handleClick(route.href)}
      key={route.name}
      className={cn(
        isActive
          ? "w-full display justify-start"
          : "w-full hover:bg-card hover:g-card/50 bg-card/50 text-primary justify-start"
      )}
    >
      {Icon}
      {route.name}
    </Button>
  );
};
