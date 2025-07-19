export const formatPublicVars = (publicVars: Record<string, string | boolean>): Record<string, boolean | string> => {
  const result: Record<string, boolean | string> = {};
  for (const [key, value] of Object.entries(publicVars)) {
    let val = value;
    try {
      // @ts-ignore
      val = JSON.parse(value);
    } catch (_e: any) {}
    if (val === 'true' || val === true) {
      result[key] = true;
    } else if (val === 'false' || val === false) {
      result[key] = false;
    } else {
      result[key] = value;
    }
  }
  return result;
};
