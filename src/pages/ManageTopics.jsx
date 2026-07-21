import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

function ManageTopics() {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");

  const handleAddTopic = async () => {
    if (!subject || !topic) {
      alert("Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "topics"), {
        subject,
        topic,
      });

      alert("Topic Added Successfully");

      setTopic("");
    } catch (error) {
      console.log(error);
      alert("Failed to add topic");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-xl mx-auto bg-white shadow rounded-xl p-6">
        <h1 className="text-3xl font-bold mb-6">Manage Topics</h1>

        <select
          className="border w-full p-3 rounded mb-4"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <option value="">Select Subject</option>
          <option value="Marathi">Marathi</option>
          <option value="English">English</option>
          <option value="Math">Math</option>
          <option value="शिष्यवृत्ती मराठी">शिष्यवृत्ती मराठी</option>
          <option value="शिष्यवृत्ती गणित">शिष्यवृत्ती गणित</option>
          <option value="शिष्यवृत्ती इंग्रजी">शिष्यवृत्ती इंग्रजी</option>
          <option value="शिष्यवृत्ती बुद्धिमता">शिष्यवृत्ती बुद्धिमता</option>
          <option value="3री मराठी">3री मराठी</option>
          <option value="3री परिसर अभ्यास">3री परिसर अभ्यास</option>
        </select>

        <input
          className="border w-full p-3 rounded mb-4"
          placeholder="Enter Topic Name"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <button
          onClick={handleAddTopic}
          className="w-full bg-blue-600 text-white py-3 rounded"
        >
          Add Topic
        </button>
      </div>
    </div>
  );
}

export default ManageTopics;