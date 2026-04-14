import { ADVISORS, getAdvisorById, getRiskColor } from "../data/students";
import { C } from "../styles/colors";

const ME = ADVISORS[0];

export default function Sidebar({ activeStudentId, onSelectStudent, view, onViewChange, portalStudentId, onPortalStudentChange, studentData }) {
  const myCaseload = studentData.filter((s) => s.advisorId === ME.id);
  const otherStudents = studentData.filter((s) => s.advisorId !== ME.id);

  return (
    <div style={{
        width: 260,
        height: "100vh",
        position: "sticky",
        top: 0,
        background: C.white,
        borderRight: `1px solid ${C.gSoft}`,
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        overflow: "hidden",
    }}>

      {/* Header */}
      <div style={{
        background: C.navy,
        padding: "14px 16px",
        borderBottom: `3px solid ${C.blue}`,
        flexShrink: 0,
      }}>
        <div style={{
          fontFamily: "Georgia, serif",
          fontSize: 20,
          color: "#fff",
          lineHeight: 1.2,
          whiteSpace: "nowrap",
        }}>
          Villanova University
        </div>
        <div style={{
          fontSize: 11,
          color: C.blue,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginTop: 3,
          whiteSpace: "nowrap",
        }}>
          Advising CRM · AI Agent
        </div>
      </div>

      {/* Scrollable middle section */}
      <div style={{ flex: 1, overflowY: "auto" }}>

        {/* Logged-in advisor — only show in advisor view */}
        {view === "advisor" && (
          <div style={{
            padding: "12px 14px",
            background: C.cream,
            borderBottom: `1px solid ${C.gSoft}`,
          }}>
            <div style={{
              fontSize: 10,
              color: C.gMid,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 6,
            }}>
              Logged in as
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: C.navy,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 600,
                flexShrink: 0,
              }}>
                {ME.avatar}
              </div>
              <div style={{ overflow: "hidden" }}>
                <div style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: C.navy,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}>
                  {ME.name}
                </div>
                <div style={{
                  fontSize: 11,
                  color: C.gText,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}>
                  {ME.title}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Advisor view — caseload */}
        {view === "advisor" && (
          <>
            <div style={{ padding: "12px 12px 8px" }}>
              <div style={{
                fontSize: 12,
                fontWeight: 700,
                color: C.gMid,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}>
                My Caseload ({myCaseload.length})
              </div>

              {myCaseload.map((s) => {
                const pct = Math.round((s.totalCr / s.requiredCr) * 100);
                const riskColor = getRiskColor(s.risk, C);
                const isActive = s.id === activeStudentId;
                const hasFlag = s.flags && s.flags.length > 0;
                const isHighRisk = s.risk === "high";

                return (
                  <div
                    key={s.id}
                    onClick={() => onSelectStudent(s.id)}
                    style={{
                      padding: "10px",
                      border: `1.5px solid ${isActive ? C.navy : isHighRisk ? "#FCA5A5" : C.gSoft}`,
                      borderRadius: 8,
                      marginBottom: 6,
                      cursor: "pointer",
                      background: isActive ? "rgba(0,32,91,0.04)" : isHighRisk ? "#FFF5F5" : C.white,
                      position: "relative",
                    }}
                  >
                    {hasFlag && (
                      <div style={{
                        position: "absolute", top: 8, right: 8,
                        width: 7, height: 7, borderRadius: "50%",
                        background: C.miss,
                      }} />
                    )}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <div style={{
                        width: 30, height: 30, borderRadius: "50%",
                        background: isHighRisk ? C.miss : C.navy,
                        color: "#fff", display: "flex", alignItems: "center",
                        justifyContent: "center", fontSize: 11, fontWeight: 600, flexShrink: 0,
                      }}>
                        {s.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div style={{ overflow: "hidden" }}>
                        <div style={{
                          fontSize: 13, fontWeight: 600, color: C.navy,
                          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                        }}>
                          {s.name}
                        </div>
                        <div style={{ fontSize: 11, color: C.gText, marginTop: 1 }}>
                          {s.year} · {s.college}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                      <span style={{
                        fontSize: 10, fontWeight: 600, padding: "2px 6px", borderRadius: 4,
                        background: riskColor.bg, color: riskColor.text, textTransform: "uppercase",
                      }}>
                        {s.risk} risk
                      </span>
                      <span style={{ fontSize: 11, color: C.gText }}>{pct}%</span>
                    </div>
                    <div style={{ height: 3, background: C.gSoft, borderRadius: 2, overflow: "hidden" }}>
                      <div style={{
                        height: "100%", width: `${pct}%`,
                        background: isHighRisk ? C.miss : C.navy, borderRadius: 2,
                      }} />
                    </div>
                    {s.lastContact >= 7 && (
                      <div style={{ fontSize: 10, color: s.lastContact >= 14 ? C.miss : C.warn, marginTop: 5, fontWeight: 500 }}>
                        ⏱ {s.lastContact}d since contact
                      </div>
                    )}
                    {isHighRisk && (
                      <div style={{ marginTop: 5, fontSize: 10, fontWeight: 700, color: C.miss }}>
                        🚨 INTERVENTION NEEDED
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {otherStudents.length > 0 && (
              <div style={{ padding: "8px 12px 16px", borderTop: `1px solid ${C.gSoft}` }}>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: C.gMid,
                  letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8,
                }}>
                  Dept. Students
                </div>
                {otherStudents.map((s) => {
                  const advisor = getAdvisorById(s.advisorId);
                  const isActive = s.id === activeStudentId;
                  const isHighRisk = s.risk === "high";
                  return (
                    <div
                      key={s.id}
                      onClick={() => onSelectStudent(s.id)}
                      style={{
                        padding: "8px 10px",
                        border: `1px solid ${isActive ? C.navy : isHighRisk ? "#FCA5A5" : C.gSoft}`,
                        borderRadius: 7, marginBottom: 5, cursor: "pointer",
                        background: isActive ? C.cream : isHighRisk ? "#FFF5F5" : C.white,
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ overflow: "hidden" }}>
                          <div style={{
                            fontSize: 12, fontWeight: 500, color: C.navy,
                            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                          }}>
                            {s.name}
                          </div>
                          <div style={{ fontSize: 11, color: C.gText, marginTop: 1 }}>
                            {s.year} · {advisor?.name.split(" ").slice(-1)[0]}
                          </div>
                        </div>
                        {isHighRisk && <span style={{ fontSize: 13, flexShrink: 0 }}>🚨</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* Student view — just a spacer so switcher stays at bottom */}
        {view === "student" && (
          <div style={{ flex: 1, padding: "16px 14px" }}>
            <div style={{ fontSize: 12, color: C.gText, lineHeight: 1.6 }}>
              You are viewing the student portal. Switch to Advisor view to manage your caseload.
            </div>
          </div>
        )}
      </div>

      {/* Bottom — demo switcher (always visible) */}
      <div style={{
        padding: "12px 14px",
        borderTop: `1px solid ${C.gSoft}`,
        background: C.white,
        flexShrink: 0,
      }}>
        {/* Demo student selector — only in student view */}
        {view === "student" && (
          <div style={{ marginBottom: 10 }}>
            <div style={{
              fontSize: 10, color: C.gMid,
              textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 5,
            }}>
              Demo: viewing as
            </div>
            <select
              value={portalStudentId}
              onChange={(e) => onPortalStudentChange(e.target.value)}
              style={{
                width: "100%", fontFamily: "inherit", fontSize: 13,
                border: `1px solid ${C.gSoft}`, borderRadius: 6,
                padding: "6px 8px", color: C.navy, background: C.cream, cursor: "pointer",
              }}
            >
              {STUDENTS.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        )}

        {/* View toggle */}
        <div style={{
          display: "flex", background: C.navy,
          borderRadius: 8, padding: 3, gap: 3,
        }}>
          <button
            onClick={() => onViewChange("advisor")}
            style={{
              flex: 1, fontFamily: "inherit", cursor: "pointer", border: "none",
              padding: "8px 0", borderRadius: 6, fontSize: 13, fontWeight: 500,
              background: view === "advisor" ? C.blue : "transparent", color: "#fff",
            }}
          >
            Advisor
          </button>
          <button
            onClick={() => onViewChange("student")}
            style={{
              flex: 1, fontFamily: "inherit", cursor: "pointer", border: "none",
              padding: "8px 0", borderRadius: 6, fontSize: 13, fontWeight: 500,
              background: view === "student" ? C.blue : "transparent", color: "#fff",
            }}
          >
            Student
          </button>
        </div>
      </div>
    </div>
  );
}