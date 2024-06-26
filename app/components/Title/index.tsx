import { cn } from "@/lib/utils";

interface TitleProps {
  className?: string;
  children: React.ReactNode;
  id?: string;
}

export const Title: React.FC<TitleProps> = ({ className, children, id }) => {
  return (
    <h1
      id={id}
      className={cn(
        "text-foreground font-bold text-2xl uppercase flex items-center gap-6",
        className
      )}
    >
      {children}
      <span className={"bg-border h-[2px] flex-1"} />
    </h1>
  );
};
