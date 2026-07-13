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

          if (data.questions && data.questions.length > 0) {
            setQuestions(data.questions);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadQuiz();
  }, [id]);

  const generateQuizCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
  const updatedQuestions = [
    ...questions,
    {
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAnswer: "A",
    },
  ];

  setQuestions(updatedQuestions);
  setTotalMarks(updatedQuestions.length);
};

  const removeQuestion = async (index) => {
  const updated = [...questions];
  updated.splice(index, 1);

  setQuestions(updated);

  // Firestore update (Edit mode मध्ये)
  if (id) {
    try {
      await updateDoc(doc(db, "quizzes", id), {
        questions: updated,
      });

      alert("Question Deleted Successfully");
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  }
};

  const handleSaveQuiz = async () => {
    if (
      !quizTitle ||
      !subject ||
      !className ||
      !totalMarks
    ) {
      alert("Fill all quiz details");
      return;
    }

    for (let q of questions) {
      if (
        !q.question ||
        !q.optionA ||
        !q.optionB ||
        !q.optionC ||
        !q.optionD
      ) {
        alert("Please fill all questions");
        return;
      }
    }

    try {
      const quizData = {
        quizTitle,
        subject,
        className,
        totalMarks,
        questions,
      };

      if (id) {
        await updateDoc(doc(db, "quizzes", id), quizData);

        alert("Quiz Updated Successfully");

        navigate("/my-quizzes");
      } else {
        await addDoc(collection(db, "quizzes"), {
          ...quizData,
          quizCode: generateQuizCode(),
          createdAt: new Date(),
        });

        alert("Quiz Created Successfully");

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
      console.error(error);
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

          <h2 className="text-blue-600 font-semibold mb-4">
            Quiz Details
          </h2>

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
              <option value="English">English</option>
<option value="Marathi">Marathi</option>
<option value="Math">Math</option>
<option value="Science">Science</option>
            </select>

            <select
              className="border p-3 rounded"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            >
              <option value="">Select Class</option>
              <option value="Class 1">Class 1</option>
<option value="Class 2">Class 2</option>
<option value="Class 3">Class 3</option>
<option value="Class 4">Class 4</option>
            </select>

          </div>

          <input
 className="border w-full mt-4 p-3 rounded"
 placeholder="Total Marks"
 type="number"
 value={questions.length}
 readOnly
/>

        </div>

        {questions.map((q, index) => (

          <div
            key={index}
            className="bg-white rounded-xl shadow p-6 mt-6"
          >

            <div className="flex justify-between items-center mb-4">

              <h2 className="text-blue-600 font-semibold">
                Question {index + 1}
              </h2>

              {questions.length > 1 && (
  <button
    type="button"
    onClick={() => removeQuestion(index)}
    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
  >
    Delete Question
  </button>
)}

            </div>

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
              className="border mt-4 p-3 rounded w-full"
              value={q.correctAnswer}
              onChange={(e) =>
                handleQuestionChange(index, "correctAnswer", e.target.value)
              }
            >
              <option value="A">Correct Answer : Option A</option>
              <option value="B">Correct Answer : Option B</option>
              <option value="C">Correct Answer : Option C</option>
              <option value="D">Correct Answer : Option D</option>
            </select>

          </div>

        ))}
                <div className="flex justify-between mt-6">

          <button
            onClick={addQuestion}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            + Add Question
          </button>

          <button
            onClick={handleSaveQuiz}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
          >
            {id ? "Update Quiz" : "Save Quiz"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default CreateQuiz;