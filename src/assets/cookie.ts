export function setCookie(key: string, value: string) {
  document.cookie = `${key}=${value}; path=/`;
}

export function getCookie(key: string) {
  let cookies = document.cookie.split(";");
  let cookie = cookies.find((c) => c.trim().startsWith(`${key}=`));
  return cookie ? cookie.split("=")[1] : undefined;
}
