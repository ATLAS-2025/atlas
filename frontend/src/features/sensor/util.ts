function parseDateString(dateStr: string | undefined | null): Date | null {
  if (!dateStr) return null;
  // Keep only first 3 fractional digits (milliseconds)
  const fixedStr = dateStr.replace(/(\.\d{3})\d+/, "$1");
  const d = new Date(fixedStr);
  return isNaN(d.getTime()) ? null : d;
}
