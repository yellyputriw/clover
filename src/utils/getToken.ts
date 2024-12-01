export function getToken() {
  const user = localStorage.getItem('user');
  const token = user ? JSON.parse(user)?.token : null;
  return token;
}
