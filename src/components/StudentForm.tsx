import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { encryptData } from "../utils/crypto";


interface StudentFormProps {
  onStudentAdded?: () => void;
}

function StudentForm({ onStudentAdded }: StudentFormProps) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    course: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🔐 Encrypt each field separately
    const encryptedStudent = {
      fullName: encryptData(formData.fullName),
      email: encryptData(formData.email),
      phone: encryptData(formData.phone),
      dob: encryptData(formData.dob),
      gender: encryptData(formData.gender),
      address: encryptData(formData.address),
      course: encryptData(formData.course),
      password: encryptData(formData.password),
    };

    await axios.post("http://localhost:5000/students", encryptedStudent);

    alert("Student Registered with per-field encryption!");

    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      dob: "",
      gender: "",
      address: "",
      course: "",
      password: "",
    });

    if (onStudentAdded) {
      onStudentAdded();
    }

    // ✅ Redirect to student list after registration
    navigate("/students");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Student Registration</h2>

        
      <form
        onSubmit={handleSubmit}
        className="space-y-3"
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <input
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Gender</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
        </select>
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="course"
          placeholder="Course Enrolled"
          value={formData.course}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
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
          Register
        </button>
        <button
        onClick={() => navigate(-1)}
         style={{
            padding: "5px",
            background: "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
         }}
      >
        Back
      </button>
      </form>
    </div>
  );
}

export default StudentForm;
