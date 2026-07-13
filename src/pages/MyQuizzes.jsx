import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";

function MyQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "quizzes"));

      const quizList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setQuizzes(quizList);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (id) => {
    console.log("View Quiz:", id);
    // You can create a View page later
  };

  const handleEdit = (id) => {
    navigate(`/create-quiz/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this quiz?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "quizzes", id));

      setQuizzes(quizzes.filter((quiz) => quiz.id !== id));

      alert("Quiz Deleted Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete quiz");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          My Quizzes
        </h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : quizzes.length === 0 ? (
          <p className="text-center">No Quiz Found</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white rounded-xl shadow-md p-5"
              >
                <h2 className="text-xl font-bold mb-3">
                  {quiz.quizTitle}
                </h2>

                <p>
                  <b>Subject:</b> {quiz.subject}
                </p>

                <p>
                  <b>Class:</b> {quiz.className}
                </p>

                <p>
                  <b>Quiz Code:</b> {quiz.quizCode}
                </p>

                <p>
                  <b>Total Questions:</b>{" "}
                  {quiz.questions?.length || 0}
                </p>

                <div className="flex gap-2 mt-5">

                  <button
                    onClick={() => handleEdit(quiz.id)}
                    className="flex-1 bg-yellow-500 text-white rounded-lg py-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleView(quiz.id)}
                    className="flex-1 border-2 border-blue-600 text-blue-600 rounded-lg py-2 hover:bg-blue-50"
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleDelete(quiz.id)}
                    className="flex-1 bg-red-500 text-white rounded-lg py-2 hover:bg-red-600"
                  >
                    Delete
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}

export default MyQuizzes;