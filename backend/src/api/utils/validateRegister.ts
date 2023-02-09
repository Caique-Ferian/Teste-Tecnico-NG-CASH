export default function validateRegister(
  user: string | undefined,
  password: string | undefined,
): number {
  const passwordRegex = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  if (!user || user.length < 3) return 0;
  if (!password || !passwordRegex.test(password)) return 1;
  return 2;
}
