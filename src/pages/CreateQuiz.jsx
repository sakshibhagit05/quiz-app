import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
 
function CreateQuiz() {
  const [quizTitle, setQuizTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [className, setClassName] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
 
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAnswer: "",
    },
  ]);
 
  const subjects = ["Mathematics",
  "English",
  "Marathi",
  "शिष्यवृत्ती मराठी",
  "शिष्यवृत्ती गणित",
  "शिष्यवृत्ती इंग्रजी",
  "शिष्यवृत्ती बुद्धिमता",
  "3री मराठी",
  "3री परिसर अभ्यास"];
  const classes = ["Class 1", "Class 2", "Class 3", "Class 4"];
 
  const handleQuestionChange = (id, field, value) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };
 
  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 1,
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "",
      },
    ]);
  };
 
  const handleRemoveQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };
 
  const handleSaveQuiz = async () => {
  try {
    const quizCode = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();

    const quizData = {
      quizCode,
      quizTitle,
      subject,
      className,
      totalMarks,
      questions,
      createdAt: new Date(),
    };

    await addDoc(collection(db, "quizzes"), quizData);

    alert(`Quiz Saved Successfully!\nQuiz Code: ${quizCode}`);

    console.log(quizData);
  } catch (error) {
    console.error(error);
    alert("Error saving quiz");
  }
};
 
  return (
    <div className="min-h-screen w-full bg-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          Create Quiz
        </h1>
 
        {/* Quiz Details Card */}
        <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-5 sm:p-6 mb-6">
          <h2 className="text-lg font-semibold text-blue-700 mb-4">
            Quiz Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quiz Title
              </label>
              <input
                type="text"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                placeholder="e.g. Mid-Term Algebra Quiz"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
 
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
              >
                <option value="">Select subject</option>
                {subjects.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
 
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Class
              </label>
              <select
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
              >
                <option value="">Select class</option>
                {classes.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
 
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Marks
              </label>
              <input
                type="number"
                min="0"
                value={totalMarks}
                onChange={(e) => setTotalMarks(e.target.value)}
                placeholder="e.g. 50"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>
        </div>
 
        {/* Question Builder */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-blue-700 mb-4">
            Question Builder
          </h2>
 
          <div className="space-y-5">
            {questions.map((q, index) => (
              <div
                key={q.id}
                className="bg-white rounded-2xl shadow-md border border-blue-100 p-5 sm:p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-blue-600 text-white text-sm font-semibold">
                    {index + 1}
                  </span>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(q.id)}
                      className="text-sm text-red-500 hover:text-red-700 font-medium"
                    >
                      Remove
                    </button>
                  )}
                </div>
 
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Question
                    </label>
                    <input
                      type="text"
                      value={q.question}
                      onChange={(e) =>
                        handleQuestionChange(q.id, "question", e.target.value)
                      }
                      placeholder="Enter question text"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>
 
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Option A
                      </label>
                      <input
                        type="text"
                        value={q.optionA}
                        onChange={(e) =>
                          handleQuestionChange(q.id, "optionA", e.target.value)
                        }
                        placeholder="Option A"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Option B
                      </label>
                      <input
                        type="text"
                        value={q.optionB}
                        onChange={(e) =>
                          handleQuestionChange(q.id, "optionB", e.target.value)
                        }
                        placeholder="Option B"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Option C
                      </label>
                      <input
                        type="text"
                        value={q.optionC}
                        onChange={(e) =>
                          handleQuestionChange(q.id, "optionC", e.target.value)
                        }
                        placeholder="Option C"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Option D
                      </label>
                      <input
                        type="text"
                        value={q.optionD}
                        onChange={(e) =>
                          handleQuestionChange(q.id, "optionD", e.target.value)
                        }
                        placeholder="Option D"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      />
                    </div>
                  </div>
 
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Correct Answer
                    </label>
                    <select
                      value={q.correctAnswer}
                      onChange={(e) =>
                        handleQuestionChange(q.id, "correctAnswer", e.target.value)
                      }
                      className="w-full sm:w-60 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                    >
                      <option value="">Select correct answer</option>
                      <option value="A">Option A</option>
                      <option value="B">Option B</option>
                      <option value="C">Option C</option>
                      <option value="D">Option D</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
 
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
          <button
            type="button"
            onClick={handleAddQuestion}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition duration-200"
          >
            + Add Question
          </button>
          <button
            type="button"
            onClick={handleSaveQuiz}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold shadow-md hover:shadow-lg transition duration-200"
          >
            Save Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
 
export default CreateQuiz;