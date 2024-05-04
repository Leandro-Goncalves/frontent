import { Ref, Suspense, lazy } from "react";
import { useQuery } from "@tanstack/react-query";
import { type IPlayerProps } from "@lottiefiles/react-lottie-player";
import { getColors } from "lottie-colorify";
import { replaceColor as RColor } from "@/app/utils/misc/replaceColor";
import { hslToHex } from "@/app/utils/misc/hslToHex";

const Player = lazy(() =>
  import("@lottiefiles/react-lottie-player").then((m) => ({
    default: m.Player,
  }))
);

interface LottieProps<T extends Record<string, unknown>> {
  src: () => Promise<T>;
  id: string;
  playerRef: Ref<any>;
  fallback?: React.ReactNode;
  replaceColor?: [string | number[], targetColor: string | number[]];
}

export function LazyLottie<T extends Record<string, unknown>>({
  src,
  id,
  playerRef,
  fallback,
  replaceColor,
  ...props
}: LottieProps<T> & Omit<IPlayerProps, "src">) {
  const { data } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      void import("@lottiefiles/react-lottie-player"); // Trigger the library lazy load even if the animationData is not ready
      return src();
    },
    enabled: typeof window !== "undefined",
  });

  if (!data) return fallback;
  return (
    <Suspense fallback={fallback}>
      <Player
        src={
          replaceColor ? RColor(replaceColor[0], replaceColor[1], data) : data
        }
        {...props}
        ref={playerRef}
      />
    </Suspense>
  );
}
