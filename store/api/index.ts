export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "http://link.invento.com"
    : "http://localhost:4000";
