import CryptoJS from "crypto-js";

// ✅ Secret key (use env in real apps)
const SECRET_KEY = "my_secret_key_123";

// 🔐 Encrypt a single string value
export const encryptData = (plainText: string): string => {
  if (!plainText) return "";
  return CryptoJS.AES.encrypt(plainText, SECRET_KEY).toString();
};

// 🔓 Decrypt a single string value
export const decryptData = (cipherText: string): string => {
  if (!cipherText) return "";
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption error:", error);
    return "";
  }
};

