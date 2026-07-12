import { useNavigate, useLocation } from "react-router-dom";

function Result() {
  const navigate = useNavigate();
  const location = useLocation();

  const score = location.state?.score || 0;
  const total = location.state?.total || 0;

  const questions = location.state?.questions || [];
  const answers = location.state?.answers || {};

  const getCorrectAnswer = (question) => {
    switch (question.correctAnswer) {
      case "A":
        return question.optionA;
      case "B":
        return question.optionB;
      case "C":
        return question.optionC;
      case "D":
        return question.optionD;
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">

        <h1 className="text-3xl font-bold text-center text-blue-700">
          🎉 Quiz Completed
        </h1>

        <h2 className="text-center text-2xl font-bold mt-4">
          Score : {score} / {total}
        </h2>

        <hr className="my-6" />

        <h2 className="text-xl font-bold mb-4">
          Review Answers
        </h2>

        {questions.map((question, index) => {

          const correctAnswer = getCorrectAnswer(question);

          const studentAnswer = answers[index];

          const isCorrect = studentAnswer === correctAnswer;

          return (

            <div
              key={index}
              className="border rounded-lg p-4 mb-5 shadow-sm"
            >

              <h3 className="font-semibold mb-3">
                Q{index + 1}. {question.question}
              </h3>

              <p>
                <strong>Your Answer : </strong>

                <span
                  className={
                    isCorrect
                      ? "text-green-600 font-bold"
                      : "text-red-600 font-bold"
                  }
                >
                  {studentAnswer || "Not Answered"}
                </span>

              </p>

              <p className="text-green-700 font-semibold mt-2">
                Correct Answer : {correctAnswer}
              </p>

              <p
                className={
                  isCorrect
                    ? "text-green-600 font-bold mt-2"
                    : "text-red-600 font-bold mt-2"
                }
              >
                {isCorrect ? "✔ Correct" : "✘ Wrong"}
              </p>

            </div>

          );
        })}

        <div className="flex gap-4 mt-6">

          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
          >
            Home
          </button>

          <button
            onClick={() => navigate("/student-login")}
            className="flex-1 bg-green-600 text-white py-2 rounded-lg"
          >
            Try Again
          </button>

        </div>

      </div>

    </div>
  );
}

export default Result;