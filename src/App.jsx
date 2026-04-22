import { useState } from "react";
import Sidebar from "./components/Sidebar";
import AdvisorDashboard from "./pages/AdvisorDashboard";
import StudentPortal from "./pages/StudentPortal";
import { C } from "./styles/colors";
import { STUDENTS } from "./data/students";

export { askAI } from "./utils/ai";

export default function App() {
  const [view, setView] = useState("advisor");
  const [activeStudentId, setActiveStudentId] = useState("s5");
  const [portalStudentId, setPortalStudentId] = useState("s5");

  // ── Global question state ──────────────────────────────────
  // Initialize from static data, then manage dynamically
  const [studentData, setStudentData] = useState(
    STUDENTS.map((s) => ({
      ...s,
      questions: s.questions.map((q) => ({ ...q, advisorNote: "" })),
    }))
  );

  // Resolve a question — marks it answered, stores the final answer
  function resolveQuestion(studentId, questionId, finalAnswer, advisorNote) {
    setStudentData((prev) =>
      prev.map((s) => {
        if (s.id !== studentId) return s;
        return {
          ...s,
          questions: s.questions.map((q) => {
            if (q.id !== questionId) return q;
            return {
              ...q,
              status: "resolved",
              aiDraft: finalAnswer,
              advisorNote,
              resolvedAt: new Date().toLocaleString(),
            };
          }),
        };
      })
    );
  }

  // Update advisor note on a question
  function updateAdvisorNote(studentId, questionId, note) {
    setStudentData((prev) =>
      prev.map((s) => {
        if (s.id !== studentId) return s;
        return {
          ...s,
          questions: s.questions.map((q) => {
            if (q.id !== questionId) return q;
            return { ...q, advisorNote: note };
          }),
        };
      })
    );
  }

  if (view === "student") {
    return (
      <StudentPortal
        key={portalStudentId}
        studentId={portalStudentId}
        studentData={studentData}
        onPortalStudentChange={setPortalStudentId}
        onViewChange={setView}
      />
    );
  }

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: C.bg,
      fontFamily: "system-ui, sans-serif",
    }}>
      <Sidebar
        activeStudentId={activeStudentId}
        onSelectStudent={setActiveStudentId}
        view={view}
        onViewChange={setView}
        portalStudentId={portalStudentId}
        onPortalStudentChange={setPortalStudentId}
        studentData={studentData}
      />
      <div style={{ flex: 1, overflow: "auto" }}>
        <AdvisorDashboard
          activeStudentId={activeStudentId}
          onSelectStudent={setActiveStudentId}
          studentData={studentData}
          resolveQuestion={resolveQuestion}
          updateAdvisorNote={updateAdvisorNote}
        />
      </div>
    </div>
  );
}