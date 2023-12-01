import { cn } from "@/lib/utils";

interface TitleProps {
  className?: string;
  children: React.ReactNode;
}

export const Title: React.FC<TitleProps> = ({ className, children }) => {
  return (
    <h1
      className={cn(
        "text-[#545454] font-bold text-2xl uppercase flex items-center gap-6",
        className
      )}
    >
      {children}
      <span className={"bg-[#FFAEC5] h-[2px] flex-1"} />
    </h1>
  );
};
