import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

function MyQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "quizzes"));
        const quizList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuizzes(quizList);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleView = (id) => {
    console.log("View quiz:", id);
  };

  const handleDelete = (id) => {
    // UI only for now — Firestore delete logic goes here later
    console.log("Delete quiz:", id);
  };

  return (
    <div className="min-h-screen bg-blue-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          My Quizzes
        </h1>

        {loading && (
          <p className="text-gray-500 text-center">Loading quizzes...</p>
        )}

        {!loading && quizzes.length === 0 && (
          <p className="text-gray-500 text-center">No quizzes found.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white rounded-2xl shadow-md border border-blue-100 p-5 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {quiz.quizTitle}
                </h2>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="font-medium text-gray-700">Subject:</span>{" "}
                    {quiz.subject}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Class:</span>{" "}
                    {quiz.className}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Quiz Code:</span>{" "}
                    {quiz.quizCode}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">
                      Total Questions:
                    </span>{" "}
                    {quiz.questions ? quiz.questions.length : 0}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => handleView(quiz.id)}
                  className="flex-1 px-4 py-2 rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition duration-200"
                >
                  View
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(quiz.id)}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyQuizzes;