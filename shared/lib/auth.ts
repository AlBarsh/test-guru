const ACCESS_TOKEN_KEY = "accessToken";

export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }
  
  const tokenInLocalStorage = localStorage.getItem(ACCESS_TOKEN_KEY);
  const tokenInSessionStorage = sessionStorage.getItem(ACCESS_TOKEN_KEY);
  
  return !!(tokenInLocalStorage || tokenInSessionStorage);
}

