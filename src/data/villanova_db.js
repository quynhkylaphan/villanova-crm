// ============================================================
// VILLANOVA UNIVERSITY — REAL COURSE & REQUIREMENTS DATABASE
// Source: Villanova Undergraduate Catalog 2025-2026
// live-villanova-catalog.cleancatalog.io
// ============================================================

// ─── COURSE CATALOG ──────────────────────────────────────────
// Each course has: code, title, credits, description,
// prerequisites (array of course codes), minGPA, notes
export const COURSES = {

  // ── VSB BUSINESS CORE ──────────────────────────────────────
  "VSB 1015": {
    title: "Business Dynamics",
    credits: 3,
    description: "Explores the dynamic nature of business in a changing environment. Cross-functional view of business and contribution of functions to accomplish vision. Integrates global, ethical, and technological dimensions. Emphasizes innovation as a business and personal skill.",
    prerequisites: [],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Required for all VSB students freshman year.",
  },
  "VSB 2004": {
    title: "Financial Accounting",
    credits: 3,
    description: "Introduces generally accepted accounting principles and both the creation and analysis of financial statements. Students are exposed to the importance of accounting in making decisions related to business, investing, and financing.",
    prerequisites: [],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Required VSB core. Typically taken spring of freshman year.",
  },
  "VSB 2006": {
    title: "Introduction to MIS",
    credits: 3,
    description: "Presents examples of organizational, process, and strategy alignment, and teaches students to clearly recognize key performance measures for business processes in a global economy.",
    prerequisites: [],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Required VSB core. Gateway course for MIS major.",
  },
  "VSB 2007": {
    title: "Corporate Responsibility & Regulation",
    credits: 3,
    description: "Contemporary issues and topics impacting the business environment with focus on corporate responsibility, ethical decision-making, and legal regulation.",
    prerequisites: [],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Required VSB core. Take VSB 2006 or VSB 2007 (not both required).",
  },
  "VSB 2008": {
    title: "Business Analytics",
    credits: 3,
    description: "Fundamentals of data analysis and quantitative decision-making for business. Covers statistical reasoning, data visualization, and analytical tools applied to real business scenarios.",
    prerequisites: ["MAT 1500", "STAT 1430"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Required VSB core.",
  },
  "VSB 2009": {
    title: "Principles of Finance",
    credits: 3,
    description: "The theory and techniques of financial management. Financial markets; financial statements and analysis; time value of money; interest rates; bond valuation; risk and return; equity valuation; cost of capital; capital budgeting; working capital management.",
    prerequisites: ["VSB 2004"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Restricted to VSB students and Business Minors.",
  },
  "VSB 2014": {
    title: "Principles of Managerial Accounting",
    credits: 3,
    description: "How management accounting information can be used to help firms achieve strategic goals and profitability objectives. Use of an entrepreneurial perspective to examine how managers apply risk measurement and management techniques to business planning and control systems.",
    prerequisites: ["VSB 2004"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Required VSB core.",
  },
  "VSB 2020": {
    title: "Competitive Effectiveness",
    credits: 6,
    description: "Explores value creation for stakeholders and establishing competitive advantage; how goods/services are developed to meet customer/consumer needs and are distributed for consumption. Innovating, problem-solving, leading, and controlling through effective use of human capital. Satisfies Intro to Management and Intro to Marketing requirements.",
    prerequisites: ["VSB 1015", "VSB 2004", "VSB 2006", "VSB 2009"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "6-credit integrated course. Required VSB core.",
  },
  "VSB 3008": {
    title: "Operations & Supply Chain Management",
    credits: 3,
    description: "Provides an understanding of the critical role and contributions made by operations managers in manufacturing and service firms, including decision making, forecasting, resource allocation, project management, quality, materials management, technology, and strategy.",
    prerequisites: ["VSB 2008"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Required VSB core. Typically taken junior year.",
  },
  "VSB 4002": {
    title: "Strategic Thinking & Implementation",
    credits: 3,
    description: "Capstone business course. Teaches students to think strategically and holistically about companies and non-profit organizations from the top down and with a long-term organizational perspective.",
    prerequisites: ["VSB 2020", "VSB 3008"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Senior capstone. Required for all VSB students.",
  },
  "VSB 3000": {
    title: "Backpack-to-Briefcase: JR Seminar",
    credits: 1,
    description: "Professional development program combining class sessions and out-of-class activities focused on career exploration, job search skills, and development of soft skills. Includes internal case competition.",
    prerequisites: ["VSB 2000"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Required 1-credit VSB professional development course, junior year.",
  },

  // ── MIS MAJOR COURSES ──────────────────────────────────────
  "MIS 2020": {
    title: "Programming for Adaptive Problem Solving",
    credits: 3,
    description: "Introduction to programming concepts with emphasis on problem solving and adaptability. Covers algorithm design, data structures, and programming fundamentals in a business context.",
    prerequisites: ["VSB 2006"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "One of three foundation MIS major courses. Choose 2 of MIS 2020, 2030, 2040.",
  },
  "MIS 2030": {
    title: "Database Management",
    credits: 3,
    description: "Design, implementation, and use of relational databases. Topics include entity-relationship modeling, normalization, SQL, and database administration in a business context.",
    prerequisites: ["VSB 2006"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "One of three foundation MIS major courses. Choose 2 of MIS 2020, 2030, 2040.",
  },
  "MIS 2040": {
    title: "Systems Analysis & Design",
    credits: 3,
    description: "Methodologies and techniques for analyzing, designing, and implementing information systems. Covers requirements gathering, UML modeling, prototyping, and project management.",
    prerequisites: ["VSB 2006"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "One of three foundation MIS major courses. Choose 2 of MIS 2020, 2030, 2040.",
  },
  "MIS 3020": {
    title: "Enterprise Systems & Applications",
    credits: 3,
    description: "Study of enterprise resource planning (ERP) systems and related business applications. Covers SAP, process integration, and implementation of enterprise software in organizations.",
    prerequisites: ["VSB 2006", "VSB 2020"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "MIS major elective.",
  },
  "MIS 3050": {
    title: "CRM and Data Analytics",
    credits: 3,
    description: "Fundamental issues associated with Customer Relationship Management (CRM) and Data Analytics, theoretical and practical, such as designing and building a data warehouse, building and populating info-cubes, report generation with SAP BW, data mining, and business intelligence technologies.",
    prerequisites: ["VSB 2006", "VSB 2020", "VSB 2009"],
    minGPA: null,
    offered: ["Spring"],
    notes: "MIS major elective. Last offered: Spring 2026, 2025, 2024, 2023.",
  },
  "MIS 3060": {
    title: "Business Intelligence & Performance Management",
    credits: 3,
    description: "Theory and practice of business intelligence systems, including data warehousing, online analytical processing (OLAP), dashboards, and performance management frameworks.",
    prerequisites: ["VSB 2006", "VSB 2020"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "MIS major elective. MSA 8240 may fulfill this requirement.",
  },
  "MIS 3070": {
    title: "Emerging Business Technologies",
    credits: 3,
    description: "Survey of emerging technologies and their business applications. Topics vary and include blockchain, IoT, augmented reality, cloud computing, and their strategic implications.",
    prerequisites: ["VSB 2006"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "MIS major elective.",
  },
  "MIS 3080": {
    title: "Applied Machine Learning",
    credits: 3,
    description: "Practical application of machine learning techniques in business contexts. Covers supervised and unsupervised learning, model evaluation, and deployment of predictive analytics solutions.",
    prerequisites: ["VSB 2008", "MIS 2020"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "MIS major elective.",
  },
  "MIS 3300": {
    title: "AI & Machine Learning for Business",
    credits: 3,
    description: "Introduces artificial intelligence and machine learning concepts with a focus on business strategy and application. Covers AI tools, natural language processing, computer vision, and ethical AI considerations.",
    prerequisites: ["VSB 2006", "VSB 2008"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "MIS major elective. Can also count toward AIML Minor. Double-dip between MIS major and AIML Minor requires written departmental approval.",
  },

  // ── ECONOMICS ──────────────────────────────────────────────
  "ECO 1001": {
    title: "Introduction to Microeconomics",
    credits: 3,
    description: "Principles of microeconomics including supply and demand, market equilibrium, consumer and firm behavior, market structure, and government policy.",
    prerequisites: [],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Required VSB core.",
  },
  "ECO 1002": {
    title: "Introduction to Macroeconomics",
    credits: 3,
    description: "Principles of macroeconomics including national income accounting, monetary and fiscal policy, inflation, unemployment, and international trade.",
    prerequisites: [],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Required VSB core.",
  },
  "ECO 3108": {
    title: "Global Political Economy",
    credits: 3,
    description: "Students learn about the political history, socio-economic conditions, and government policies of various countries and regions to analyze and evaluate the global impact on international trade and monetary relations.",
    prerequisites: ["ECO 1001", "ECO 1002"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Required VSB core. Typically taken junior year.",
  },

  // ── MATHEMATICS & STATISTICS ───────────────────────────────
  "MAT 1500": {
    title: "Calculus I",
    credits: 4,
    description: "Limits, continuity, derivatives and their applications, introduction to integration. Required for business analytics and quantitative majors.",
    prerequisites: [],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Required for VSB students. Prerequisite for VSB 2008.",
  },
  "STAT 1430": {
    title: "Applied Statistics",
    credits: 3,
    description: "Descriptive statistics, probability distributions, statistical inference, regression analysis, and applications to business and social sciences.",
    prerequisites: [],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Required for VSB students. Prerequisite for VSB 2008.",
  },
  "MAT 2400": {
    title: "Calculus III",
    credits: 3,
    description: "Multivariable calculus including partial derivatives, multiple integrals, vector calculus, and applications.",
    prerequisites: ["MAT 1500"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Required for CSC major.",
  },

  // ── LIBERAL ARTS CORE ──────────────────────────────────────
  "ACS 1000": {
    title: "Augustine & Culture Seminar I",
    credits: 3,
    description: "A Humanities seminar based principally on texts and readings drawn from primary sources up to 1650. Extensive written work and seminar discussions. Required readings include Hebrew and Christian scriptures, Augustine, Greek and Renaissance works.",
    prerequisites: [],
    minGPA: null,
    offered: ["Fall"],
    notes: "Required CLAS core. Taken freshman fall semester.",
  },
  "ACS 1001": {
    title: "Augustine & Culture Seminar II",
    credits: 3,
    description: "A Humanities seminar based principally on texts and readings drawn from primary sources from 1650 to the present. Continuation of ACS 1000 with focus on modern intellectual and cultural history.",
    prerequisites: ["ACS 1000"],
    minGPA: null,
    offered: ["Spring"],
    notes: "Required CLAS core. Taken freshman spring semester.",
  },
  "ETH 2050": {
    title: "Ethics",
    credits: 3,
    description: "Systematic examination of ethical theory and its application to contemporary moral problems. Covers major ethical traditions including virtue ethics, deontology, and consequentialism.",
    prerequisites: [],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Required core for all Villanova students.",
  },
  "PHI 1000": {
    title: "Introduction to Philosophy",
    credits: 3,
    description: "Introduction to the central questions and methods of philosophy including metaphysics, epistemology, ethics, and political philosophy. Emphasis on critical reasoning and argument analysis.",
    prerequisites: [],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Required core for all Villanova students.",
  },
  "THL 1000": {
    title: "Introduction to Theology",
    credits: 3,
    description: "Introduction to theological inquiry and the Catholic intellectual tradition. Covers scripture, Christian history, and systematic theology in dialogue with contemporary issues.",
    prerequisites: [],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Required core for all Villanova students.",
  },
  "ENG 1000": {
    title: "Writing and Rhetoric",
    credits: 3,
    description: "Introduction to academic writing with emphasis on argumentation, research, revision, and rhetorical analysis. Students complete multiple writing projects across genres.",
    prerequisites: [],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Required writing core.",
  },

  // ── COMPUTER SCIENCE ───────────────────────────────────────
  "CSC 1051": {
    title: "Algorithms & Data Structures I",
    credits: 4,
    description: "Introduction to object-oriented programming and data structures. Topics include classes, inheritance, polymorphism, arrays, linked lists, stacks, queues, and algorithm analysis using Java.",
    prerequisites: [],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Gateway course for CSC major and minor. 4 credits.",
  },
  "CSC 1052": {
    title: "Algorithms & Data Structures II",
    credits: 4,
    description: "Continuation of CSC 1051. Advanced data structures including trees, heaps, hash tables, and graphs. Algorithm design, analysis, and complexity. Introduction to sorting and searching algorithms.",
    prerequisites: ["CSC 1051"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Required CSC major course. 4 credits. May fulfill MIS 2020 requirement.",
  },
  "CSC 1300": {
    title: "Discrete Structures",
    credits: 3,
    description: "Mathematical foundations of computer science including logic, sets, relations, functions, combinatorics, graph theory, and proof techniques.",
    prerequisites: [],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Required CSC major course.",
  },
  "CSC 1700": {
    title: "Analysis of Algorithms",
    credits: 3,
    description: "Design and analysis of algorithms including asymptotic complexity, divide-and-conquer, dynamic programming, greedy algorithms, graph algorithms, and NP-completeness.",
    prerequisites: ["CSC 1052", "CSC 1300"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Required CSC major course.",
  },
  "CSC 1800": {
    title: "Organization of Programming Languages",
    credits: 3,
    description: "Survey of programming language concepts including syntax, semantics, type systems, scope, control structures, and programming paradigms (functional, logical, object-oriented).",
    prerequisites: ["CSC 1052"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Required CSC major course.",
  },
  "CSC 2053": {
    title: "Platform Based Computing",
    credits: 3,
    description: "Development of software for specific platforms including mobile, web, and cloud environments. Covers APIs, frameworks, and platform-specific design considerations.",
    prerequisites: ["CSC 1052"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Required CSC major course.",
  },
  "CSC 2300": {
    title: "Statistics for Computing",
    credits: 3,
    description: "Probability and statistics with applications to computing. Topics include probability distributions, hypothesis testing, regression, and statistical computing.",
    prerequisites: ["CSC 1051", "MAT 1500"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Required CSC major course. STAT 4310 is an alternative.",
  },
  "CSC 2400": {
    title: "Computer Systems",
    credits: 3,
    description: "Computer organization and assembly language programming. Topics include data representation, instruction sets, memory hierarchy, I/O, and processor design.",
    prerequisites: ["CSC 1052"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Required CSC major course.",
  },
  "CSC 2405": {
    title: "Computer Systems II",
    credits: 3,
    description: "Advanced topics in computer systems including operating systems concepts, processes, threads, synchronization, memory management, and file systems.",
    prerequisites: ["CSC 2400"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Required CSC major course.",
  },
  "CSC 4170": {
    title: "Theory of Computation",
    credits: 3,
    description: "Formal models of computation including automata, grammars, Turing machines, decidability, and complexity theory. Applications to language design and compiler construction.",
    prerequisites: ["CSC 1700", "CSC 1300"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Required CSC major course. Typically taken senior year.",
  },
  "CSC 4480": {
    title: "Principles of Database Systems",
    credits: 3,
    description: "Theoretical and practical foundations of database systems including relational model, SQL, query optimization, transaction processing, concurrency control, and NoSQL databases.",
    prerequisites: ["CSC 1052", "CSC 1300"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Required CSC major course. May fulfill MIS 2030 requirement.",
  },
  "CSC 4700": {
    title: "Software Engineering",
    credits: 3,
    description: "Principles and practices of large-scale software development including requirements, design patterns, testing, version control, agile methodologies, and project management.",
    prerequisites: ["CSC 1052", "CSC 2053"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Required CSC major course.",
  },
  "PHI 2180": {
    title: "Philosophy of Mind",
    credits: 3,
    description: "Philosophical examination of the mind including consciousness, intentionality, mental causation, and the relationship between mind and body. Readings from classical and contemporary sources.",
    prerequisites: ["PHI 1000"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "CLAS elective.",
  },

  // ── PSYCHOLOGY ─────────────────────────────────────────────
  "PSY 1000": {
    title: "Introduction to Psychology",
    credits: 3,
    description: "Survey of the science of psychology including biological bases of behavior, sensation and perception, learning, memory, cognition, development, personality, social psychology, and mental health.",
    prerequisites: [],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Gateway course for PSY major.",
  },
  "PSY 2100": {
    title: "Research Methods in Psychology",
    credits: 3,
    description: "Introduction to scientific research methods in psychology including experimental design, data collection, statistical analysis, and ethical considerations in research.",
    prerequisites: ["PSY 1000"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Required for PSY major. Prerequisite for all upper-division PSY courses.",
  },
  "PSY 2110": {
    title: "Statistics for Psychology",
    credits: 3,
    description: "Statistical methods used in psychological research including descriptive statistics, inferential statistics, correlation, regression, t-tests, and ANOVA using SPSS.",
    prerequisites: ["PSY 1000"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Required for PSY major. Co-requisite or prerequisite for PSY 2100.",
  },

  // ── FINANCE ────────────────────────────────────────────────
  "FIN 2114": {
    title: "Financial Markets & Institutions",
    credits: 3,
    description: "Structure and function of financial markets and institutions. Topics include money markets, capital markets, commercial banking, investment banking, and financial regulation.",
    prerequisites: ["VSB 2009"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Finance major required course.",
  },
  "FIN 2227": {
    title: "Investments",
    credits: 3,
    description: "Principles of investment analysis including portfolio theory, asset pricing models, security analysis, market efficiency, and derivatives.",
    prerequisites: ["VSB 2009"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Finance major required course.",
  },
  "FIN 2323": {
    title: "Corporate Finance",
    credits: 3,
    description: "Advanced topics in corporate financial management including capital structure, dividend policy, mergers and acquisitions, international finance, and financial distress.",
    prerequisites: ["FIN 2114", "FIN 2227"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Finance major required course.",
  },

  // ── MANAGEMENT ─────────────────────────────────────────────
  "MGT 3170": {
    title: "Organizational Behavior",
    credits: 3,
    description: "Individual and group behavior in organizations. Topics include motivation, leadership, communication, team dynamics, organizational culture, and change management.",
    prerequisites: ["VSB 2020"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Required for many VSB majors.",
  },
  "MGT 4170": {
    title: "Human Resource Management",
    credits: 3,
    description: "Strategic management of human resources including recruitment, selection, training, performance evaluation, compensation, labor relations, and HR law.",
    prerequisites: ["MGT 3170"],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Management major course.",
  },
  "MGT 3600": {
    title: "Business Law",
    credits: 3,
    description: "Legal environment of business including contracts, torts, property, agency, employment law, and business organizations. Focus on practical application to business decision-making.",
    prerequisites: [],
    minGPA: null,
    offered: ["Fall", "Spring"],
    notes: "Required for Business Law minor.",
  },
};

// ─── DEGREE REQUIREMENTS ────────────────────────────────────
// Maps each program to its required courses by section

export const DEGREE_REQUIREMENTS = {

  // ── MIS PRIMARY MAJOR (125 credits) ──────────────────────
  "MIS_PRIMARY": {
    name: "Management Information Systems (Primary Major)",
    college: "VSB",
    totalCredits: 125,
    majorGPARequired: 2.0,
    sections: [
      {
        name: "VSB Business Core",
        credits: 45,
        required: [
          "ECO 1001", "ECO 1002", "ECO 3108",
          "VSB 1015", "VSB 2004", "VSB 2006", "VSB 2007",
          "VSB 2008", "VSB 2009", "VSB 2014", "VSB 2020",
          "VSB 3008", "VSB 4002", "VSB 3000",
        ],
        notes: "All business core courses must be taken for a letter grade.",
      },
      {
        name: "MIS Major Foundation (choose 2 of 3)",
        credits: 6,
        chooseN: 2,
        options: ["MIS 2020", "MIS 2030", "MIS 2040"],
        notes: "Must complete 2 of the 3 foundation courses.",
      },
      {
        name: "MIS Major Electives (choose 4)",
        credits: 12,
        chooseN: 4,
        options: [
          "MIS 3010", "MIS 3020", "MIS 3030", "MIS 3040",
          "MIS 3050", "MIS 3060", "MIS 3070", "MIS 3080",
          "MIS 3090", "MIS 3300",
        ],
        notes: "4 of 6 total MIS major courses must have MIS prefix. MIS 3310 and MIS 3500 do NOT count.",
      },
      {
        name: "Liberal Arts & Sciences Core",
        credits: 44,
        required: [
          "ACS 1000", "ACS 1001", "ETH 2050", "PHI 1000", "THL 1000",
          "MAT 1500", "STAT 1430",
        ],
        notes: "Includes fine arts, social science, language, history, and UNITAS requirements.",
      },
      {
        name: "Free Electives",
        credits: 18,
        notes: "Any approved courses to reach 125 total credits.",
      },
    ],
  },

  // ── CS PRIMARY MAJOR (122 credits) ───────────────────────
  "CS_PRIMARY": {
    name: "Computer Science (Primary Major)",
    college: "CLAS",
    totalCredits: 122,
    majorGPARequired: null,
    sections: [
      {
        name: "Required CSC Major Courses",
        credits: 70,
        required: [
          "CSC 1051", "CSC 1052", "CSC 1300", "CSC 1700",
          "CSC 1800", "CSC 2053", "CSC 2300", "CSC 2400",
          "CSC 2405", "CSC 4170", "CSC 4480", "CSC 4700",
          "MAT 2400",
        ],
        notes: "All required courses must be taken for a letter grade.",
      },
      {
        name: "CSC Major Electives (choose 3)",
        credits: 9,
        chooseN: 3,
        notes: "Choose 3 courses with CSC major elective attribute [CMJE].",
      },
      {
        name: "Natural Science with Lab (choose 2)",
        credits: 8,
        chooseN: 2,
        options: ["BIO 2105", "BIO 2106", "PHY 1100", "CHM 1151", "GEV 1050"],
        notes: "Must include lab component.",
      },
      {
        name: "CLAS Core Curriculum",
        credits: 35,
        required: [
          "ACS 1000", "ACS 1001", "ETH 2050", "PHI 1000", "THL 1000", "ENG 1000",
        ],
        notes: "Includes fine arts, social science, language, history, and 2 UNITAS (DIV) courses.",
      },
    ],
  },

  // ── ACADEMIC YEAR BUSINESS MINOR (for CLAS/Eng/Nursing) ──
  "BUSINESS_MINOR_AY": {
    name: "Academic Year Business Minor",
    college: "VSB",
    totalCredits: 30,
    majorGPARequired: 3.9,
    sections: [
      {
        name: "Business Minor Required Courses",
        credits: 30,
        required: [
          "ECO 1001", "ECO 1002",
          "VSB 1015", "VSB 2004", "VSB 2006", "VSB 2009",
          "VSB 2020",
        ],
        notes: "Minimum GPA of 3.9 required. Open to CLAS, Engineering, and Nursing students. Application required.",
      },
    ],
  },

  // ── AIML MINOR (VSB) ─────────────────────────────────────
  "AIML_MINOR": {
    name: "Artificial Intelligence & Machine Learning Minor",
    college: "VSB",
    totalCredits: 9,
    majorGPARequired: null,
    sections: [
      {
        name: "AIML Minor Courses (3 required)",
        credits: 9,
        required: ["MIS 3300", "MIS 3080"],
        chooseN: 1,
        notes: "3-course minor. MIS 3300 may double-dip with MIS major elective only with written departmental approval.",
      },
    ],
  },

  // ── BUSINESS LAW MINOR ───────────────────────────────────
  "BUSINESS_LAW_MINOR": {
    name: "Business Law Minor",
    college: "VSB",
    totalCredits: 12,
    majorGPARequired: null,
    sections: [
      {
        name: "Business Law Minor Required",
        credits: 12,
        required: ["MGT 3600"],
        notes: "4 courses required including MGT 3600 and 3 additional law electives.",
      },
    ],
  },

  // ── PSYCHOLOGY MAJOR (CLAS) ──────────────────────────────
  "PSY_PRIMARY": {
    name: "Psychology (Primary Major)",
    college: "CLAS",
    totalCredits: 120,
    majorGPARequired: null,
    sections: [
      {
        name: "Required PSY Courses",
        credits: 21,
        required: ["PSY 1000", "PSY 2100", "PSY 2110"],
        notes: "PSY 2100 and PSY 2110 are prerequisites for all upper-division PSY courses. Should be completed sophomore year.",
      },
      {
        name: "PSY Electives (choose 6 upper-division)",
        credits: 18,
        chooseN: 6,
        notes: "Must choose 6 upper-division PSY courses (3000-level or above).",
      },
      {
        name: "CLAS Core Curriculum",
        credits: 50,
        required: [
          "ACS 1000", "ACS 1001", "ETH 2050", "PHI 1000", "THL 1000", "ENG 1000",
        ],
        notes: "Includes fine arts, social science, language, history, and 2 UNITAS (DIV) courses.",
      },
    ],
  },

  // ── FINANCE MAJOR (VSB) ──────────────────────────────────
  "FIN_PRIMARY": {
    name: "Finance (Primary Major)",
    college: "VSB",
    totalCredits: 125,
    majorGPARequired: 2.0,
    sections: [
      {
        name: "VSB Business Core",
        credits: 45,
        required: [
          "ECO 1001", "ECO 1002", "ECO 3108",
          "VSB 1015", "VSB 2004", "VSB 2006", "VSB 2007",
          "VSB 2008", "VSB 2009", "VSB 2014", "VSB 2020",
          "VSB 3008", "VSB 4002", "VSB 3000",
        ],
      },
      {
        name: "Finance Major Required Courses",
        credits: 18,
        required: ["FIN 2114", "FIN 2227", "FIN 2323"],
        notes: "3 required courses + 3 finance electives for 6 total major courses.",
      },
      {
        name: "Finance Major Electives (choose 3)",
        credits: 9,
        chooseN: 3,
        notes: "Choose from approved FIN elective list.",
      },
    ],
  },
};

// ─── DOUBLE-DIP POLICIES ────────────────────────────────────
export const DOUBLE_DIP_POLICIES = [
  {
    course: "MIS 3300",
    programs: ["MIS_PRIMARY", "AIML_MINOR"],
    allowed: true,
    condition: "Requires written approval from MIS Department Chair before registration.",
    contact: "MIS Department Chair, Bartley Hall 3019, (610) 519-4340",
  },
  {
    course: "CSC 1052",
    programs: ["CS_PRIMARY", "MIS_PRIMARY"],
    allowed: true,
    condition: "CSC 1052 may fulfill MIS 2020 only if not also fulfilling CSC major requirements.",
    contact: "MIS Department",
  },
  {
    course: "CSC 4480",
    programs: ["CS_PRIMARY", "MIS_PRIMARY"],
    allowed: true,
    condition: "CSC 4480 may fulfill MIS 2030 requirement.",
    contact: "MIS Department",
  },
  {
    course: "ACC 2340",
    programs: ["MIS_PRIMARY"],
    allowed: true,
    condition: "May fulfill MIS elective only if not also fulfilling ACC major or ACC minor requirement.",
    contact: "MIS Department",
  },
];

// ─── HELPER FUNCTIONS ────────────────────────────────────────

// Get full course info by code
export function getCourse(code) {
  return COURSES[code] || null;
}

// Get all courses a student still needs for a given program
export function getMissingCourses(completedCourses, programKey) {
  const program = DEGREE_REQUIREMENTS[programKey];
  if (!program) return [];
  const missing = [];
  program.sections.forEach((section) => {
    if (section.required) {
      section.required.forEach((code) => {
        if (!completedCourses.includes(code)) {
          missing.push({ code, section: section.name, course: COURSES[code] });
        }
      });
    }
  });
  return missing;
}

// Check if a student meets prerequisites for a course
export function meetsPrerequisites(completedCourses, courseCode) {
  const course = COURSES[courseCode];
  if (!course) return { eligible: false, reason: "Course not found" };
  if (!course.prerequisites || course.prerequisites.length === 0) {
    return { eligible: true, reason: "No prerequisites required" };
  }
  const missing = course.prerequisites.filter((p) => !completedCourses.includes(p));
  if (missing.length === 0) {
    return { eligible: true, reason: "All prerequisites completed" };
  }
  return {
    eligible: false,
    reason: `Missing prerequisites: ${missing.join(", ")}`,
    missingPrereqs: missing,
  };
}

// Get program info
export function getProgram(programKey) {
  return DEGREE_REQUIREMENTS[programKey] || null;
}

// Get double-dip policy for a course
export function getDoubleDipPolicy(courseCode) {
  return DOUBLE_DIP_POLICIES.filter((p) => p.course === courseCode);
}