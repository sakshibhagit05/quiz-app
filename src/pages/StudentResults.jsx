import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

function StudentResults() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "results"));

        const resultData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log(resultData);

        setResults(resultData);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, []);

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
            </tr>
          </thead>

          <tbody>
            {results.length === 0 ? (
              <tr>
                <td className="border p-3 text-center" colSpan="3">
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