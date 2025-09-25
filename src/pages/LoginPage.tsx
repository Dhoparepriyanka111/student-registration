

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { encryptData, decryptData } from "../utils/crypto";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    // 🔐 Encrypt input email & password to match stored encrypted data
    const encryptedEmail = encryptData(email);
    const encryptedPassword = encryptData(password);

    try {
      const res = await axios.get("http://localhost:5000/students");
      const students = res.data;

      // 🔍 Find student with matching encrypted email & password
      const student = students.find(
        (s: any) => s.email === encryptedEmail && s.password === encryptedPassword
      );

      if (!student) {
        alert("Invalid email or password!");
        return;
      }

      // ✅ Optional: decrypt fullName for greeting or session
      const studentName = decryptData(student.fullName);
      alert(`Login successful! Welcome ${studentName}`);

      // Redirect to dashboard or student list
      navigate("/students");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Check console for details.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Student Login</h2>
      <form
        onSubmit={handleLogin}
        className="space-y-3"
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          style={{
            padding: "5px",
            background: "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;


