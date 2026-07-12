import { useNavigate } from "react-router-dom";

export default function TeacherDashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Create Quiz",
      description: "Create a new quiz for students.",
    },
    {
      title: "My Quizzes",
      description: "View and manage all quizzes.",
    },
    {
      title: "Student Results",
      description: "Check student scores and performance.",
    },
    {
      title: "Logout",
      description: "Sign out from your account.",
    },
  ];

  const handleOpen = (title) => {
    switch (title) {
      case "Create Quiz":
        navigate("/create-quiz");
        break;

      case "My Quizzes": 
      navigate("/my-quizzes");
      break;

      case "Student Results":
      navigate("/student-results");
      break;

      case "Logout":
        navigate("/");
        break;

      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white px-8 py-5 shadow">
        <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
        <p className="text-blue-100">
          Welcome! Manage your quizzes here.
        </p>
      </header>

      {/* Cards */}
      <div className="max-w-6xl mx-auto p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-bold text-blue-600 mb-3">
                {card.title}
              </h2>

              <p className="text-gray-600 mb-5">
                {card.description}
              </p>

              <button
                onClick={() => handleOpen(card.title)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
              >
                Open
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}