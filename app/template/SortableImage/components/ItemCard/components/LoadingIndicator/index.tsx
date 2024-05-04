import { Icons } from "@/components/icons";

interface LoadingIndicatorProps {}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = () => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#00000073] z-20 flex items-center justify-center">
      <Icons.spinner className="h-8 w-8 animate-spin text-white" />
    </div>
  );
};
