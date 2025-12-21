export const isCloudStorageEnabled = (): boolean => {
  return (
    typeof process.env.AZURE_STORAGE_CONNECTION_STRING === "string" &&
    typeof process.env.AZURE_STORAGE_CONTAINER_NAME === "string" &&
    typeof process.env.AZURE_STORAGE_ACCOUNT_BASEURL === "string"
  );
};

export const dateFormatter = (date: string, locale: "en" | "fi"): string => {
  const d = new Date(date);
  return d.toLocaleString(`${locale}-FI`, {
    timeZone: "Europe/Helsinki",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
