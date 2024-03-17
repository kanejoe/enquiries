/**
 * Returns a human-readable date string in the format:
 * Weekday, Day Month Year, Hour:Minute AM/PM
 * 
 * @param date - The date object to format
 * @returns The formatted date string
 */
export function getReadableDate(isoDateString: Date): string {
  const date = isoDateString ? new Date(isoDateString) : new Date()
  return new Intl.DateTimeFormat("en-IE", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date)
}