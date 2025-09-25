import { useState } from "react";
import axios from "axios";
import { decryptData } from "../utils/crypto";
import { useNavigate } from "react-router-dom";

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();

   
//     if (!email.includes("@")) {
//       setError("Invalid email format");
//       return;
//     }
//     if (password.length < 6) {
//       setError("Password must be at least 6 characters");
//       return;
//     }

//     setError("");
//     alert("Login successful!");
//   };

//   return (
//     <div className="max-w-sm mx-auto mt-10 p-6 border rounded shadow">
//       <h2 className="text-xl font-bold mb-4">Login</h2>
//       <form onSubmit={handleLogin} className="space-y-4">
//         <div>
//           <label className="block mb-1">Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         {error && <p className="text-red-500 text-sm">{error}</p>}

//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           style={{
//             padding: "5px",
//             background: "blue",
//             color: "white",
//             border: "none",
//             borderRadius: "5px",
//           }}
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }



function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Fetch all students from db.json
      const res = await axios.get("http://localhost:5000/students");
      const students = res.data;

      // 🔑 Find student with matching email (decrypt stored email first)
      const student = students.find(
        (s: any) => decryptData(s.email) === email
      );

      if (!student) {
        alert("Invalid email or password ❌");
        return;
      }

      // 🔑 Decrypt stored password
      const decryptedPassword = decryptData(student.password);

      if (decryptedPassword === password) {
        alert("Login successful ✅");
        localStorage.setItem("isAuthenticated", "true"); // mark logged in
        navigate("/students"); // Redirect to Students page
      } else {
        alert("Invalid email or password ❌");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-3">
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
          className="w-full p-2 bg-blue-600 text-white rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
