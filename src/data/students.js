import { getCourseFromCSV, ALL_COURSES } from "./useCourses";
import { getMissingCourses, meetsPrerequisites, getDoubleDipPolicy, COURSES } from "./villanova_db";

export const ADVISORS = [
  {
    id: "a1",
    name: "Dr. Patricia Walsh",
    title: "Senior Academic Advisor",
    college: "VSB",
    avatar: "PW",
    location: "Bartley 1054",
    email: "p.walsh@villanova.edu",
    phone: "(610) 519-5532",
  },
  {
    id: "a2",
    name: "Mr. James Callahan",
    title: "Academic Advisor",
    college: "VSB",
    avatar: "JC",
    location: "Bartley 1056",
    email: "j.callahan@villanova.edu",
    phone: "(610) 519-5532",
  },
  {
    id: "a3",
    name: "Dr. Maria Santos",
    title: "CLAS Academic Advisor",
    college: "CLAS",
    avatar: "MS",
    location: "SAC 110",
    email: "m.santos@villanova.edu",
    phone: "(610) 519-4600",
  },
  {
    id: "a4",
    name: "Ms. Rachel Kim",
    title: "CLAS Academic Advisor",
    college: "CLAS",
    avatar: "RK",
    location: "SAC 112",
    email: "r.kim@villanova.edu",
    phone: "(610) 519-4600",
  },
];

