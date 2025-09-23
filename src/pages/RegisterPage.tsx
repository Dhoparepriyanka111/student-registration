import StudentForm from "../components/StudentForm";

const RegisterPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Registration</h1>
      <StudentForm onStudentAdded={() => {}} />
    </div>
  );
};

export default RegisterPage;

