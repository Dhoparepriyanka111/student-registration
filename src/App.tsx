import { Routes, Route, Link } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

function App() {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="flex gap-4 p-4 bg-gray-200">
        <Link to="/">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/students">Students</Link>
      </nav>

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<StudentForm />} />
        <Route path="/students" element={<StudentList />} />
      </Routes>
    </div>
  );
}

export default App;
