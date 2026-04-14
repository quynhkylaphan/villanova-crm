import { useState } from "react";
import { getStudentById, getAdvisorById, STUDENTS, buildAcademicContext } from "../data/students";
import { C } from "../styles/colors";
import { askAI } from "../App";

function renderMessage(text) {
  return (
    <span dangerouslySetInnerHTML={{
      __html: text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/^- (.+)/gm, "<li style='margin:2px 0'>$1</li>")
        .replace(/(<li.*?<\/li>)/gs, "<ul style='padding-left:16px;margin:6px 0'>$1</ul>")
        .replace(/\n\n/g, "<br/><br/>")
        .replace(/\n/g, "<br/>")
    }} />
  );
}

export default function StudentPortal({ studentId, studentData, onPortalStudentChange, onViewChange }) {
  const student = studentData
    ? studentData.find((s) => s.id === studentId)
    : getStudentById(studentId);
  const advisor = getAdvisorById(student?.advisorId);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: `Hi ${student?.name.split(" ")[0]}! 👋 I'm your Villanova advising assistant. I can help you with course registration questions, degree requirements, and scheduling appointments with your advisor. What would you like to know?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("chat");

  if (!student) return <div>Student not found.</div>;

  const pct = Math.round((student.totalCr / student.requiredCr) * 100);
  const academicContext = buildAcademicContext(student);

  const systemPrompt = `You are an AI advising assistant for Villanova University helping ${student.name}.

STUDENT RECORD:
- Name: ${student.name}
- Year: ${student.year}
- College: ${student.college}
- Major: ${student.major}
- Programs: ${student.programs.join(", ")}
- Overall GPA: ${student.gpa}
- Credits completed: ${student.totalCr} of ${student.requiredCr}
- Currently enrolled: ${student.inProgress.join(", ")}
- Completed courses: ${student.completedCourses.join(", ")}
- Active flags: ${student.flags.join("; ")}
- Assigned advisor: ${advisor?.name} at ${advisor?.location}, email: ${advisor?.email}

REAL VILLANOVA CATALOG DATA:
${academicContext}

RESPONSE RULES:
- Use ONLY course codes that appear in the student record or catalog data above — never invent course numbers
- When referencing missing courses, use the real section names from the catalog data
- Keep responses under 6 lines total
- Use bullet points ONLY for lists of 3 or more distinct items — otherwise write in 1-2 warm sentences
- Use **bold** for course codes and key terms
- Be warm and encouraging — this is a student, not an advisor
- For exceptions, waivers, or anything requiring judgment: one sentence saying you will escalate to ${advisor?.name}
- Never make binding academic decisions`;

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const msg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setLoading(true);
    try {
      const reply = await askAI(systemPrompt, msg);
      setMessages((prev) => [...prev, { role: "ai", text: reply }]);
    } catch (e) {
      setMessages((prev) => [...prev, { role: "ai", text: "Sorry, I'm having trouble connecting. Please try again." }]);
    }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "system-ui, sans-serif" }}>

      {/* Top bar */}
      <div style={{
        background: C.navy,
        padding: "0 28px",
        borderBottom: `3px solid ${C.blue}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 60,
        flexShrink: 0,
      }}>
        <div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 18, color: "#fff" }}>
            Villanova University
          </div>
          <div style={{ fontSize: 11, color: C.blue, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Student Advising Portal
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: C.blue, color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 600,
          }}>
            {student.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <div style={{ fontSize: 14, color: "#fff", fontWeight: 500 }}>{student.name}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{student.year} · {student.college}</div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", height: "calc(100vh - 60px)" }}>

        {/* Left panel */}
        <div style={{
          background: C.white,
          borderRight: `1px solid ${C.gSoft}`,
          padding: 20,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}>

          {/* Degree progress */}
          <div style={{
            background: C.navy, borderRadius: 10,
            padding: "16px 18px", marginBottom: 16, flexShrink: 0,
          }}>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 4 }}>
              Degree Progress
            </div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 32, color: "#fff", lineHeight: 1 }}>
              {pct}%
            </div>
            <div style={{ fontSize: 12, color: C.blue, marginTop: 2, marginBottom: 10 }}>
              {student.totalCr} of {student.requiredCr} credits
            </div>
            <div style={{ height: 6, background: "rgba(255,255,255,0.15)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: C.blue, borderRadius: 3 }} />
            </div>
          </div>

          {/* Quick stats */}
          <div style={{ marginBottom: 16, flexShrink: 0 }}>
            {[
              ["Major", student.major],
              ["Overall GPA", student.gpa.toFixed(2)],
              ["Year", student.year],
              ["Advisor", advisor?.name],
              ["Office", advisor?.location],
              ["Email", advisor?.email],
            ].map(([label, value]) => (
              <div key={label} style={{
                display: "flex", flexDirection: "column",
                padding: "8px 0", borderBottom: `1px solid ${C.gSoft}`,
              }}>
                <span style={{ fontSize: 11, color: C.gMid, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {label}
                </span>
                <span style={{ fontSize: 13, color: C.gDark, marginTop: 2, fontWeight: 500 }}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Currently enrolled */}
          <div style={{ flexShrink: 0, marginBottom: 16 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: C.gMid,
              textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8,
            }}>
              Currently Enrolled
            </div>
            {student.inProgress.map((c) => (
              <div key={c} style={{
                padding: "8px 12px", background: C.progBg,
                borderRadius: 6, marginBottom: 6,
                fontSize: 13, color: C.prog, fontWeight: 500,
              }}>
                {c}
              </div>
            ))}
          </div>

          {/* Advisor notes */}
          {student.flags.length > 0 && (
            <div style={{ flexShrink: 0, marginBottom: 16 }}>
              <div style={{
                fontSize: 11, fontWeight: 700, color: C.gMid,
                textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8,
              }}>
                Advisor Notes
              </div>
              {student.flags.map((f, i) => (
                <div key={i} style={{
                  padding: "8px 12px", background: C.warnBg,
                  border: `1px solid ${C.warnBd}`, borderRadius: 6, marginBottom: 6,
                  fontSize: 12, color: C.warn, lineHeight: 1.5,
                }}>
                  ⚠️ {f}
                </div>
              ))}
            </div>
          )}

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* View switcher */}
          <div style={{ paddingTop: 16, borderTop: `1px solid ${C.gSoft}`, flexShrink: 0 }}>
            <div style={{ marginBottom: 10 }}>
              <div style={{
                fontSize: 10, color: C.gMid,
                textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 5,
              }}>
                Demo: viewing as
              </div>
              <select
                value={studentId}
                onChange={(e) => onPortalStudentChange(e.target.value)}
                style={{
                  width: "100%", fontFamily: "inherit", fontSize: 13,
                  border: `1px solid ${C.gSoft}`, borderRadius: 6,
                  padding: "6px 8px", color: C.navy,
                  background: C.cream, cursor: "pointer",
                }}
              >
                {STUDENTS.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div style={{
              display: "flex", background: C.navy,
              borderRadius: 8, padding: 3, gap: 3,
            }}>
              <button
                onClick={() => onViewChange("advisor")}
                style={{
                  flex: 1, fontFamily: "inherit", cursor: "pointer", border: "none",
                  padding: "8px 0", borderRadius: 6, fontSize: 13, fontWeight: 500,
                  background: C.cream, color: C.navy,
                }}
              >
                Advisor
              </button>
              <button
                onClick={() => onViewChange("student")}
                style={{
                  flex: 1, fontFamily: "inherit", cursor: "pointer", border: "none",
                  padding: "8px 0", borderRadius: 6, fontSize: 13, fontWeight: 500,
                  background: C.blue, color: "#fff",
                }}
              >
                Student
              </button>
            </div>
          </div>
        </div>

        {/* Right panel — chat */}
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>

          {/* Tab bar */}
          <div style={{
            display: "flex", borderBottom: `1px solid ${C.gSoft}`,
            background: C.white, padding: "0 20px", flexShrink: 0,
          }}>
            {["chat", "my questions"].map((t) => (
              <button key={t} onClick={() => setTab(t)} style={{
                fontFamily: "inherit", cursor: "pointer", border: "none",
                padding: "14px 20px", fontSize: 14, fontWeight: 500,
                textTransform: "capitalize", background: "transparent",
                color: tab === t ? C.navy : C.gText,
                borderBottom: tab === t ? `2px solid ${C.navy}` : "2px solid transparent",
              }}>
                {t}
              </button>
            ))}
          </div>

          {/* Chat tab */}
          {tab === "chat" && (
            <>
              <div style={{
                flex: 1, overflowY: "auto", padding: "20px 24px",
                display: "flex", flexDirection: "column", gap: 12,
              }}>
                {messages.length === 1 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                    {[
                      "What courses do I still need?",
                      "Am I on track to graduate?",
                      "What should I enroll in next semester?",
                      "Schedule an appointment with my advisor",
                    ].map((q) => (
                      <button key={q} onClick={() => setInput(q)} style={{
                        fontFamily: "inherit", cursor: "pointer", fontSize: 13,
                        padding: "8px 14px", borderRadius: 16,
                        border: `1px solid ${C.gSoft}`,
                        background: C.white, color: C.navy,
                      }}>
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                {messages.map((m, i) => (
                  <div key={i} style={{
                    display: "flex",
                    justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                  }}>
                    <div style={{
                      maxWidth: "75%", padding: "12px 16px",
                      borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                      fontSize: 14, lineHeight: 1.6,
                      background: m.role === "user" ? C.navy : C.white,
                      color: m.role === "user" ? "#fff" : C.gDark,
                      border: m.role === "ai" ? `1px solid ${C.gSoft}` : "none",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                    }}>
                      {renderMessage(m.text)}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div style={{ display: "flex", gap: 6, alignItems: "center", padding: "4px 0" }}>
                    {[0, 1, 2].map((i) => (
                      <div key={i} style={{
                        width: 8, height: 8, borderRadius: "50%", background: C.gMid,
                        animation: `bounce 1.2s ease-in-out ${i * 150}ms infinite`,
                      }} />
                    ))}
                  </div>
                )}
              </div>

              <div style={{
                padding: "14px 24px 20px", background: C.white,
                borderTop: `1px solid ${C.gSoft}`, flexShrink: 0,
              }}>
                <div style={{ display: "flex", gap: 10 }}>
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
                    placeholder="Ask about your courses, requirements, or schedule a meeting..."
                    style={{
                      flex: 1, padding: "12px 16px", borderRadius: 24,
                      border: `1.5px solid ${C.gSoft}`, fontFamily: "inherit",
                      fontSize: 14, outline: "none", background: C.cream,
                    }}
                  />
                  <button onClick={sendMessage} disabled={loading} style={{
                    fontFamily: "inherit", cursor: "pointer", border: "none",
                    background: loading ? C.gMid : C.navy, color: "#fff",
                    borderRadius: 24, padding: "12px 24px",
                    fontSize: 14, fontWeight: 500,
                  }}>
                    Send
                  </button>
                </div>
              </div>
            </>
          )}

          {/* My Questions tab */}
          {tab === "my questions" && (
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
              {student.questions.length === 0 ? (
                <div style={{ textAlign: "center", padding: 60, color: C.gText, fontSize: 15 }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>💬</div>
                  <div style={{ fontWeight: 500, marginBottom: 6 }}>No questions yet</div>
                  <div style={{ fontSize: 13 }}>
                    Use the chat to ask a question. Complex questions will be reviewed by {advisor?.name}.
                  </div>
                </div>
              ) : (
                student.questions.map((q) => (
                  <div key={q.id} style={{
                    background: C.white, border: `1px solid ${C.gSoft}`,
                    borderRadius: 10, marginBottom: 14, overflow: "hidden",
                  }}>
                    <div style={{
                      padding: "12px 16px", background: C.cream,
                      borderBottom: `1px solid ${C.gSoft}`,
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                    }}>
                      <span style={{ fontSize: 12, color: C.gText }}>{q.submittedAt}</span>
                      <span style={{
                        fontSize: 11, fontWeight: 500, padding: "3px 10px", borderRadius: 12,
                        background: q.status === "resolved" ? C.doneBg : C.warnBg,
                        color: q.status === "resolved" ? C.done : C.warn,
                      }}>
                        {q.status === "resolved" ? "✓ Answered" : "⏳ Pending advisor review"}
                      </span>
                    </div>
                    <div style={{ padding: "14px 16px" }}>
                      <div style={{ fontSize: 14, color: C.navy, fontWeight: 500, marginBottom: 10 }}>
                        {q.text}
                      </div>
                      {q.status === "resolved" && q.aiDraft && (
                        <div style={{
                          fontSize: 13, color: C.gDark, lineHeight: 1.6,
                          padding: "10px 14px", background: C.cream,
                          borderRadius: 8, borderLeft: `3px solid ${C.blue}`,
                        }}>
                          {q.aiDraft}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}