export const STUDENTS = [
  {
    id: "s1",
    name: "Alex Nguyen",
    year: "Senior",
    college: "VSB",
    major: "MIS + Business Analytics Co-Major + AIML Minor",
    programs: ["MIS_PRIMARY", "AIML_MINOR"],
    gpa: 3.83,
    majorGpa: 3.93,
    totalCr: 121,
    requiredCr: 125,
    advisorId: "a1",
    lastContact: 2,
    risk: "low",
    flags: [
      "Double-dip confirmation needed: MIS 3300 counts for MIS electives AND AIML Minor — requires written approval from MIS Department Chair (Bartley 3019) before registration",
    ],
    completedCourses: [
      // VSB Business Core
      "VSB 1015", "VSB 2004", "VSB 2006", "VSB 2007", "VSB 2008",
      "VSB 2009", "VSB 2014", "VSB 2020", "VSB 3008", "VSB 4002",
      // Economics
      "ECO 1001", "ECO 1002", "ECO 3108",
      // Math
      "MAT 1500", "STAT 1430",
      // MIS Foundation
      "MIS 2020", "MIS 2030", "MIS 2040",
      // MIS Electives
      "MIS 3060", "MIS 3070", "MIS 3020", "MIS 3300",
      // Management
      "MGT 3170", "MGT 4170",
      // Liberal Arts Core
      "ACS 1000", "ACS 1001", "ETH 2050", "PHI 1000", "THL 1000",
    ],
    inProgress: ["MIS 3050", "MIS 3080", "MGT 3600"],
    questions: [
      {
        id: "q1",
        text: "Can MIS 3300 double-dip for both my MIS major electives and the AIML Minor?",
        status: "pending",
        submittedAt: "2026-04-05 09:12",
        aiDraft: "Based on Villanova's VSB policy, MIS 3300 (AI & Machine Learning for Business) appears on both the MIS major elective list and the AIML Minor requirements. A double-dip between a major and minor is generally not permitted — the only exception is sharing between a major and co-major. However, the MIS Department has a specific written approval process for this case. Alex should submit a double-dip request to the MIS Department Chair at Bartley Hall 3019, (610) 519-4340, before registering. Until written approval is received, MIS 3300 should be counted toward only one requirement.",
        aiConfidence: "medium",
        advisorNote: "",
      },
    ],
  },
  {
    id: "s2",
    name: "Marcus Thompson",
    year: "Junior",
    college: "VSB",
    major: "Finance + Business Analytics Co-Major + Business Law Minor",
    programs: ["FIN_PRIMARY", "BUSINESS_LAW_MINOR"],
    gpa: 3.50,
    majorGpa: 3.40,
    totalCr: 68,
    requiredCr: 125,
    advisorId: "a2",
    lastContact: 9,
    risk: "medium",
    flags: [
      "3 Finance electives not yet chosen — must select from approved FIN elective list before senior year registration",
      "BUSA elective double-dip limit: verify with advisor before approving any course sharing between Finance major and Business Analytics co-major",
    ],
    completedCourses: [
      // VSB Business Core (partial — junior)
      "VSB 1015", "VSB 2004", "VSB 2006", "VSB 2007", "VSB 2008",
      "VSB 2009", "VSB 2014", "VSB 2020",
      // Economics
      "ECO 1001", "ECO 1002",
      // Math
      "MAT 1500", "STAT 1430",
      // Finance Major
      "FIN 2114", "FIN 2227",
      // Management
      "MGT 3170",
      // Liberal Arts Core
      "ACS 1000", "ACS 1001", "ETH 2050", "PHI 1000", "THL 1000",
    ],
    inProgress: ["FIN 2323", "MGT 4170", "VSB 3000"],
    questions: [],
  },
  {
    id: "s3",
    name: "Sofia Chen",
    year: "Junior",
    college: "CLAS",
    major: "Computer Science + Academic Year Business Minor",
    programs: ["CS_PRIMARY", "BUSINESS_MINOR_AY"],
    gpa: 3.80,
    majorGpa: 3.85,
    totalCr: 79,
    requiredCr: 122,
    advisorId: "a3",
    lastContact: 18,
    risk: "high",
    flags: [
      "No advisor contact in 18 days — registration opens in 12 days",
      "Academic Year Business Minor GPA eligibility at risk: minimum 3.9 GPA required, current GPA is 3.8. Must raise GPA before minor can be officially declared.",
      "Missing CLAS core: Fine Arts requirement (1 course from AAH 1101, AAH 1102, or any HIS) and 2 UNITAS/DIV courses not yet completed",
    ],
    completedCourses: [
      // CSC Major
      "CSC 1051", "CSC 1052", "CSC 1300", "CSC 1700",
      "CSC 1800", "CSC 2053", "CSC 2300", "CSC 2400", "CSC 2405",
      // Math
      "MAT 1500", "MAT 2400",
      // Liberal Arts Core
      "ACS 1000", "ACS 1001", "ETH 2050", "PHI 1000", "THL 1000",
      // Business Minor (partial)
      "ECO 1001", "ECO 1002", "VSB 1015", "VSB 2004",
    ],
    inProgress: ["CSC 4170", "CSC 4480", "PHI 2180", "VSB 2009"],
    questions: [
      {
        id: "q2",
        text: "What courses do I still need to complete for the Academic Year Business Minor?",
        status: "pending",
        submittedAt: "2026-04-06 10:30",
        aiDraft: "Based on Villanova's Academic Year Business Minor requirements, Sofia has completed ECO 1001, ECO 1002, VSB 1015, and VSB 2004. She is currently enrolled in VSB 2009 (Principles of Finance). After completing VSB 2009, she will still need VSB 2006 (Introduction to MIS) and VSB 2020 (Competitive Effectiveness, 6 credits) to complete the 30-credit minor. Important caveat: the Academic Year Business Minor requires a minimum GPA of 3.9. Sofia's current GPA is 3.8, which falls below this threshold. She should discuss GPA eligibility and her plan to raise her GPA with Dr. Santos before registering for additional minor courses.",
        aiConfidence: "high",
        advisorNote: "",
      },
    ],
  },
  {
    id: "s4",
    name: "Jordan Rivera",
    year: "Freshman",
    college: "CLAS",
    major: "Psychology",
    programs: ["PSY_PRIMARY"],
    gpa: 3.75,
    majorGpa: 0,
    totalCr: 16,
    requiredCr: 120,
    advisorId: "a4",
    lastContact: 5,
    risk: "low",
    flags: [
      "PSY 2100 (Research Methods) and PSY 2110 (Statistics for Psychology) should be completed next semester — both are prerequisites for ALL upper-division PSY courses and should not be delayed beyond sophomore fall",
    ],
    completedCourses: [
      "ACS 1000", "THL 1000", "PHI 1000",
    ],
    inProgress: ["ACS 1001", "ENG 1000", "PSY 1000"],
    questions: [],
  },
  {
    id: "s5",
    name: "Emily Park",
    year: "Sophomore",
    college: "VSB",
    major: "MIS + Finance Co-Major",
    programs: ["MIS_PRIMARY", "FIN_PRIMARY"],
    gpa: 3.65,
    majorGpa: 3.70,
    totalCr: 42,
    requiredCr: 125,
    advisorId: "a1",
    lastContact: 6,
    risk: "low",
    flags: [
      "Must complete MIS 2020, 2030, or 2040 before registering for any 3000-level MIS course",
    ],
    completedCourses: [
      "VSB 1015", "VSB 2004", "VSB 2006", "VSB 2007",
      "ECO 1001", "ECO 1002", "MAT 1500", "STAT 1430",
      "ACS 1000", "ACS 1001", "ETH 2050", "PHI 1000", "THL 1000",
    ],
    inProgress: ["VSB 2008", "VSB 2009", "VSB 2014", "MIS 2020"],
    questions: [
      {
        id: "q3",
        text: "Can I take MIS 3050 next semester if I finish MIS 2020 this semester?",
        status: "pending",
        submittedAt: "2026-04-08 11:20",
        aiDraft: "Yes — MIS 3050 (CRM and Data Analytics) requires VSB 2006, VSB 2020, and VSB 2009. You will have completed MIS 2020 by end of this semester, but VSB 2020 and VSB 2009 are also required prerequisites. Check your completion of those before registering. Note: MIS 3050 is Spring only, so the next available section is Spring 2027.",
        aiConfidence: "high",
        advisorNote: "",
      },
      {
        id: "q4",
        text: "What is the difference between MIS 3060 and MIS 3300?",
        status: "resolved",
        submittedAt: "2026-04-07 09:45",
        aiDraft: "MIS 3060 (Business Intelligence & Performance Management) focuses on data warehousing, OLAP, and dashboards for organizational performance tracking. MIS 3300 (AI & Machine Learning for Business) focuses on AI/ML applications including NLP, deep learning, and ethical AI in business contexts. MIS 3300 also counts toward the AIML Minor. Both are offered Fall and Spring.",
        aiConfidence: "high",
        advisorNote: "",
      },
    ],
  },
  {
    id: "s6",
    name: "Daniel Kim",
    year: "Senior",
    college: "CLAS",
    major: "Computer Science",
    programs: ["CS_PRIMARY"],
    gpa: 3.45,
    majorGpa: 3.50,
    totalCr: 108,
    requiredCr: 122,
    advisorId: "a3",
    lastContact: 3,
    risk: "low",
    flags: [
      "Missing 2 CSC major electives — must select from CMJE attribute courses before graduation",
      "Natural Science lab requirement: 1 of 2 courses still needed",
    ],
    completedCourses: [
      "CSC 1051", "CSC 1052", "CSC 1300", "CSC 1700",
      "CSC 1800", "CSC 2053", "CSC 2300", "CSC 2400",
      "CSC 2405", "CSC 4480", "CSC 4700",
      "MAT 1500", "MAT 2400",
      "ACS 1000", "ACS 1001", "ETH 2050", "PHI 1000", "THL 1000", "ENG 1000",
    ],
    inProgress: ["CSC 4170", "CSC 2053"],
    questions: [
      {
        id: "q5",
        text: "Does CSC 4480 count as one of my major electives?",
        status: "resolved",
        submittedAt: "2026-04-06 14:00",
        aiDraft: "No — CSC 4480 (Principles of Database Systems) is a required course in the CSC major, not an elective. Major electives must have the CMJE attribute. You still need 2 electives from the approved CMJE course list. Speak with Dr. Joyce in Mendel 161 or check the catalog for the current CMJE course list.",
        aiConfidence: "high",
        advisorNote: "",
      },
      {
        id: "q6",
        text: "Can I waive the Natural Science lab requirement given my CS background?",
        status: "pending",
        submittedAt: "2026-04-08 16:30",
        aiDraft: "Waivers for core requirements require formal petition and departmental approval. This question requires advisor judgment — I am escalating to Dr. Santos for review.",
        aiConfidence: "low",
        advisorNote: "",
      },
    ],
  },
  {
    id: "s7",
    name: "Priya Nair",
    year: "Junior",
    college: "VSB",
    major: "Finance + Business Law Minor",
    programs: ["FIN_PRIMARY", "BUSINESS_LAW_MINOR"],
    gpa: 3.90,
    majorGpa: 3.95,
    totalCr: 74,
    requiredCr: 125,
    advisorId: "a2",
    lastContact: 11,
    risk: "low",
    flags: [
      "Dean's List standing — eligible for VSB Honors consideration",
      "Finance elective selection: 3 electives must be chosen from approved FIN list before senior registration",
    ],
    completedCourses: [
      "VSB 1015", "VSB 2004", "VSB 2006", "VSB 2007", "VSB 2008",
      "VSB 2009", "VSB 2014", "VSB 2020",
      "ECO 1001", "ECO 1002",
      "MAT 1500", "STAT 1430",
      "FIN 2114", "FIN 2227",
      "MGT 3170", "MGT 3600",
      "ACS 1000", "ACS 1001", "ETH 2050", "PHI 1000", "THL 1000",
    ],
    inProgress: ["FIN 2323", "ECO 3108", "VSB 3000"],
    questions: [
      {
        id: "q7",
        text: "What are the prerequisites for VSB 4002?",
        status: "resolved",
        submittedAt: "2026-04-07 10:15",
        aiDraft: "VSB 4002 (Strategic Thinking & Implementation) requires VSB 2020 and VSB 3008. You have completed VSB 2020. You still need VSB 3008 (Operations & Supply Chain Management), which requires VSB 2008 — which you have completed. Plan to take VSB 3008 in Fall 2026 and VSB 4002 in Spring 2027 as your senior capstone.",
        aiConfidence: "high",
        advisorNote: "",
      },
      {
        id: "q8",
        text: "I want to add a second minor in MIS — what courses do I need?",
        status: "resolved",
        submittedAt: "2026-04-06 13:00",
        aiDraft: "The MIS Minor requires VSB 2006 (which you have completed) plus 3 additional MIS courses from the elective list (MIS 3010, 3020, 3030, 3040, 3050, 3060, 3070, 3080, 3090, or 3300). You would need to complete 3 of those electives. All require VSB 2006 as a prerequisite, which you have. This is a manageable addition to your Finance major — discuss with Mr. Callahan to plan the course sequence.",
        aiConfidence: "high",
        advisorNote: "",
      },
      {
        id: "q9",
        text: "Can I take both FIN 2323 and VSB 3008 next semester?",
        status: "pending",
        submittedAt: "2026-04-09 08:00",
        aiDraft: "Yes — FIN 2323 requires FIN 2114 and FIN 2227 (both completed), and VSB 3008 requires VSB 2008 (completed). There are no conflicts between these two courses based on your record. Taking both in the same semester is feasible and would keep you on track for senior year.",
        aiConfidence: "high",
        advisorNote: "",
      },
    ],
  },
];

