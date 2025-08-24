export const isCloudStorageEnabled = (): boolean => {
  return (
    typeof process.env.AZURE_STORAGE_CONNECTION_STRING === "string" &&
    typeof process.env.AZURE_STORAGE_CONTAINER_NAME === "string" &&
    typeof process.env.AZURE_STORAGE_ACCOUNT_BASEURL === "string"
  );
};
