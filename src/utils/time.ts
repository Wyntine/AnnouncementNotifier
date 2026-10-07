export function forceUTCTime(dateString: string) {
  return new Date(`${dateString}T00:00:00`);
}

export function getNewerDate(date1: Date, date2: Date) {
  return new Date(Math.max(date1.valueOf(), date2.valueOf()));
}
