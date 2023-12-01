import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { after, cn } from "@/lib/utils";
import { ContentWrapper } from "./components/ContentWrapper";
import { Catalog } from "../Catalog";
import { Informations } from "../Informations";
import { CacauStore } from "../CacauStore";

interface TabButtonsProps {}

export const TabButtons: React.FC<TabButtonsProps> = () => {
  const buttons = [
    {
      name: "catalog",
      label: "CATALOGO",
      Component: Catalog,
    },
    {
      name: "info",
      label: "INFORMAÇÕES",
      Component: Informations,
    },
    {
      name: "cacauStore",
      label: "CACAU STORE",
      Component: CacauStore,
    },
  ];

  return (
    <Tabs defaultValue={buttons[0].name}>
      <TabsList className="absolute left-1/2 translate-x-[-50%] shadow-xl !bg-[#FBDCEB] rounded-xl mt-[-62px] max-md:mt-[-30px] gap-1 h-auto p-0 bg-transparent">
        {buttons.map(({ name, label }) => (
          <TabsTrigger
            key={name}
            value={name}
            className={cn(
              "py-8 px-16  text-[#221A3F] rounded-xl relative",
              "data-[state=active]:!bg-[#FA9DC0]",
              "after:absolute after:right-[-4px] after:top-5 max-md:after:top-2 after:bottom-5 max-md:after:bottom-2 after:w-1 max-md:after:w-0.5 after:rounded-full after:bg-[#FFAEC5]",
              "last:after:opacity-0",
              "max-md:py-4 max-md:px-4 max-md:text-xs"
            )}
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      {buttons.map(({ name, label, Component }) => (
        <TabsContent value={name} key={name}>
          <ContentWrapper>
            <Component />
          </ContentWrapper>
        </TabsContent>
      ))}
    </Tabs>
  );
};
