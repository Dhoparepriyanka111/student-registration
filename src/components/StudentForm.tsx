import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { encryptData, decryptData } from "../utils/crypto";

interface StudentFormProps {
  onStudentAdded?: () => void;
}

function StudentForm({ onStudentAdded }: StudentFormProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Get student id from URL
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

  // 🔹 Load student data if editing
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/students/${id}`).then((res) => {
        const student = res.data;
        setFormData({
          fullName: decryptData(student.fullName),
          email: decryptData(student.email),
          phone: decryptData(student.phone),
          dob: decryptData(student.dob),
          gender: decryptData(student.gender),
          address: decryptData(student.address),
          course: decryptData(student.course),
          password: decryptData(student.password),
        });
      });
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

    try {
      if (id) {
        // 🔹 Update existing student
        await axios.put(`http://localhost:5000/students/${id}`, encryptedStudent);
        alert("Student updated successfully!");
      } else {
        // 🔹 Add new student
        await axios.post("http://localhost:5000/students", encryptedStudent);
        alert("Student registered successfully!");
      }

      if (onStudentAdded) onStudentAdded();
      navigate("/students");
    } catch (error) {
      console.error("Error saving student:", error);
      alert("Failed to save student. Check console.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">
        {id ? "Edit Student" : "Student Registration"}
      </h2>

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

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {id ? "Update" : "Register"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/students")}
            className="flex-1 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default StudentForm;
