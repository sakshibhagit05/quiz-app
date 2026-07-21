import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import TeacherLogin from "./pages/TeacherLogin";
import TeacherDashboard from "./pages/TeacherDashboard";
import CreateQuiz from "./pages/CreateQuiz";
import StudentLogin from "./pages/StudentLogin";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import NotFound from "./pages/NotFound";
import MyQuizzes from "./pages/MyQuizzes";
import StudentResults from "./pages/StudentResults";
import ManageTopics from "./pages/ManageTopics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/dashboard" element={<TeacherDashboard />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/create-quiz/:id" element={<CreateQuiz />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/my-quizzes" element={<MyQuizzes />} />
        <Route path="/student-results" element={<StudentResults />} />
        <Route path="/manage-topics" element={<ManageTopics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;