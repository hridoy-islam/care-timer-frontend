export function convertTo24(timeString) {
  // Split the time string into hours, minutes, and AM/PM
  const [time, ampm] = timeString.split(" ");
  const [hours, minutes] = time.split(":");

  // Convert hours to a 24-hour format
  let hours24 = parseInt(hours, 10);
  if (ampm === "PM" && hours24 !== 12) {
    hours24 += 12;
  } else if (ampm === "AM" && hours24 === 12) {
    hours24 = 0;
  }

  // Create a 24-hour time string
  const time24 = `${hours24.toString().padStart(2, "0")}:${minutes}`;

  return time24;
}
