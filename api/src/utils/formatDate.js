// utils/formatDate.js

function formatDateID(dateString, type = "default") {
  if (!dateString) return null;

  const date = new Date(dateString);
  const options = {
    full: {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Jakarta",
    },
    long: {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Jakarta",
    },
    shortMonth: {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "Asia/Jakarta",
    },
    shortMonthNoYear: {
      month: "short",
      day: "numeric",
      timeZone: "Asia/Jakarta",
    },
    fullTime: {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Jakarta",
    },
    default: {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      timeZone: "Asia/Jakarta",
    },
  };

  const formatter = new Intl.DateTimeFormat("id-ID", options[type] || options.default);

  // Handle short month (Jan, Feb, Mar) manually
  let formattedDate = formatter.format(date);
  if (type === "shortMonth" || type === "shortMonthNoYear") {
    formattedDate = formattedDate.replace(/\bJanuari\b/, "Jan")
      .replace(/\bFebruari\b/, "Feb")
      .replace(/\bMaret\b/, "Mar")
      .replace(/\bApril\b/, "Apr")
      .replace(/\bMei\b/, "Mei")
      .replace(/\bJuni\b/, "Jun")
      .replace(/\bJuli\b/, "Jul")
      .replace(/\bAgustus\b/, "Agu")
      .replace(/\bSeptember\b/, "Sep")
      .replace(/\bOktober\b/, "Okt")
      .replace(/\bNovember\b/, "Nov")
      .replace(/\bDesember\b/, "Des");
  }

  return formattedDate;
}

module.exports = { formatDateID };