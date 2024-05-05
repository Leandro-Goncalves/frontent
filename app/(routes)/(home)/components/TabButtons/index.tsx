import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { ContentWrapper } from "./components/ContentWrapper";
import { Catalog } from "../Catalog";
import { Informations } from "../Informations";
import { CacauStore } from "../CacauStore";
import { Trigger } from "./components/Trigger";
import { GAEvents } from "@/app/utils/GAEvents";

interface TabButtonsProps {
  defaultTab?: string;
}

interface Tab {
  name: string;
  label: string;
  Component: React.FC;
  eventName: keyof GAEvents["tabs"];
}

export const tabButtons: Tab[] = [
  {
    name: "catalog",
    label: "CATALOGO",
    Component: Catalog,
    eventName: "openCatalog",
  },
  {
    name: "info",
    label: "INFORMAÇÕES",
    Component: Informations,
    eventName: "openInfo",
  },
  {
    name: "cacauStore",
    label: "CACAU STORE",
    Component: CacauStore,
    eventName: "openCacauStore",
  },
];

export const TabButtons: React.FC<TabButtonsProps> = ({ defaultTab }) => {
  return (
    <Tabs
      defaultValue={defaultTab ? defaultTab.split("-")[1] : tabButtons[0].name}
    >
      <TabsList className="absolute left-1/2 translate-x-[-50%] shadow-xl !bg-card rounded-xl mt-[-62px] max-md:mt-[-30px] gap-1 h-auto p-0">
        {tabButtons.map(({ name, label, eventName }) => (
          <Trigger key={name} name={name} label={label} eventName={eventName} />
        ))}
      </TabsList>
      {tabButtons.map(({ name, Component }) => (
        <TabsContent value={name} key={name}>
          <ContentWrapper>
            <Component />
          </ContentWrapper>
        </TabsContent>
      ))}
    </Tabs>
  );
};
