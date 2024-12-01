export function getToken(): string | null {
  const user = localStorage.getItem('user');
  const token = user ? JSON.parse(user)?.token : null;
  return token;
}
