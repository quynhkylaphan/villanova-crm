import { useState } from "react";
import { getAdvisorById, buildAcademicContext } from "../data/students";
import { C } from "../styles/colors";
import CourseDatabase from "./CourseDatabase";
import { askAI } from "../utils/ai";

function KPIBar({ students }) {
  const allQuestions = students.flatMap((s) => s.questions);
  const openQuestions = allQuestions.filter((q) => q.status === "pending").length;
  const highRisk = students.filter((s) => s.risk === "high").length;

  // AI Efficiency ratio
  const totalQuestions = allQuestions.length;
  const aiResolved = allQuestions.filter(
    (q) => q.status === "resolved" && q.aiConfidence === "high"
  ).length;
  const aiEscalated = allQuestions.filter(
    (q) => q.aiConfidence === "low"
  ).length;
  const advisorHandled = allQuestions.filter(
    (q) => q.status === "resolved" && q.aiConfidence !== "high"
  ).length;
  const totalResolved = allQuestions.filter((q) => q.status === "resolved").length;
  const aiEfficiencyPct = totalResolved > 0
    ? Math.round((aiResolved / totalResolved) * 100)
    : 0;

  // Students by year
  const yearCounts = { Freshman: 0, Sophomore: 0, Junior: 0, Senior: 0 };
  students.forEach((s) => { if (yearCounts[s.year] !== undefined) yearCounts[s.year]++; });

  // GPA brackets
  const gpa4 = students.filter((s) => s.gpa >= 3.7).length;
  const gpa3 = students.filter((s) => s.gpa >= 3.0 && s.gpa < 3.7).length;
  const gpa2 = students.filter((s) => s.gpa >= 2.0 && s.gpa < 3.0).length;
  const gpa1 = students.filter((s) => s.gpa < 2.0).length;

  // Registration readiness
  const ready = students.filter(
    (s) => s.risk === "low" && s.questions.filter((q) => q.status === "pending").length === 0
  ).length;

  return (
    <div style={{ marginBottom: 24 }}>
      {/* Row 1 — 4 main KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 14 }}>

        {/* Open Questions */}
        <div style={{
          background: C.white,
          border: `1px solid ${openQuestions > 0 ? "#FCA5A5" : C.gSoft}`,
          borderRadius: 10, padding: "16px 18px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: C.gText }}>Open Questions</span>
            <span style={{ fontSize: 20 }}>📬</span>
          </div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 36, color: openQuestions > 0 ? C.miss : C.navy, lineHeight: 1 }}>
            {openQuestions}
          </div>
          <div style={{ fontSize: 11, color: C.gText, marginTop: 4 }}>awaiting response</div>
        </div>

        {/* At-Risk */}
        <div style={{
          background: C.white,
          border: `1px solid ${highRisk > 0 ? "#FCA5A5" : C.gSoft}`,
          borderRadius: 10, padding: "16px 18px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: C.gText }}>At-Risk Students</span>
            <span style={{ fontSize: 20 }}>🚨</span>
          </div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 36, color: highRisk > 0 ? C.miss : C.navy, lineHeight: 1 }}>
            {highRisk}
          </div>
          <div style={{ fontSize: 11, color: C.gText, marginTop: 4 }}>need intervention</div>
        </div>

        {/* AI Efficiency */}
        <div style={{
          background: C.white,
          border: `1px solid ${C.gSoft}`,
          borderRadius: 10, padding: "16px 18px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: C.gText }}>AI Auto-Resolution</span>
            <span style={{ fontSize: 20 }}>🤖</span>
          </div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 36, color: C.navy, lineHeight: 1 }}>
            {aiEfficiencyPct}%
          </div>
          <div style={{ fontSize: 11, color: C.gText, marginTop: 4 }}>
            {aiResolved} AI-handled · {advisorHandled} advisor-handled · {aiEscalated} escalated
          </div>
          {/* Mini bar */}
          <div style={{ height: 4, background: C.gSoft, borderRadius: 2, overflow: "hidden", marginTop: 8 }}>
            <div style={{
              height: "100%",
              width: `${aiEfficiencyPct}%`,
              background: aiEfficiencyPct >= 60 ? C.done : aiEfficiencyPct >= 40 ? C.warn : C.miss,
              borderRadius: 2,
              transition: "width 0.4s ease",
            }} />
          </div>
        </div>

        {/* Registration Ready */}
        <div style={{
          background: C.white,
          border: `1px solid ${C.gSoft}`,
          borderRadius: 10, padding: "16px 18px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: C.gText }}>Registration Ready</span>
            <span style={{ fontSize: 20 }}>✅</span>
          </div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 36, color: C.navy, lineHeight: 1 }}>
            {ready}/{students.length}
          </div>
          <div style={{ fontSize: 11, color: C.gText, marginTop: 4 }}>low risk, no open questions</div>
        </div>
      </div>

      {/* Row 2 — GPA Distribution + Class Year */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

        {/* GPA Distribution */}
        <div style={{
          background: C.white, border: `1px solid ${C.gSoft}`,
          borderRadius: 10, padding: "16px 18px",
        }}>
          <div style={{ fontSize: 13, color: C.gText, marginBottom: 12, fontWeight: 500 }}>
            📈 GPA Distribution
          </div>
          {[
            { label: "3.7–4.0 (Dean's List)", count: gpa4, color: C.done, bg: C.doneBg },
            { label: "3.0–3.69 (Good Standing)", count: gpa3, color: C.prog, bg: C.progBg },
            { label: "2.0–2.99 (Satisfactory)", count: gpa2, color: C.warn, bg: C.warnBg },
            { label: "Below 2.0 (At Risk)", count: gpa1, color: C.miss, bg: C.missBg },
          ].map(({ label, count, color, bg }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 140, fontSize: 11, color: C.gText, flexShrink: 0 }}>{label}</div>
              <div style={{ flex: 1, height: 8, background: C.gSoft, borderRadius: 4, overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: students.length > 0 ? `${(count / students.length) * 100}%` : "0%",
                  background: color, borderRadius: 4,
                  transition: "width 0.3s ease",
                }} />
              </div>
              <div style={{
                width: 24, height: 24, borderRadius: "50%",
                background: bg, color,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, flexShrink: 0,
              }}>
                {count}
              </div>
            </div>
          ))}
        </div>

        {/* Class Year Breakdown */}
        <div style={{
          background: C.white, border: `1px solid ${C.gSoft}`,
          borderRadius: 10, padding: "16px 18px",
        }}>
          <div style={{ fontSize: 13, color: C.gText, marginBottom: 12, fontWeight: 500 }}>
            🎓 Students by Class Year
          </div>
          {Object.entries(yearCounts).map(([year, count]) => (
            <div key={year} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 80, fontSize: 11, color: C.gText, flexShrink: 0 }}>{year}</div>
              <div style={{ flex: 1, height: 8, background: C.gSoft, borderRadius: 4, overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: students.length > 0 ? `${(count / students.length) * 100}%` : "0%",
                  background: C.navy, borderRadius: 4,
                  transition: "width 0.3s ease",
                }} />
              </div>
              <div style={{
                width: 24, height: 24, borderRadius: "50%",
                background: "rgba(0,32,91,0.08)", color: C.navy,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, flexShrink: 0,
              }}>
                {count}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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

function QuestionCard({ question: q, studentId, resolveQuestion, updateAdvisorNote }) {
  const [editedAnswer, setEditedAnswer] = useState(q.aiDraft);
  const [note, setNote] = useState(q.advisorNote || "");
  const [sending, setSending] = useState(false);

  async function handleApprove() {
    setSending(true);
    // Simulate brief processing delay
    await new Promise((r) => setTimeout(r, 800));
    resolveQuestion(studentId, q.id, editedAnswer, note);
    updateAdvisorNote(studentId, q.id, note);
    setSending(false);
  }

  if (q.status === "resolved") {
    return (
      <div style={{
        border: `1px solid ${C.doneBd}`,
        borderRadius: 10, marginBottom: 16, overflow: "hidden",
      }}>
        <div style={{
          padding: "12px 18px", background: C.doneBg,
          borderBottom: `1px solid ${C.doneBd}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontSize: 12, color: C.gText }}>{q.submittedAt}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {q.resolvedAt && (
              <span style={{ fontSize: 11, color: C.gText }}>
                Sent {q.resolvedAt}
              </span>
            )}
            <span style={{
              fontSize: 12, fontWeight: 600, padding: "3px 10px",
              borderRadius: 4, background: C.doneBg, color: C.done,
            }}>
              ✓ Sent to Student
            </span>
          </div>
        </div>
        <div style={{ padding: "14px 18px" }}>
          <div style={{ fontSize: 15, color: C.navy, fontWeight: 600, marginBottom: 10 }}>
            {q.text}
          </div>
          <div style={{ fontSize: 14, color: C.gDark, lineHeight: 1.7 }}>
            {q.aiDraft}
          </div>
          {q.advisorNote && (
            <div style={{
              marginTop: 12, padding: "8px 12px",
              background: C.cream, borderLeft: `3px solid ${C.navy}`,
              borderRadius: 4, fontSize: 12, color: C.gText,
            }}>
              📝 Private note: {q.advisorNote}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      border: `1px solid ${C.gSoft}`,
      borderRadius: 10, marginBottom: 16, overflow: "hidden",
    }}>
      <div style={{
        padding: "14px 18px", background: C.cream,
        borderBottom: `1px solid ${C.gSoft}`,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: C.gText }}>{q.submittedAt}</span>
          <span style={{
            fontSize: 12, fontWeight: 500, padding: "3px 10px", borderRadius: 4,
            background: q.aiConfidence === "high" ? C.doneBg : q.aiConfidence === "medium" ? C.warnBg : C.missBg,
            color: q.aiConfidence === "high" ? C.done : q.aiConfidence === "medium" ? C.warn : C.miss,
          }}>
            AI Confidence: {q.aiConfidence.toUpperCase()}
          </span>
        </div>
        <div style={{ fontSize: 15, color: C.navy, fontWeight: 600, marginTop: 8 }}>
          {q.text}
        </div>
      </div>

      <div style={{ padding: "16px 18px" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.gMid, marginBottom: 8 }}>
          AI DRAFT ANSWER
          <span style={{ fontSize: 11, fontWeight: 400, color: C.gText, marginLeft: 8 }}>
            (edit before sending if needed)
          </span>
        </div>
        <textarea
          value={editedAnswer}
          onChange={(e) => setEditedAnswer(e.target.value)}
          rows={4}
          style={{
            width: "100%", padding: "10px 12px", borderRadius: 8,
            border: `1px solid ${C.gSoft}`, fontFamily: "inherit",
            fontSize: 13, color: C.gDark, background: C.white,
            resize: "vertical", outline: "none", boxSizing: "border-box",
            marginBottom: 10, lineHeight: 1.6,
          }}
        />

        <div style={{ fontSize: 12, fontWeight: 700, color: C.gMid, marginBottom: 6 }}>
          PRIVATE ADVISOR NOTE
          <span style={{ fontSize: 11, fontWeight: 400, color: C.gText, marginLeft: 8 }}>
            (not sent to student — logged to record only)
          </span>
        </div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add an internal note for this student's record..."
          rows={2}
          style={{
            width: "100%", padding: "10px 12px", borderRadius: 8,
            border: `1px solid ${C.gSoft}`, fontFamily: "inherit",
            fontSize: 13, color: C.gDark, background: C.cream,
            resize: "none", outline: "none", boxSizing: "border-box",
            marginBottom: 12,
          }}
        />

        {q.status === "resolved" ? (
          <div style={{
            padding: "10px 16px", borderRadius: 8,
            background: C.doneBg, border: `1px solid ${C.doneBd}`,
            fontSize: 14, color: C.done, fontWeight: 500,
          }}>
            ✓ Answer sent to student and logged to their record.
          </div>
        ) : (
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button
              onClick={handleApprove}
              disabled={sending}
              style={{
                fontFamily: "inherit", cursor: sending ? "wait" : "pointer",
                border: "none",
                background: sending ? C.gMid : C.navy,
                color: "#fff", borderRadius: 8,
                padding: "10px 24px", fontSize: 14, fontWeight: 500,
              }}
            >
              {sending ? "Sending..." : "✓ Approve & Send to Student"}
            </button>
            <span style={{ fontSize: 12, color: C.gText }}>
              Student will receive this answer automatically.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function StudentRecord({ student, resolveQuestion, updateAdvisorNote }) {
  const advisor = getAdvisorById(student.advisorId);
  const pct = Math.round((student.totalCr / student.requiredCr) * 100);
  const [activeTab, setActiveTab] = useState("overview");
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);

  const tabs = ["overview", "questions", "AI assistant"];

  async function sendChat() {
    if (!chatInput.trim() || chatLoading) return;
    const msg = chatInput.trim();
    setChatInput("");
    setChatMessages((prev) => [...prev, { role: "user", text: msg }]);
    setChatLoading(true);

    const academicContext = buildAcademicContext(student);

    const systemPrompt = `You are an AI assistant for Villanova University academic advisors.
You are helping ${advisor?.name} with questions about their student ${student.name}.

STUDENT RECORD:
- Name: ${student.name}
- Year: ${student.year}
- College: ${student.college}
- Major: ${student.major}
- Programs: ${student.programs.join(", ")}
- Overall GPA: ${student.gpa}
- Major GPA: ${student.majorGpa > 0 ? student.majorGpa : "N/A"}
- Credits: ${student.totalCr} of ${student.requiredCr} completed
- Risk level: ${student.risk}
- Completed courses: ${student.completedCourses.join(", ")}
- Currently enrolled: ${student.inProgress.join(", ")}
- Active flags: ${student.flags.join("; ")}

REAL VILLANOVA CATALOG DATA:
${academicContext}

RESPONSE RULES:
- Use ONLY course codes that appear in the student record or catalog data above — never invent course numbers
- When referencing missing courses, cite the specific section requirement from the catalog data
- Keep responses under 6 lines total
- Use bullet points ONLY for lists of 3 or more items — otherwise write in 1-2 sentences
- Use **bold** for course codes and key terms
- Answer directly — no preamble like "based on the record"
- If unsure about a specific policy detail, say so in one sentence`;

    try {
      const reply = await askAI(systemPrompt, msg);
      setChatMessages((prev) => [...prev, { role: "ai", text: reply }]);
    } catch (e) {
      setChatMessages((prev) => [...prev, { role: "ai", text: "Error: " + e.message }]);
    }
    setChatLoading(false);
  }

  return (
    <div style={{
      background: C.white,
      borderRadius: 12,
      border: `1px solid ${C.gSoft}`,
      overflow: "hidden",
    }}>

      {/* Student header */}
      <div style={{ background: C.navy, padding: "22px 26px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 28, color: "#fff", lineHeight: 1.2 }}>
              {student.name}
            </div>
            <div style={{ fontSize: 15, color: C.blue, marginTop: 4 }}>
              {student.major}
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", marginTop: 4 }}>
              {student.year} · {student.college} · Advisor: {advisor?.name}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 40, color: "#fff", lineHeight: 1 }}>
              {student.gpa.toFixed(2)}
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>
              Overall GPA
            </div>
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.85)" }}>Degree progress</span>
            <span style={{ fontSize: 12, color: C.blue }}>
              {student.totalCr}/{student.requiredCr} credits · {pct}%
            </span>
          </div>
          <div style={{ height: 5, background: "rgba(255,255,255,0.15)", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: C.blue, borderRadius: 3 }} />
          </div>
        </div>

        {student.flags.length > 0 && (
          <div style={{
            marginTop: 14,
            background: "rgba(254,226,226,0.15)",
            border: "1px solid rgba(252,165,165,0.3)",
            borderRadius: 8,
            padding: "10px 14px",
          }}>
            <div style={{ fontSize: 11, color: "#FCA5A5", fontWeight: 700, marginBottom: 6 }}>
              ⚠️ ACTIVE FLAGS
            </div>
            {student.flags.map((f, i) => (
              <div key={i} style={{ fontSize: 13, color: "rgba(255,255,255,0.95)", lineHeight: 1.6 }}>
                • {f}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: `1px solid ${C.gSoft}`, background: C.cream }}>
        {tabs.map((t) => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            fontFamily: "inherit",
            cursor: "pointer",
            border: "none",
            padding: "14px 22px",
            fontSize: 14,
            fontWeight: 500,
            textTransform: "capitalize",
            background: activeTab === t ? C.white : "transparent",
            color: activeTab === t ? C.navy : C.gText,
            borderBottom: activeTab === t ? `2px solid ${C.navy}` : "2px solid transparent",
          }}>
            {t}
          </button>
        ))}
      </div>

      {/* Overview tab */}
      {activeTab === "overview" && (
        <div style={{ padding: 26 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div>
              <div style={{
                fontSize: 12, fontWeight: 700, color: C.gMid,
                textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12,
              }}>
                Currently Enrolled
              </div>
              {student.inProgress.map((c) => (
                <div key={c} style={{
                  padding: "10px 14px", background: C.progBg,
                  borderRadius: 8, marginBottom: 8,
                  fontSize: 14, color: C.prog, fontWeight: 500,
                }}>
                  {c}
                </div>
              ))}
            </div>
            <div>
              <div style={{
                fontSize: 12, fontWeight: 700, color: C.gMid,
                textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12,
              }}>
                Quick Stats
              </div>
              {[
                ["Last Advisor Contact", student.lastContact + " days ago"],
                ["Risk Level", student.risk.toUpperCase()],
                ["Major GPA", student.majorGpa > 0 ? student.majorGpa.toFixed(2) : "N/A"],
                ["Active Flags", student.flags.length],
                ["Open Questions", student.questions.filter((q) => q.status === "pending").length],
              ].map(([label, value]) => (
                <div key={label} style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "10px 0", borderBottom: `1px solid ${C.gSoft}`, fontSize: 14,
                }}>
                  <span style={{ color: C.gText }}>{label}</span>
                  <span style={{ color: C.navy, fontWeight: 600 }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Questions tab */}
      {activeTab === "questions" && (
        <div style={{ padding: 26 }}>
          {student.questions.length === 0 ? (
            <div style={{ textAlign: "center", padding: 48, color: C.gText, fontSize: 15 }}>
              No questions submitted yet.
            </div>
          ) : (
            student.questions.map((q) => (
              <QuestionCard
                key={q.id + q.status}
                question={q}
                studentId={student.id}
                resolveQuestion={resolveQuestion}
                updateAdvisorNote={updateAdvisorNote}
              />
            ))
          )}
        </div>
      )}

      {/* AI Assistant tab */}
      {activeTab === "AI assistant" && (
        <div style={{ padding: 26 }}>
          <div style={{ fontSize: 14, color: C.gText, marginBottom: 16 }}>
            Ask anything about {student.name}'s degree, requirements, or flags.
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
            {[
              "Is this student on track to graduate?",
              "What required courses are still missing?",
              "Summarize the active flags",
              "What should they enroll in next semester?",
            ].map((q) => (
              <button key={q} onClick={() => setChatInput(q)} style={{
                fontFamily: "inherit", cursor: "pointer", fontSize: 13,
                padding: "7px 14px", borderRadius: 16,
                border: `1px solid ${C.gSoft}`,
                background: C.cream, color: C.navy,
              }}>
                {q}
              </button>
            ))}
          </div>

          <div style={{ minHeight: 160, marginBottom: 16 }}>
            {chatMessages.map((m, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                marginBottom: 12,
              }}>
                <div style={{
                  maxWidth: "80%", padding: "12px 16px", borderRadius: 12,
                  fontSize: 14, lineHeight: 1.6,
                  background: m.role === "user" ? C.navy : C.white,
                  color: m.role === "user" ? "#fff" : C.gDark,
                  border: m.role === "ai" ? `1px solid ${C.gSoft}` : "none",
                }}>
                  {renderMessage(m.text)}
                </div>
              </div>
            ))}
            {chatLoading && (
              <div style={{ fontSize: 13, color: C.gMid, fontStyle: "italic" }}>
                AI is thinking...
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") sendChat(); }}
              placeholder="Ask about this student..."
              style={{
                flex: 1, padding: "11px 16px", borderRadius: 8,
                border: `1px solid ${C.gSoft}`, fontFamily: "inherit",
                fontSize: 14, outline: "none", background: C.cream,
              }}
            />
            <button onClick={sendChat} disabled={chatLoading} style={{
              fontFamily: "inherit", cursor: "pointer", border: "none",
              background: chatLoading ? C.gMid : C.navy, color: "#fff",
              borderRadius: 8, padding: "11px 22px", fontSize: 14, fontWeight: 500,
            }}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function generateAlerts(students) {
  const alerts = [];
  students.forEach((s) => {
    if (s.lastContact >= 14) {
      alerts.push({
        id: "stale-" + s.id,
        type: "warning",
        icon: "⏰",
        priority: "high",
        student: s,
        title: "No advisor contact in " + s.lastContact + " days",
        action: "Reach out and schedule a check-in",
      });
    }
    if (s.risk === "high") {
      alerts.push({
        id: "risk-" + s.id,
        type: "danger",
        icon: "🚨",
        priority: "critical",
        student: s,
        title: "High off-track risk detected",
        action: "Intervention meeting required",
      });
    }
    if (s.questions.some((q) => q.status === "pending")) {
      alerts.push({
        id: "q-" + s.id,
        type: "info",
        icon: "📬",
        priority: "medium",
        student: s,
        title: "Pending question awaiting advisor review",
        action: "Review and respond in Questions tab",
      });
    }
  });
  const order = { critical: 0, high: 1, medium: 2 };
  return alerts.sort((a, b) => order[a.priority] - order[b.priority]);
}

function AlertsPanel({ students, onSelectStudent, dismissedAlerts, setDismissedAlerts }) {
  const active = generateAlerts(students).filter((a) => !dismissedAlerts.includes(a.id));
  const dismissed = generateAlerts(students).filter((a) => dismissedAlerts.includes(a.id));

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontFamily: "Georgia, serif", fontSize: 22, color: C.navy, marginBottom: 4 }}>
        Agent Alerts
      </div>
      <div style={{ fontSize: 13, color: C.gText, marginBottom: 16 }}>
        The AI agent monitors all student records continuously and surfaces issues automatically — no manual checking needed.
      </div>

      {active.length === 0 ? (
        <div style={{
          background: C.doneBg, border: `1px solid ${C.doneBd}`,
          borderRadius: 10, padding: 32, textAlign: "center",
        }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>✅</div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 18, color: C.done }}>
            All clear
          </div>
          <div style={{ fontSize: 13, color: C.gText, marginTop: 4 }}>
            Agent is monitoring {students.length} student accounts.
          </div>
        </div>
      ) : (
        <>
          <div style={{
            background: "rgba(254,226,226,0.4)",
            border: "1px solid #FCA5A5",
            borderRadius: 8, padding: "10px 14px", marginBottom: 14,
            fontSize: 13, color: C.miss,
          }}>
            🤖 AI Agent detected <strong>{active.length} issue{active.length > 1 ? "s" : ""}</strong> across your caseload. Review and act below.
          </div>

          {active.map((alert) => (
            <div key={alert.id} style={{
              background: C.white,
              border: `1.5px solid ${alert.type === "danger" ? "#FCA5A5" : alert.type === "warning" ? C.warnBd : C.gSoft}`,
              borderRadius: 10, padding: 16, marginBottom: 10,
            }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ fontSize: 24, flexShrink: 0 }}>{alert.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 6, marginBottom: 4 }}>
                    <div>
                      <span
                        style={{ fontSize: 15, fontWeight: 600, color: C.navy, cursor: "pointer" }}
                        onClick={() => onSelectStudent(alert.student.id)}
                      >
                        {alert.student.name}
                      </span>
                      <span style={{ fontSize: 13, color: C.gText }}> — {alert.title}</span>
                    </div>
                    <span style={{
                      fontSize: 11, fontWeight: 500, padding: "2px 8px", borderRadius: 4,
                      background: alert.priority === "critical" ? C.missBg : alert.priority === "high" ? C.warnBg : C.progBg,
                      color: alert.priority === "critical" ? C.miss : alert.priority === "high" ? C.warn : C.prog,
                    }}>
                      {alert.priority.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: C.gText, marginBottom: 10 }}>
                    Recommended: <strong>{alert.action}</strong>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => onSelectStudent(alert.student.id)}
                      style={{
                        fontFamily: "inherit", cursor: "pointer", border: "none",
                        background: C.navy, color: "#fff", borderRadius: 6,
                        padding: "6px 14px", fontSize: 13, fontWeight: 500,
                      }}
                    >
                      Open Student Record
                    </button>
                    <button
                      onClick={() => setDismissedAlerts((d) => [...d, alert.id])}
                      style={{
                        fontFamily: "inherit", cursor: "pointer",
                        border: `1px solid ${C.gSoft}`, background: C.cream,
                        color: C.gText, borderRadius: 6, padding: "6px 14px", fontSize: 13,
                      }}
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}

      {dismissed.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: C.gMid,
            textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8,
          }}>
            Dismissed ({dismissed.length})
          </div>
          {dismissed.map((alert) => (
            <div key={alert.id} style={{
              background: C.cream, border: `1px solid ${C.gSoft}`,
              borderRadius: 8, padding: "9px 13px", marginBottom: 5,
              opacity: 0.65, display: "flex", gap: 10, alignItems: "center",
            }}>
              <span>✅</span>
              <div style={{ flex: 1, fontSize: 13, color: C.gText }}>
                <strong>{alert.student.name}</strong> — {alert.title}
              </div>
              <button
                onClick={() => setDismissedAlerts((d) => d.filter((x) => x !== alert.id))}
                style={{
                  fontFamily: "inherit", cursor: "pointer",
                  border: "none", background: "none", fontSize: 12, color: C.gText,
                }}
              >
                Restore
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdvisorDashboard({ activeStudentId, onSelectStudent, studentData, resolveQuestion, updateAdvisorNote }) {
  const student = studentData.find((s) => s.id === activeStudentId);
  const [dashTab, setDashTab] = useState("student");
  const [dismissedAlerts, setDismissedAlerts] = useState([]);
  const alertCount = generateAlerts(studentData).filter((a) => !dismissedAlerts.includes(a.id)).length;

  return (
    <div style={{ flex: 1, padding: 26, overflowY: "auto" }}>
      <KPIBar students={studentData} />

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[
          ["student", "Student Record"],
          ["alerts", `Agent Alerts${alertCount > 0 ? ` (${alertCount})` : ""}`],
          ["courses", "Course Database"],
        ].map(([t, l]) => (
          <button key={t} onClick={() => setDashTab(t)} style={{
            fontFamily: "inherit", cursor: "pointer",
            border: `1px solid ${dashTab === t ? C.navy : C.gSoft}`,
            borderRadius: 8, padding: "8px 18px", fontSize: 14, fontWeight: 500,
            background: dashTab === t ? C.navy : C.white,
            color: dashTab === t ? "#fff" : C.gText,
          }}>
            {l}
          </button>
        ))}
      </div>

      {dashTab === "student" && (
        student ? (
          <StudentRecord
            student={student}
            resolveQuestion={resolveQuestion}
            updateAdvisorNote={updateAdvisorNote}
          />
        ) : (
          <div style={{ color: C.gText, fontSize: 15 }}>
            Select a student from the sidebar.
          </div>
        )
      )}

      {dashTab === "alerts" && (
        <AlertsPanel
          students={studentData}
          onSelectStudent={(id) => { onSelectStudent(id); setDashTab("student"); }}
          dismissedAlerts={dismissedAlerts}
          setDismissedAlerts={setDismissedAlerts}
        />
      )}

      {dashTab === "courses" && <CourseDatabase />}
    </div>
  );
}