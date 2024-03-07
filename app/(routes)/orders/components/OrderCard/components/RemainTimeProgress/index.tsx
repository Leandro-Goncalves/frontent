import { Order, OrderStatus } from "@/app/models/orders";
import { Progress } from "@/components/ui/progress";
import React, { useEffect } from "react";
import Color from "colorjs.io";
import { cn } from "@/lib/utils";
import { differenceInMinutes, differenceInSeconds } from "date-fns";

interface RemainTimeProgressProps {
  order: Order;
}

export const RemainTimeProgress: React.FC<RemainTimeProgressProps> = ({
  order,
}) => {
  const [remainTimeInMinutes, setRemainTimeInMinutes] = React.useState<
    number | null
  >(null);

  useEffect(() => {
    if (order.status !== OrderStatus.pending) return;
    const fetchRemainTime = async () => {
      const now = new Date();
      const restTime = new Date(order.createdAt);

      const minutes = 30 - differenceInSeconds(now, restTime) / 60;

      setRemainTimeInMinutes(minutes);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (minutes < 0) return;
      fetchRemainTime();
    };

    fetchRemainTime();
  }, [order]);

  if (remainTimeInMinutes === null) return null;

  const remainTimeInMinutesRange = remainTimeInMinutes / 30;

  const minColor = new Color("red");
  const maxColor = new Color("green");
  const gradient = minColor.range(maxColor, { outputSpace: "srgb" });
  const colorGradient = gradient(remainTimeInMinutesRange);
  const colorValue = colorGradient.toString({ format: "hex" });

  return (
    <div>
      <Progress
        className={"h-2 mt-3"}
        ProgressColor={colorValue}
        value={remainTimeInMinutesRange * 100}
      />
    </div>
  );
};
