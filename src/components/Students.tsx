import { useEffect, useState } from "react";
import axios from "axios";
import { decryptData } from "../utils/crypto";
import { useNavigate } from "react-router-dom";

interface Student {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  address: string;
  course: string;
  password: string; // encrypted
}

function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/students");
    setStudents(res.data);
  };

    const handleEdit = (id: number) => {
    navigate(`/students/edit/${id}`); // redirect to edit form
  };
  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:5000/students/${id}`);
    fetchStudents();
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Student List</h2>

      {/* Navigation buttons */}
      <div className="flex justify-between mb-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Back
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            navigate("/login");
          }}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Student Table */}
      <table className="w-full border-collapse border border-gray-300 text-left">
        <thead>
          <tr className="bg-gray-100 text-sm">
            <th className="border p-2">ID</th>
            <th className="border p-2">Full Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">DOB</th>
            <th className="border p-2">Gender</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Course</th>
            <th className="border p-2">Password (Decrypted)</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan={10} className="text-center p-4">
                No students found
              </td>
            </tr>
          ) : (
            students.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50 text-sm">
                <td className="border p-2">{s.id}</td>
                <td className="border p-2">{decryptData(s.fullName)}</td>
                <td className="border p-2">{decryptData(s.email)}</td>
                <td className="border p-2">{decryptData(s.phone)}</td>
                <td className="border p-2">{decryptData(s.dob)}</td>
                <td className="border p-2">{decryptData(s.gender)}</td>
                <td className="border p-2">{decryptData(s.address)}</td>
                <td className="border p-2">{decryptData(s.course)}</td>
                <td className="border p-2">{decryptData(s.password)}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(s.id)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Students;
