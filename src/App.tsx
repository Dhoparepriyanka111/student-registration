import { Routes, Route, Link } from "react-router-dom";
import StudentForm from "./components/StudentForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Students from "./components/Students";
import LoginForm from "./components/LoginForm";





function App() {
  return (
    <>
      <nav className="p-4 bg-gray-200 flex gap-4">
        <Link to="/login">Login</Link>
         <Link to="/students/add">Register</Link>
        <Link to="/students">Students</Link>
        
        
      </nav>

      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<StudentForm />} />

        {/* ✅ Protected Students Route */}
      <Route
    path="/students/add"
    element={
      <ProtectedRoute>
        <StudentForm />
      </ProtectedRoute>
    }
  />

  {/* Edit Student */}
  <Route
    path="/students/edit/:id"
    element={
      <ProtectedRoute>
        <StudentForm />
      </ProtectedRoute>
    }
  />

  {/* Students list */}
  <Route
    path="/students"
    element={
      <ProtectedRoute>
        <Students />
      </ProtectedRoute>
    }
  />

  {/* Default redirect */}
  <Route path="*" element={<LoginForm />} />
</Routes>
    </>
  );
}


export default App;
