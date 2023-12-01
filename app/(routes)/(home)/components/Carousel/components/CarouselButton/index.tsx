import { ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CarouselButtonProps extends ButtonProps {}

export const CarouselButton: React.FC<CarouselButtonProps> = ({
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      tabIndex={-1}
      className={cn(
        className,
        "w-12 h-12 rounded-full bg-transparent border-4 box-content border-[#F38BB0] flex items-center justify-center max-md:w-7 max-md:h-7 max-md:border-2"
      )}
    />
  );
};
