import { useEffect, useState } from "react";
import axios from "axios";
import { decryptData, encryptData } from "../utils/crypto";

interface Student {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  address: string;
  course: string;
  password: string;
}

function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // ✅ Load and decrypt students
  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/students");
    const decrypted = res.data.map((s: any) => ({
      ...s,
      fullName: decryptData(s.fullName),
      email: decryptData(s.email),
      phone: decryptData(s.phone),
      dob: decryptData(s.dob),
      gender: decryptData(s.gender),
      address: decryptData(s.address),
      course: decryptData(s.course),
      password: decryptData(s.password),
    }));
    setStudents(decrypted);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ✅ Delete student
  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:5000/students/${id}`);
    fetchStudents();
  };

  // ✅ Save student after edit
  const handleUpdate = async () => {
    if (!editingStudent) return;

    // Re-encrypt fields before saving
    const encryptedStudent = {
      fullName: encryptData(editingStudent.fullName),
      email: encryptData(editingStudent.email),
      phone: encryptData(editingStudent.phone),
      dob: encryptData(editingStudent.dob),
      gender: encryptData(editingStudent.gender),
      address: encryptData(editingStudent.address),
      course: encryptData(editingStudent.course),
      password: encryptData(editingStudent.password),
    };

    await axios.put(
      `http://localhost:5000/students/${editingStudent.id}`,
      encryptedStudent
    );

    setEditingStudent(null);
    fetchStudents();
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Student List</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Course</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) =>
              editingStudent?.id === s.id ? (
                <tr key={s.id}>
                  <td className="border p-2">
                    <input
                      value={editingStudent.fullName}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
                          fullName: e.target.value,
                        })
                      }
                      className="border p-1"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      value={editingStudent.email}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
                          email: e.target.value,
                        })
                      }
                      className="border p-1"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      value={editingStudent.phone}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
                          phone: e.target.value,
                        })
                      }
                      className="border p-1"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      value={editingStudent.course}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
                          course: e.target.value,
                        })
                      }
                      className="border p-1"
                    />
                  </td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={handleUpdate}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingStudent(null)}
                      className="bg-gray-400 text-white px-2 py-1 rounded"
            
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={s.id}>
                  <td className="border p-2">{s.fullName}</td>
                  <td className="border p-2">{s.email}</td>
                  <td className="border p-2">{s.phone}</td>
                  <td className="border p-2">{s.course}</td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() => setEditingStudent(s)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentList;
