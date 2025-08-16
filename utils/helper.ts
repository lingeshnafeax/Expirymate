export const splitBase64String = (data: string) => {
  return data.includes(",") ? data.split(",")[1] : data;
};
