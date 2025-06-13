export const DateFormatter = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
