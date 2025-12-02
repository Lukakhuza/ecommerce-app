export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
