export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const isJWTExpired = (token: string) => {
  if (!token) return true;

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = JSON.parse(atob(base64));

    // exp is in seconds → convert to ms
    const expiry = jsonPayload.exp * 1000;

    return Date.now() > expiry;
  } catch (e) {
    return true; // token invalid = consider expired
  }
};
