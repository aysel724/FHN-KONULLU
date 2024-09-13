export default function convertDate(date) {
    const dateObject = new Date(date);

    // Get UTC time string
    const utcYear = dateObject.getUTCFullYear();
    const utcMonth = dateObject.getUTCMonth() + 1; // months are zero-indexed
    const utcDay = dateObject.getUTCDate();
    const utcHours = dateObject.getUTCHours();
    const utcMinutes = dateObject.getUTCMinutes();
    const utcSeconds = dateObject.getUTCSeconds();

    // Construct the UTC date string in ISO 8601 format
    const utcDateTimeString = `${utcYear}-${utcMonth
      .toString()
      .padStart(2, "0")}-${utcDay.toString().padStart(2, "0")}T${utcHours
      .toString()
      .padStart(2, "0")}:${utcMinutes
      .toString()
      .padStart(2, "0")}:${utcSeconds.toString().padStart(2, "0")}Z`;
    return utcDateTimeString;
  }