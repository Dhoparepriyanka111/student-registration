import { useState } from "react";
import axios from "axios";
import { encryptData } from "../utils/crypto";

interface StudentFormProps {
  onStudentAdded?: () => void; 
}

function StudentForm({ onStudentAdded }: StudentFormProps) {
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //password encrypted
    const encryptedPassword = encryptData(formData.password);
    const newStudent = { ...formData, password: encryptedPassword };

    await axios.post("http://localhost:5000/students", newStudent);

    alert("Student Registered & Encrypted!");

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
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Student Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-3"style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full border p-2 rounded"
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
        />
        <input
          name="course"
          placeholder="Course Enrolled"
          value={formData.course}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
       

            <button type="submit" style={{ padding: '10px', background: 'blue', color: 'white', border: 'none' }}>
          Register
        </button>
      </form>
    </div>
  );
}

export default StudentForm;
