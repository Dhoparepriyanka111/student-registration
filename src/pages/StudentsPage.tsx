import StudentList from "../components/StudentList";

const StudentsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Students</h1>
      <StudentList />
    </div>
  );
};

export default StudentsPage;
