import CryptoJS from "crypto-js";

const SECRET_KEY = "my-secret-key"; // 🔑 change in real app

// Encrypt
export function encryptData(data: string): string {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
}

// Decrypt
export function decryptData(cipherText: string): string {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}
