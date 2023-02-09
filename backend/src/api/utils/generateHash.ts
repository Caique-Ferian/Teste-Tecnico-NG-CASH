import { Md5 } from 'ts-md5';

export default function generateHash(password: string | undefined): string {
  if (password) {
    return Md5.hashStr(password);
  }
  return '';
}
