# Villanova Academic Advising CRM — AI Agent

A two-sided AI-powered web application that modernizes the academic advising process at Villanova University.

**Live Demo:** [villanova-crm.vercel.app](https://villanova-crm.vercel.app)

**Course:** MIS 3050 — CRM and Data Analytics  
**Team:** Kyla Phan, Kate Van Horn, Winona Victoria  
**Date:** April 2026

---

## What It Does

**Advisor Side**
- Live KPI dashboard — open questions, at-risk students, AI auto-resolution rate, registration readiness, GPA distribution, class year breakdown
- Student record viewer with degree progress, enrolled courses, and active flags
- AI Assistant tab — ask natural language questions about any student's record
- Agent Alerts — proactive AI monitoring that surfaces critical, high, and medium priority issues automatically
- Approve & Send workflow — review and approve AI-drafted answers with one click, updates student portal in real time
- Course Database — 54 real Villanova courses from the 2025–2026 catalog with search and filters

**Student Side**
- Degree progress tracker with credit count and GPA
- AI chat agent — instant answers to course and requirement questions
- My Questions tab — track submitted questions and advisor responses

---

## Tech Stack

- **Frontend:** React 18 + Vite
- **AI:** Groq API (Llama 3.3 70B Versatile)
- **Data:** Villanova 2025–2026 Undergraduate Catalog (CSV)
- **Deployment:** Vercel

---

## Setup Instructions

### Prerequisites
- Node.js 18+
- A free [Groq API key](https://console.groq.com)

### Install and Run

```bash
git clone https://github.com/YOUR_USERNAME/villanova-crm.git
cd villanova-crm
npm install
```

Create a `.env` file in the root:
VITE_GROQ_KEY=your_groq_api_key_here

Then run:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Deploy to Vercel

1. Push to GitHub
2. Connect repo to [Vercel](https://vercel.com)
3. Add `VITE_GROQ_KEY` as an environment variable in Vercel dashboard
4. Deploy

---

## Project Structure

src/
├── App.jsx                  # Root component, global state, view routing
├── components/
│   └── Sidebar.jsx          # Advisor sidebar with caseload and navigation
├── pages/
│   ├── AdvisorDashboard.jsx # KPI bar, student record, alerts, course database
│   ├── StudentPortal.jsx    # Student chat, degree progress, my questions
│   └── CourseDatabase.jsx   # Searchable course catalog from CSV
├── data/
│   ├── students.js          # Student/advisor data, buildAcademicContext()
│   ├── villanova_db.js      # Degree requirements, prerequisites, policies
│   ├── useCourses.js        # CSV loader hook
│   └── courses.csv          # 54 Villanova courses (2025–2026 catalog)
├── utils/
│   └── ai.js                # Groq API helper function
└── styles/
└── colors.js            # Shared color constants
---

## Key Features

**AI Auto-Resolution Rate** — tracks what percentage of student questions are handled by the AI with high confidence vs escalated to an advisor. Updates in real time as advisors approve questions.

**Approve & Send Workflow** — when a student submits a question, the AI generates a draft answer with a confidence score. The advisor can edit the draft, add a private note, and approve it in one click. The answer immediately appears in the student portal.

**Agent Alerts** — the system continuously monitors all student records and automatically surfaces issues: high-risk students, long gaps since advisor contact, and pending unanswered questions — without the advisor needing to manually check.

**Real Villanova Data** — all course descriptions, prerequisites, and semester availability are sourced from the official Villanova 2025–2026 Undergraduate Catalog.

---

## Notes

- No backend or database — all state is managed in React memory and resets each session
- The `.env` file containing the Groq API key is excluded from this repo — you must add your own
- For a production system, session state would be replaced with a real database and authentication layer
