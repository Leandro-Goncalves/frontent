type item =
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
  itens: item[];
  className?: string;
}
export const NavigationColumn: React.FC<NavigationColumnProps> = ({
  title,
  itens,
  className,
}) => {
  const focus = (item: item) => () => {
    if (item.type === "external") {
      window.open(item.link, "_blank");
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
      }, 50);
      return;
    }

    element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={className}>
      <p className="font-bold text-lg text-primary">{title}</p>
      <div className="mt-4 flex flex-col gap-5">
        {itens.map((item, index) => (
          <button
            key={index}
            className="group text-sm text-[#1B123D] mr-auto"
            onClick={focus(item)}
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
