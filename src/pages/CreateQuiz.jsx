import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

function CreateQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quizTitle, setQuizTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [className, setClassName] = useState("");
  const [totalMarks, setTotalMarks] = useState("");

  const [questions, setQuestions] = useState([
    {
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAnswer: "A",
    },
  ]);

  // Load existing quiz data if editing (id exists)
  useEffect(() => {
    if (!id) return;

    const loadQuiz = async () => {
      try {
        const quizRef = doc(db, "quizzes", id);
        const quizSnap = await getDoc(quizRef);

        if (quizSnap.exists()) {
          const data = quizSnap.data();
          setQuizTitle(data.quizTitle || "");
          setSubject(data.subject || "");
          setClassName(data.className || "");
          setTotalMarks(data.totalMarks || "");
          setQuestions(data.questions || []);
        }
      } catch (error) {
        console.error("Error loading quiz:", error);
      }
    };

    loadQuiz();
  }, [id]);

  const generateQuizCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "A",
      },
    ]);
  };

  const handleSaveQuiz = async () => {
    // 1. Validation
    if (!quizTitle || !subject || !className || !totalMarks) {
      alert("Fill all quiz details");
      return;
    }

    for (let q of questions) {
      if (!q.question || !q.optionA || !q.optionB || !q.optionC || !q.optionD) {
        alert("Please fill every question");
        return;
      }
    }

    // 2. Database Operation (Update if editing, Add if creating new)
    try {
      const quizData = {
        quizTitle,
        subject,
        className,
        totalMarks,
        questions,
      };

      if (id) {
        // Edit Mode: Update existing document
        const quizRef = doc(db, "quizzes", id);
        await updateDoc(quizRef, quizData);
        alert("Quiz Updated Successfully");
        navigate("/quizzes"); // Optional: Navigate back to quiz list after update
      } else {
        // Create Mode: Add a completely new document
        await addDoc(collection(db, "quizzes"), {
          ...quizData,
          quizCode: generateQuizCode(),
          createdAt: new Date(),
        });
        alert("Quiz Saved Successfully");

        // Reset fields after successful creation
        setQuizTitle("");
        setSubject("");
        setClassName("");
        setTotalMarks("");
        setQuestions([
          {
            question: "",
            optionA: "",
            optionB: "",
            optionC: "",
            optionD: "",
            correctAnswer: "A",
          },
        ]);
      }
    } catch (error) {
      console.error("Error saving quiz:", error);
      alert("Error Saving Quiz");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-5">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          {id ? "Edit Quiz" : "Create Quiz"}
        </h1>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-blue-600 font-semibold mb-4">Quiz Details</h2>

          <input
            className="border w-full p-3 rounded mb-4"
            placeholder="Quiz Title"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <select
              className="border p-3 rounded"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="">Select Subject</option>
              <option>English</option>
              <option>Marathi</option>
              <option>Math</option>
              <option>Science</option>
            </select>

            <select
              className="border p-3 rounded"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            >
              <option value="">Select Class</option>
              <option>Class 1</option>
              <option>Class 2</option>
              <option>Class 3</option>
              <option>Class 4</option>
            </select>
          </div>

          <input
            className="border w-1/2 mt-4 p-3 rounded"
            placeholder="Total Marks"
            type="number"
            value={totalMarks}
            onChange={(e) => setTotalMarks(e.target.value)}
          />
        </div>

        {questions.map((q, index) => (
          <div key={index} className="bg-white rounded-xl shadow p-6 mt-6">
            <h2 className="text-blue-600 font-semibold mb-4">
              Question {index + 1}
            </h2>

            <input
              className="border w-full p-3 rounded mb-4"
              placeholder="Question"
              value={q.question}
              onChange={(e) =>
                handleQuestionChange(index, "question", e.target.value)
              }
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                className="border p-3 rounded"
                placeholder="Option A"
                value={q.optionA}
                onChange={(e) =>
                  handleQuestionChange(index, "optionA", e.target.value)
                }
              />

              <input
                className="border p-3 rounded"
                placeholder="Option B"
                value={q.optionB}
                onChange={(e) =>
                  handleQuestionChange(index, "optionB", e.target.value)
                }
              />

              <input
                className="border p-3 rounded"
                placeholder="Option C"
                value={q.optionC}
                onChange={(e) =>
                  handleQuestionChange(index, "optionC", e.target.value)
                }
              />

              <input
                className="border p-3 rounded"
                placeholder="Option D"
                value={q.optionD}
                onChange={(e) =>
                  handleQuestionChange(index, "optionD", e.target.value)
                }
              />
            </div>

            <select
              className="border mt-4 p-3 rounded"
              value={q.correctAnswer}
              onChange={(e) =>
                handleQuestionChange(index, "correctAnswer", e.target.value)
              }
            >
              <option value="A">Option A</option>
              <option value="B">Option B</option>
              <option value="C">Option C</option>
              <option value="D">Option D</option>
            </select>
          </div>
        ))}

        <div className="flex justify-between mt-6">
          <button
            onClick={addQuestion}
            className="bg-blue-500 text-white px-5 py-2 rounded"
          >
            + Add Question
          </button>

          <button
            onClick={handleSaveQuiz}
            className="bg-green-600 text-white px-5 py-2 rounded"
          >
            Save Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateQuiz;