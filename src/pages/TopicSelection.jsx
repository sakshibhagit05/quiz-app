import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

function TopicSelection() {
  const location = useLocation();
  const navigate = useNavigate();

  const { studentName, subject } = location.state;

  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const snapshot = await getDocs(collection(db, "quizzes"));

      const quizzes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const subjectTopics = quizzes.filter(
        (q) => q.subject === subject
      );

      setTopics(subjectTopics);
    };

    fetchTopics();
  }, [subject]);

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        {subject} Topics
      </h1>

      <div className="max-w-xl mx-auto space-y-4">
        {topics.map((quiz) => (
          <button
            key={quiz.id}
            onClick={() =>
              navigate("/quiz", {
                state: {
                  studentName,
                  subject,
                  topic: quiz.topic,
                },
              })
            }
            className="w-full bg-white shadow rounded-lg p-4 text-left hover:bg-blue-100"
          >
            {quiz.topic}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TopicSelection;