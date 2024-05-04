const round = (n: number) => Math.round(n * 1000) / 1000;

export const replaceColor = (
  sourceColor: string | number[],
  targetColor: string | number[],
  lottieObj: any
) => {
  const genSourceLottieColor = convertColorToLottieColor(sourceColor);
  const genTargetLottieColor = convertColorToLottieColor(targetColor);
  if (!genSourceLottieColor || !genTargetLottieColor) {
    throw new Error("Proper colors must be used for both source and target");
  }
  function doReplace(
    sourceLottieColor: number[],
    targetLottieColor: number[],
    obj: any
  ) {
    if (obj.s && Array.isArray(obj.s) && obj.s.length === 4) {
      if (
        sourceLottieColor[0] === obj.s[0] &&
        sourceLottieColor[1] === obj.s[1] &&
        sourceLottieColor[2] === obj.s[2]
      ) {
        obj.s = [...targetLottieColor, 1];
      }
    } else if (obj.c && obj.c.k) {
      if (Array.isArray(obj.c.k) && typeof obj.c.k[0] !== "number") {
        doReplace(sourceLottieColor, targetLottieColor, obj.c.k);
      } else if (
        sourceLottieColor[0] === round(obj.c.k[0]) &&
        sourceLottieColor[1] === round(obj.c.k[1]) &&
        sourceLottieColor[2] === round(obj.c.k[2])
      ) {
        obj.c.k = targetLottieColor;
      }
    } else {
      for (const key in obj) {
        if (typeof obj[key] === "object") {
          doReplace(sourceLottieColor, targetLottieColor, obj[key]);
        }
      }
    }

    return obj;
  }
  return doReplace(genSourceLottieColor, genTargetLottieColor, lottieObj);
};

const convertColorToLottieColor = (color: string | number[] | undefined) => {
  if (
    typeof color === "string" &&
    color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
  ) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    if (!result) {
      throw new Error("Color can be only hex or rgb array (ex. [10,20,30])");
    }
    return [
      Math.round((parseInt(result[1], 16) / 255) * 1000) / 1000,
      Math.round((parseInt(result[2], 16) / 255) * 1000) / 1000,
      Math.round((parseInt(result[3], 16) / 255) * 1000) / 1000,
    ];
  } else if (
    typeof color === "object" &&
    color.length === 3 &&
    color.every((item) => item >= 0 && item <= 255)
  ) {
    return [
      Math.round((color[0] / 255) * 1000) / 1000,
      Math.round((color[1] / 255) * 1000) / 1000,
      Math.round((color[2] / 255) * 1000) / 1000,
    ];
  } else if (!color) {
    return undefined;
  } else {
    throw new Error("Color can be only hex or rgb array (ex. [10,20,30])");
  }
};
