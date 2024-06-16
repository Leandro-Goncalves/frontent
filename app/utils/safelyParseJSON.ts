export const safelyParseJSON = (json: string, fallback?: any) => {
  let parsed = fallback;
  try {
    parsed = JSON.parse(json);
  } catch (e) {}
  return parsed;
};