// ─── BASIC GETTERS ──────────────────────────────────────────

export function getStudentById(id) {
  return STUDENTS.find((s) => s.id === id);
}

export function getAdvisorById(id) {
  return ADVISORS.find((a) => a.id === id);
}

export function getStudentsByAdvisor(advisorId) {
  return STUDENTS.filter((s) => s.advisorId === advisorId);
}

export function getRiskColor(risk, C) {
  if (risk === "high") return { bg: C.missBg, text: C.miss };
  if (risk === "medium") return { bg: C.warnBg, text: C.warn };
  return { bg: C.doneBg, text: C.done };
}

// ─── ACADEMIC CONTEXT BUILDER ───────────────────────────────
// Builds a rich academic context string for the AI system prompt
// Uses real Villanova catalog data from villanova_db.js

export function buildAcademicContext(student) {
  const allCourses = [...student.completedCourses, ...student.inProgress];

  // Missing required courses per program
  const missingByProgram = student.programs.map((programKey) => {
    const missing = getMissingCourses(allCourses, programKey);
    return { programKey, missing };
  });

  // Prerequisite status for enrolled courses
  const prereqStatus = student.inProgress.map((code) => {
    const check = meetsPrerequisites(student.completedCourses, code);
    const course = COURSES[code];
    return {
      code,
      title: course?.title || code,
      eligible: check.eligible,
      reason: check.reason,
    };
  });

  // Double-dip policies
  const doubleDipFlags = allCourses
    .flatMap((code) => getDoubleDipPolicy(code))
    .filter((p) => p.programs.some((prog) => student.programs.includes(prog)));

  // ── NEW: Enrich with real CSV course data ──────────────────
  const enrolledEnriched = student.inProgress.map((code) => {
    const csv = getCourseFromCSV(code);
    return csv
      ? `${code} (${csv.title}, ${csv.credits} cr.) — ${csv.description} | Offered: ${csv.typicallyOffered} | Last offered: ${csv.lastOffered}`
      : code;
  });

  const completedSample = student.completedCourses.slice(-10).map((code) => {
    const csv = getCourseFromCSV(code);
    return csv ? `${code} (${csv.title})` : code;
  });

  // Courses available next semester relevant to this student's programs
  const relevantUpcoming = ALL_COURSES.filter((c) => {
    if (!c.offeredNextSemester) return false;
    const dept = c.code.split(" ")[0];
    const studentDepts = student.programs.flatMap((p) =>
      p.includes("MIS") ? ["MIS", "VSB"] :
      p.includes("CS") ? ["CSC", "MIS"] :
      p.includes("FIN") ? ["FIN", "VSB"] :
      p.includes("PSY") ? ["PSY"] : []
    );
    return studentDepts.includes(dept) && !allCourses.includes(c.code);
  }).slice(0, 8).map((c) =>
    `${c.code} (${c.title}, ${c.credits} cr.) — prereqs: ${c.prerequisites}`
  );

  // Build context string
  let context = "";

  context += `\nCURRENTLY ENROLLED (with real catalog descriptions):\n`;
  enrolledEnriched.forEach((e) => { context += `- ${e}\n`; });

  context += `\nRECENTLY COMPLETED (last 10 courses):\n`;
  completedSample.forEach((e) => { context += `- ${e}\n`; });

  missingByProgram.forEach(({ programKey, missing }) => {
    if (missing.length > 0) {
      context += `\nMISSING REQUIRED COURSES for ${programKey}:\n`;
      missing.forEach((m) => {
        const csv = getCourseFromCSV(m.code);
        const prereqs = csv?.prerequisites || m.course?.prerequisites?.join(", ") || "None";
        const desc = csv?.description ? ` — ${csv.description.substring(0, 80)}...` : "";
        context += `- ${m.code}: ${csv?.title || m.course?.title || "Unknown"}${desc} | Prereqs: ${prereqs} | Section: ${m.section}\n`;
      });
    } else {
      context += `\nAll required courses for ${programKey} completed or in progress.\n`;
    }
  });

  if (prereqStatus.length > 0) {
    context += `\nPREREQUISITE STATUS:\n`;
    prereqStatus.forEach((p) => {
      context += `${p.eligible ? "✓" : "⚠"} ${p.code} (${p.title}): ${p.reason}\n`;
    });
  }

  if (doubleDipFlags.length > 0) {
    context += `\nDOUBLE-DIP POLICIES:\n`;
    doubleDipFlags.forEach((p) => {
      context += `- ${p.course}: ${p.condition}\n`;
    });
  }

  if (relevantUpcoming.length > 0) {
    context += `\nCOURSES AVAILABLE NEXT SEMESTER (Fall 2026) relevant to this student:\n`;
    relevantUpcoming.forEach((c) => { context += `- ${c}\n`; });
  }

  return context;
}