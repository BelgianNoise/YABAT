export enum Month {
  JANUARY = 'January',
  FEBRUARY = 'February',
  MARCH = 'March',
  APRIL = 'April',
  MAY = 'May',
  JUNE = 'June',
  JULY = 'July',
  AUGUST = 'August',
  SEPTEMBER = 'September',
  OCTOBER = 'October',
  NOVEMBER = 'November',
  DECEMBER = 'December',
}

export const monthNames = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function shortenMonth(month: Month): string {
  return month.toString().slice(0, 3);
}
