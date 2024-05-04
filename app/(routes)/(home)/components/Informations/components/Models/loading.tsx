import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const ModelsLoading = () => {
  return (
    <div className="mt-10 flex gap-6 max-[1250px]:flex-col flex-col">
      {[{}, {}, {}, {}, {}].map((_, i) => {
        const isOdd = i % 2 === 0;

        return (
          <div
            key={i}
            className={cn(
              "rounded-3xl overflow-hidden flex items-center",
              isOdd ? "flex-row border-2" : "flex-row-reverse",
              "max-[1250px]:flex-col max-[1250px]:border-2"
            )}
          >
            <Skeleton className="rounded-3xl max-[1250px]:w-full shrink-0 h-auto w-[640px] aspect-[457/577]" />
            <div className="w-full flex items-center flex-col p-8 text-center">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-[400px] w-full mt-2" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
