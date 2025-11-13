export const formatDateFirebase = (timestamp: {
  seconds: number;
  nanoseconds: number;
}): string => {
  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1_000_000
  );
  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
};
