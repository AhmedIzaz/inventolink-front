export const API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.DEV_BASE_URL
    : process.env.BASE_URL;
