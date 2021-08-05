export const convertDate = (date: number) => {
  const newDate = new Date(date);
  const dateString = newDate.toLocaleDateString();
  const timeString = newDate.toLocaleTimeString();
  return `${timeString}, ${dateString}`;
};
