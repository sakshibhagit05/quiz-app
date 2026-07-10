import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-5 bg-white shadow-md">
      <h1 className="text-2xl font-bold text-blue-600">
        QuizPortal
      </h1>

      <div className="space-x-4">
        <Link
          to="/teacher-login"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Teacher Login
        </Link>

        <Link
          to="/student-login"
          className="bg-green-600 text-white px-5 py-2 rounded-lg"
        >
          Student Login
        </Link>
      </div>
    </nav>
  );
}