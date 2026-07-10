import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedSubject = location.state?.subject;

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "quizzes"));
        const allQuizzes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const matchedQuiz = allQuizzes.find(
          (q) => q.subject === selectedSubject
        );

        setQuiz(matchedQuiz || null);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [selectedSubject]);

  const questions = quiz?.questions || [];
  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex === questions.length - 1;
  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (option) => {
    setAnswers({ ...answers, [currentIndex]: option });
  };

  const handlePrevious = () => {
    if (!isFirstQuestion) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (!isLastQuestion) setCurrentIndex(currentIndex + 1);
  };

  const handleSubmit = () => {
    console.log("Answers:", answers);
    navigate("/result");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4 py-8">
        <p className="text-gray-500">Loading quiz...</p>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            No Quiz Available
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-blue-700 text-center mb-6">
          {quiz.quizTitle}
        </h1>

        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Question {currentIndex + 1}:
        </h2>
        <p className="text-gray-700 mb-4">{currentQuestion.question}</p>

        <div className="space-y-3 mb-6">
          {[
            currentQuestion.optionA,
            currentQuestion.optionB,
            currentQuestion.optionC,
            currentQuestion.optionD,
          ].map((option, index) => (
            <label
              key={index}
              className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer hover:bg-blue-50"
            >
              <input
                type="radio"
                name={`question-${currentIndex}`}
                checked={answers[currentIndex] === option}
                onChange={() => handleSelectOption(option)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-800">{option}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={isFirstQuestion}
            className={`px-4 py-2 rounded-lg font-medium ${
              isFirstQuestion
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white border border-blue-600 text-blue-600 hover:bg-blue-50"
            }`}
          >
            Previous
          </button>

          {!isLastQuestion ? (
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700"
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;