export var Month;
(function (Month) {
    Month["JANUARY"] = "January";
    Month["FEBRUARY"] = "February";
    Month["MARCH"] = "March";
    Month["APRIL"] = "April";
    Month["MAY"] = "May";
    Month["JUNE"] = "June";
    Month["JULY"] = "July";
    Month["AUGUST"] = "August";
    Month["SEPTEMBER"] = "September";
    Month["OCTOBER"] = "October";
    Month["NOVEMBER"] = "November";
    Month["DECEMBER"] = "December";
})(Month || (Month = {}));
export const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
export function shortenMonth(month) {
    return month.toString().slice(0, 3);
}
