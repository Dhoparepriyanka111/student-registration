import { useEffect, useState } from "react";
import axios from "axios";
import { decryptData, encryptData } from "../utils/crypto";

interface Student {
  id: number;
  fullName: string;
  email: string;
  course: string;
  password: string;
}

function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Fetch students from db.json
  useEffect(() => {
    axios.get("http://localhost:5000/students").then((res) => {
      setStudents(res.data);
    });
  }, []);

  // Delete student
  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:5000/students/${id}`);
    setStudents(students.filter((s) => s.id !== id));
  };

  
  const handleEdit = (student: Student) => {
    setEditingStudent({ ...student, password: decryptData(student.password) });
  };

  // Save update
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;

    // Encrypt password before updating
    const updatedStudent = {
      ...editingStudent,
      password: encryptData(editingStudent.password),
    };

    await axios.put(
      `http://localhost:5000/students/${editingStudent.id}`,
      updatedStudent
    );

    setStudents(
      students.map((s) => (s.id === editingStudent.id ? updatedStudent : s))
    );
    setEditingStudent(null);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">All Students</h2>

      <ul className="space-y-3 mb-6">
        {students.map((s) => (
          <li
            key={s.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>
              {s.fullName} - {s.email} - {s.course}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(s)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(s.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

     
      {editingStudent && (
        <form onSubmit={handleUpdate} className="space-y-3 border p-4 rounded">
          <h3 className="text-lg font-semibold">Edit Student</h3>
          <input
            name="fullName"
            value={editingStudent.fullName}
            onChange={(e) =>
              setEditingStudent({ ...editingStudent, fullName: e.target.value })
            }
            className="w-full border p-2 rounded"
          />
          <input
            name="email"
            value={editingStudent.email}
            onChange={(e) =>
              setEditingStudent({ ...editingStudent, email: e.target.value })
            }
            className="w-full border p-2 rounded"
          />
          <input
            name="course"
            value={editingStudent.course}
            onChange={(e) =>
              setEditingStudent({ ...editingStudent, course: e.target.value })
            }
            className="w-full border p-2 rounded"
          />
          <input
            type="password"
            name="password"
            value={editingStudent.password}
            onChange={(e) =>
              setEditingStudent({
                ...editingStudent,
                password: e.target.value,
              })
            }
            className="w-full border p-2 rounded"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditingStudent(null)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default StudentList;
