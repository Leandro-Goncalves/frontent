import { cn } from "@/lib/utils";

interface SectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
  position?: "left" | "bottom";
}

export const Section: React.FC<SectionProps> = ({
  title,
  description,
  children,
  position = "left",
}) => {
  const isBottom = position === "bottom";
  return (
    <div
      className={cn(
        "p-6 rounded-md bg-card flex justify-between items-center w-full",
        {
          "flex-col gap-4 items-start": isBottom,
        }
      )}
    >
      <div>
        <p className="font-bold text-lg">{title}</p>
        <p className="font-medium text-base">{description}</p>
      </div>
      {children}
    </div>
  );
};
