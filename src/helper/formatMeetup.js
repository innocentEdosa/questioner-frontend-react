export const dateFormatter = (date) => {
  const monthNames = ['Null', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  let formattedDate = date.split('-').reverse();
  formattedDate = `${formattedDate[0]} / ${monthNames[Number(formattedDate[1])]} / ${formattedDate[2]}`;
  return `${formattedDate}`;
};

export const truncate = (text, max) => text.substr(0, max - 1) + (text.length > max ? '&hellip;' : '');
