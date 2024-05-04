import { Item, NavigationColumn } from "../NavigationColumn";

interface NavigationProps {
  className?: string;
  onClick: (item: Item) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  className,
  onClick,
}) => {
  return (
    <NavigationColumn
      onClick={onClick}
      className={className}
      title="Navegação"
      itens={[
        {
          name: "Inicio",
          link: "tab-catalog",
          type: "internal",
        },
        {
          name: "Conheça nossa história",
          link: "tab-cacauStore",
          type: "internal",
        },
        {
          name: "Conheça nossos modelos",
          link: "tab-info",
          type: "internal",
        },
        {
          name: "Nossa loja - localização",
          link: "tab-cacauStore",
          scrollId: "ourStore",
          type: "internal",
        },
      ]}
    />
  );
};
