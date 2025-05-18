/**
 * Formats a date based on the specified mode
 * @param {Date} date The date to format
 * @param {'date' | 'time' | 'datetime'} [mode='date'] The format mode
 * @returns {string} Formatted date string
 */
// ./Utils/dateUtils.js
import { Alert } from "react-native";
export const formatDate = (date, mode = "date") => {
  if (!date) return "";
  if (mode === "time") {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

/**
 * Gets the current date with time set to midnight
 * @param {Date} [date=new Date()] Optional base date
 * @returns {Date} Date object set to midnight
 */
export const getStartOfDay = (date = new Date()) => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

/**
 * Adds days to a date
 * @param {Date} date The base date
 * @param {number} days Number of days to add
 * @returns {Date} New date with added days
 */
export const addDays = (date, days) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

/**
 * Gets a date range array between two dates
 * @param {Date} startDate Start of the range
 * @param {Date} endDate End of the range
 * @returns {Date[]} Array of dates in the range
 */
export const getDateRange = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

export async function requestTransactions(setTransactions, tempDate) {
  const date = new Date(tempDate); // or new Date() or your selected date
  try {
    const res = await fetch(
      "https://deep-boxer-heavily.ngrok-free.app/api/v1/transactions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scheduled_at: date.toISOString(), // important: send as ISO string
        }),
      }
    );

    const data = await res.json();

    setTransactions(data);
    return "success";
  } catch (error) {
    Alert.alert(error.message);
  }
}

//  <DatePicker
//    date={singleDate || new Date()}
//    onChange={setSingleDate}
//    placeholder="Select a date"
//    label="Pick a date"
//  />;
