export const splitBase64String = (data: string) => {
  return data.includes(",") ? data.split(",")[1] : data;
};

export const parseError = (err: unknown) => {
  {
    if (err instanceof Error) {
      return {
        name: err.name,
        message: err.message,
        stack: err.stack,
      };
    }
    return {
      name: "UnknownError",
      message: typeof err === "string" ? err : JSON.stringify(err),
      stack: undefined,
    };
  }
};

export const formatDateForQuery = (date: Date = new Date()) => {
  return date.toISOString().replace("T", " ").replace("Z", "");
};
