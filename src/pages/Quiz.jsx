import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedSubject = location.state?.subject;
  const studentName = location.state?.studentName;
  const selectedTopic = location.state?.topic;

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const snapshot = await getDocs(collection(db, "quizzes"));

        const quizzes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const foundQuiz = quizzes.find(
  (q) =>
    q.subject === selectedSubject &&
    q.topic === selectedTopic
);

        setQuiz(foundQuiz || null);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [selectedSubject]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2>Loading Quiz...</h2>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2>No Quiz Found</h2>
      </div>
    );
  }

  const questions = quiz.questions || [];
  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (option) => {
    setAnswers({
      ...answers,
      [currentIndex]: option,
    });
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSubmit = async () => {
    let score = 0;

    questions.forEach((question, index) => {
      let correctAnswer = "";

      switch (question.correctAnswer) {
        case "A":
          correctAnswer = question.optionA;
          break;
        case "B":
          correctAnswer = question.optionB;
          break;
        case "C":
          correctAnswer = question.optionC;
          break;
        case "D":
          correctAnswer = question.optionD;
          break;
        default:
          correctAnswer = "";
      }

      if (answers[index] === correctAnswer) {
        score++;
      }
    });

    try {
      await addDoc(collection(db, "results"), {
        studentName: studentName || "Unknown",
        subject: selectedSubject,
        quizTitle: quiz.quizTitle,
        score,
        total: questions.length,
        submittedAt: new Date(),
      });

      console.log("Result Saved Successfully");

      navigate("/result", {
        state: {
          score,
          total: questions.length,
          questions,
          answers,
        },
      });
    } catch (error) {
      console.error(error);
      alert("Failed to save result");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex justify-center items-center px-4 py-8">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6">

        <h1 className="text-2xl font-bold text-center text-blue-700 mb-2">
          {quiz.quizTitle}
        </h1>

        <p className="text-center text-gray-500 mb-6">
          {selectedSubject}
        </p>

        <h2 className="text-lg font-semibold mb-2">
          Question {currentIndex + 1} of {questions.length}
        </h2>

        <p className="mb-5">
          {currentQuestion.question}
        </p>

        <div className="space-y-3">
          {[
            currentQuestion.optionA,
            currentQuestion.optionB,
            currentQuestion.optionC,
            currentQuestion.optionD,
          ].map((option, index) => (
            <label
              key={index}
              className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer hover:bg-blue-50"
            >
              <input
                type="radio"
                name={`question-${currentIndex}`}
                checked={answers[currentIndex] === option}
                onChange={() => handleSelectOption(option)}
              />

              {option}
            </label>
          ))}
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>

          {currentIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Next
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

export default Quiz;