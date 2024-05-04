import { Item, NavigationColumn } from "../NavigationColumn";

interface HelpProps {
  className?: string;
  onClick: (item: Item) => void;
}

export const Help: React.FC<HelpProps> = ({ className, onClick }) => {
  return (
    <NavigationColumn
      onClick={onClick}
      className={className}
      title="Precisa de ajuda?"
      itens={[
        {
          name: "Dúvidas frequentes",
          link: "tab-info",
          scrollId: "doubts",
          type: "internal",
        },
        {
          name: "Politica de trocas e devolução",
          link: "https://www.google.com/",
          type: "external",
        },
        {
          name: "Politica de privacidade",
          link: "https://www.google.com/",
          type: "external",
        },
      ]}
    />
  );
};
