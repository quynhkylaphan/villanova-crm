import { useState } from "react";
import { useCourses } from "../data/useCourses";
import { C } from "../styles/colors";

const DEPT_ORDER = [
  "MIS", "VSB", "Computer Science", "Economics",
  "Finance", "Management", "Mathematics", "Psychology",
  "Humanities", "Philosophy", "Theology", "English",
];

function OfferedBadge({ offered }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 600,
      padding: "3px 8px", borderRadius: 4,
      background: offered ? C.doneBg : C.missBg,
      color: offered ? C.done : C.miss,
      whiteSpace: "nowrap",
    }}>
      {offered ? "✓ Offered Fall 2026" : "✗ Not Fall 2026"}
    </span>
  );
}

function CourseCard({ course, isExpanded, onToggle }) {
  return (
    <div style={{
      border: `1px solid ${C.gSoft}`,
      borderRadius: 10,
      marginBottom: 8,
      overflow: "hidden",
      background: C.white,
    }}>

      {/* Header row */}
      <div
        onClick={onToggle}
        style={{
          padding: "14px 18px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          background: isExpanded ? C.cream : C.white,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
          <div style={{
            background: C.navy, color: "#fff",
            borderRadius: 6, padding: "4px 10px",
            fontSize: 13, fontWeight: 700,
            whiteSpace: "nowrap", flexShrink: 0,
          }}>
            {course.code}
          </div>
          <div style={{
            fontSize: 14, fontWeight: 500, color: C.navy,
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            {course.title}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <span style={{ fontSize: 12, color: C.gText }}>{course.credits} cr.</span>
          <OfferedBadge offered={course.offeredNextSemester} />
          <span style={{ fontSize: 12, color: C.gMid }}>{isExpanded ? "▲" : "▼"}</span>
        </div>
      </div>

      {/* Expanded detail */}
      {isExpanded && (
        <div style={{ padding: "0 18px 18px", borderTop: `1px solid ${C.gSoft}` }}>

          {/* Description */}
          <div style={{
            fontSize: 14, color: C.gDark, lineHeight: 1.7,
            marginTop: 14, marginBottom: 16,
          }}>
            {course.description}
          </div>

          {/* Three columns */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 12 }}>

            <div>
              <div style={{
                fontSize: 11, fontWeight: 700, color: C.gMid,
                textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8,
              }}>
                Prerequisites
              </div>
              {course.prerequisites && course.prerequisites !== "None" ? (
                course.prerequisites.split(",").map((p) => (
                  <span key={p} style={{
                    display: "inline-block", marginRight: 5, marginBottom: 4,
                    padding: "3px 8px", background: C.progBg,
                    borderRadius: 4, fontSize: 12, color: C.prog, fontWeight: 500,
                  }}>
                    {p.trim()}
                  </span>
                ))
              ) : (
                <span style={{ fontSize: 12, color: C.gText }}>None</span>
              )}
            </div>

            <div>
              <div style={{
                fontSize: 11, fontWeight: 700, color: C.gMid,
                textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8,
              }}>
                Typically Offered
              </div>
              <div style={{ fontSize: 13, color: C.gDark }}>
                {course.typicallyOffered || "See catalog"}
              </div>
            </div>

            <div>
              <div style={{
                fontSize: 11, fontWeight: 700, color: C.gMid,
                textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8,
              }}>
                Recent Offerings
              </div>
              <div style={{ fontSize: 12, color: C.gText, lineHeight: 1.6 }}>
                {course.lastOffered || "See catalog"}
              </div>
            </div>
          </div>

          {/* Notes */}
          {course.notes && course.notes !== "None" && (
            <div style={{
              padding: "8px 12px", marginBottom: 10,
              background: C.warnBg, border: `1px solid ${C.warnBd}`,
              borderRadius: 6, fontSize: 12, color: C.warn,
            }}>
              📌 {course.notes}
            </div>
          )}

          {/* Min GPA */}
          {course.minGPA && course.minGPA !== "None" && (
            <div style={{
              padding: "8px 12px", marginBottom: 10,
              background: C.missBg, borderRadius: 6,
              fontSize: 12, color: C.miss,
            }}>
              ⚠️ Minimum GPA required: {course.minGPA}
            </div>
          )}

{/* Catalog link */}
          {course.catalogURL && (
            <a
              href={course.catalogURL}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: 12, color: C.blue, textDecoration: "none" }}
            >
              View in Villanova Catalog
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default function CourseDatabase() {
  const { courses, loading } = useCourses();
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("ALL");
  const [filterOffered, setFilterOffered] = useState("ALL");
  const [expandedCode, setExpandedCode] = useState(null);

  if (loading) {
    return (
      <div style={{ flex: 1, padding: 26, color: C.gText, fontSize: 14 }}>
        Loading course database...
      </div>
    );
  }

  const departments = [...new Set(courses.map((c) => c.department))].sort();

  const filtered = courses.filter((c) => {
    const matchSearch = search === "" ||
      c.code?.toLowerCase().includes(search.toLowerCase()) ||
      c.title?.toLowerCase().includes(search.toLowerCase()) ||
      c.description?.toLowerCase().includes(search.toLowerCase());

    const matchDept = filterDept === "ALL" || c.department === filterDept;

    const matchOffered =
      filterOffered === "ALL" ||
      (filterOffered === "NEXT" && c.offeredNextSemester) ||
      (filterOffered === "NOT_NEXT" && !c.offeredNextSemester);

    return matchSearch && matchDept && matchOffered;
  });

  // Group by department
  const grouped = {};
  filtered.forEach((c) => {
    if (!grouped[c.department]) grouped[c.department] = [];
    grouped[c.department].push(c);
  });

  const sortedDepts = Object.keys(grouped).sort((a, b) => {
    const ai = DEPT_ORDER.indexOf(a);
    const bi = DEPT_ORDER.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  return (
    <div style={{ flex: 1, padding: 26, overflowY: "auto" }}>

      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{
          fontFamily: "Georgia, serif", fontSize: 24,
          color: C.navy, marginBottom: 4,
        }}>
          Course Database
        </div>
        <div style={{ fontSize: 13, color: C.gText }}>
          {courses.length} courses from Villanova's 2025–2026 Undergraduate Catalog.
          Source: <a href="https://live-villanova-catalog.cleancatalog.io" target="_blank" rel="noreferrer"
            style={{ color: C.blue, textDecoration: "none" }}>
            live-villanova-catalog.cleancatalog.io
          </a>
        </div>
      </div>

      {/* Filters */}
      <div style={{
        display: "flex", gap: 12, marginBottom: 20,
        flexWrap: "wrap", alignItems: "center",
      }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by code, title, or description..."
          style={{
            flex: 1, minWidth: 220,
            padding: "10px 14px", borderRadius: 8,
            border: `1px solid ${C.gSoft}`, fontFamily: "inherit",
            fontSize: 14, outline: "none", background: C.white,
          }}
        />

        <select
          value={filterDept}
          onChange={(e) => setFilterDept(e.target.value)}
          style={{
            fontFamily: "inherit", fontSize: 13,
            border: `1px solid ${C.gSoft}`, borderRadius: 8,
            padding: "10px 12px", color: C.navy,
            background: C.white, cursor: "pointer",
          }}
        >
          <option value="ALL">All Departments</option>
          {departments.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <select
          value={filterOffered}
          onChange={(e) => setFilterOffered(e.target.value)}
          style={{
            fontFamily: "inherit", fontSize: 13,
            border: `1px solid ${C.gSoft}`, borderRadius: 8,
            padding: "10px 12px", color: C.navy,
            background: C.white, cursor: "pointer",
          }}
        >
          <option value="ALL">All Semesters</option>
          <option value="NEXT">✓ Offered Fall 2026</option>
          <option value="NOT_NEXT">✗ Not offered Fall 2026</option>
        </select>

        <div style={{ fontSize: 13, color: C.gText, whiteSpace: "nowrap" }}>
          {filtered.length} course{filtered.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Results */}
      {sortedDepts.length === 0 ? (
        <div style={{ textAlign: "center", padding: 60, color: C.gText }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
          <div style={{ fontSize: 15 }}>No courses match your search.</div>
        </div>
      ) : (
        sortedDepts.map((dept) => (
          <div key={dept} style={{ marginBottom: 28 }}>
            <div style={{
              fontSize: 12, fontWeight: 700, color: C.gMid,
              textTransform: "uppercase", letterSpacing: "0.1em",
              marginBottom: 10, paddingBottom: 6,
              borderBottom: `2px solid ${C.blue}`,
            }}>
              {dept} ({grouped[dept].length})
            </div>
            {grouped[dept]
              .sort((a, b) => a.code.localeCompare(b.code))
              .map((course) => (
                <CourseCard
                  key={course.code}
                  course={course}
                  isExpanded={expandedCode === course.code}
                  onToggle={() => setExpandedCode(
                    expandedCode === course.code ? null : course.code
                  )}
                />
              ))}
          </div>
        ))
      )}
    </div>
  );
}