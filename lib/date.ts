export function formatTamilDate(date: string) {
  return new Intl.DateTimeFormat("ta-IN", {
    dateStyle: "long",
    timeZone: "UTC"
  }).format(new Date(`${date}T00:00:00Z`));
}
