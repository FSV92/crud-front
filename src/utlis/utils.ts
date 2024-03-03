// преобразование даты в формат ISO
export const convertingDateToISO = (date: string) => {
  const newDate = new Date(date);
  const formattedDate = newDate.toISOString().replace(".000Z", "+") + newDate.toLocaleTimeString();

  return formattedDate;
};

// редактирование переносов, замена \n на <br />
export const convertingBodyWithGaps = (value: string) => {
  return value.replace(/(?:\r\n|\r|\n)/g, "<br />");
};
