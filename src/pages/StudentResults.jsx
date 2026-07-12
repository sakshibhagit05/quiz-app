import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

function StudentResults() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "results"));

      const resultData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setResults(resultData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this result?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "results", id));

      setResults((prev) =>
        prev.filter((result) => result.id !== id)
      );

      alert("Result Deleted Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete result");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Student Results
      </h1>

      <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
        <table className="w-full border border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border p-3">Student Name</th>
              <th className="border p-3">Subject</th>
              <th className="border p-3">Score</th>
              <th className="border p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {results.length === 0 ? (
              <tr>
                <td className="border p-3 text-center" colSpan="4">
                  No Results Yet
                </td>
              </tr>
            ) : (
              results.map((result) => (
                <tr key={result.id}>
                  <td className="border p-3 text-center">
                    {result.studentName}
                  </td>

                  <td className="border p-3 text-center">
                    {result.subject}
                  </td>

                  <td className="border p-3 text-center">
                    {result.score} / {result.total}
                  </td>

                  <td className="border p-3 text-center">
                    <button
                      onClick={() => handleDelete(result.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentResults;