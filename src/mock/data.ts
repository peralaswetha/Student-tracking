import type { StudentProfile, GpaHistory, SemesterData } from '../types';

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  id: "std-98214",
  name: "Alexander 'Alex' Rivera",
  rollNumber: "21CSE1044",
  department: "Computer Science & Engineering",
  currentSemester: 5,
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
  email: "alex.rivera@cs.university.edu",
  currentCgpa: 8.42,
  targetCgpa: 8.80,
  institution: "Apex Institute of Technology & Research",
  advisorName: "Dr. Evelyn Vance (Dept of AI & Systems)"
};

export const GPA_PROGRESSION: GpaHistory[] = [
  { semester: 1, academicYear: "2023-2024", sgpa: 7.85, cgpa: 7.85, creditsEarned: 22, totalCredits: 22, rankInBatch: 28 },
  { semester: 2, academicYear: "2023-2024", sgpa: 8.10, cgpa: 7.98, creditsEarned: 24, totalCredits: 46, rankInBatch: 22 },
  { semester: 3, academicYear: "2024-2025", sgpa: 8.45, cgpa: 8.14, creditsEarned: 20, totalCredits: 66, rankInBatch: 15 },
  { semester: 4, academicYear: "2024-2025", sgpa: 8.70, cgpa: 8.28, creditsEarned: 24, totalCredits: 90, rankInBatch: 9 },
  { semester: 5, academicYear: "2025-2026", sgpa: 8.92, cgpa: 8.42, creditsEarned: 22, totalCredits: 112, rankInBatch: 5 },
];

export const SEMESTER_DATASET: Record<number, SemesterData> = {
  // ==========================================
  // SEMESTER 5 (CURRENT ACTIVE TERM)
  // ==========================================
  5: {
    semesterNumber: 5,
    academicYear: "2025-2026",
    attendance: [
      {
        id: "att-cs501",
        code: "CS501",
        name: "Distributed Systems & Cloud Computing",
        instructor: "Prof. Marcus Thorne",
        attended: 29,
        total: 36,
        minRequiredPct: 75,
        credits: 4,
        history: [
          { date: "2026-09-04", status: "PRESENT" },
          { date: "2026-09-02", status: "PRESENT" },
          { date: "2026-08-30", status: "ABSENT" },
          { date: "2026-08-28", status: "PRESENT" },
        ]
      },
      {
        id: "att-cs502",
        code: "CS502",
        name: "Database Internals & Query Optimization",
        instructor: "Dr. Sarah Lin",
        attended: 31,
        total: 34,
        minRequiredPct: 75,
        credits: 4,
        history: [
          { date: "2026-09-03", status: "PRESENT" },
          { date: "2026-09-01", status: "PRESENT" },
          { date: "2026-08-29", status: "PRESENT" },
        ]
      },
      {
        id: "att-cs503",
        code: "CS503",
        name: "Compiler Design & Code Generation",
        instructor: "Dr. Arvind Rao",
        attended: 22,
        total: 30,
        minRequiredPct: 75,
        credits: 4,
        history: [
          { date: "2026-09-04", status: "ABSENT" },
          { date: "2026-09-02", status: "ABSENT" },
          { date: "2026-08-31", status: "PRESENT" },
        ]
      },
      {
        id: "att-cs504",
        code: "CS504",
        name: "Advanced Computer Networks & Protocols",
        instructor: "Prof. Elena Rossi",
        attended: 27,
        total: 35,
        minRequiredPct: 75,
        credits: 4,
        history: [
          { date: "2026-09-03", status: "PRESENT" },
          { date: "2026-09-01", status: "ABSENT" },
        ]
      },
      {
        id: "att-cs505",
        code: "CS505",
        name: "Machine Learning & Statistical Modeling Lab",
        instructor: "Dr. Chen Wei",
        attended: 15,
        total: 16,
        minRequiredPct: 75,
        credits: 2,
        history: [
          { date: "2026-09-02", status: "PRESENT" },
          { date: "2026-08-26", status: "PRESENT" },
        ]
      },
    ],
    marks: [
      {
        subjectId: "cs501",
        code: "CS501",
        name: "Distributed Systems & Cloud Computing",
        maxInternalScore: 40,
        totalInternalScore: 36,
        classAverageTotal: 29.4,
        gradeEstimate: "A+",
        assessments: [
          { id: "a1", title: "Internal Assessment 1", maxScore: 20, weightage: 25, studentScore: 18, classAverage: 14.8, classHighest: 20 },
          { id: "a2", title: "Internal Assessment 2", maxScore: 20, weightage: 25, studentScore: 18, classAverage: 14.6, classHighest: 19 },
        ]
      },
      {
        subjectId: "cs502",
        code: "CS502",
        name: "Database Internals & Query Optimization",
        maxInternalScore: 40,
        totalInternalScore: 38,
        classAverageTotal: 30.2,
        gradeEstimate: "O (Outstanding)",
        assessments: [
          { id: "b1", title: "Internal Assessment 1", maxScore: 20, weightage: 25, studentScore: 19, classAverage: 15.1, classHighest: 20 },
          { id: "b2", title: "Internal Assessment 2", maxScore: 20, weightage: 25, studentScore: 19, classAverage: 15.1, classHighest: 20 },
        ]
      },
      {
        subjectId: "cs503",
        code: "CS503",
        name: "Compiler Design & Code Generation",
        maxInternalScore: 40,
        totalInternalScore: 29,
        classAverageTotal: 27.5,
        gradeEstimate: "B+",
        assessments: [
          { id: "c1", title: "Internal Assessment 1", maxScore: 20, weightage: 25, studentScore: 14, classAverage: 13.5, classHighest: 19 },
          { id: "c2", title: "Internal Assessment 2", maxScore: 20, weightage: 25, studentScore: 15, classAverage: 14.0, classHighest: 19 },
        ]
      },
      {
        subjectId: "cs504",
        code: "CS504",
        name: "Advanced Computer Networks & Protocols",
        maxInternalScore: 40,
        totalInternalScore: 34,
        classAverageTotal: 29.8,
        gradeEstimate: "A",
        assessments: [
          { id: "d1", title: "Internal Assessment 1", maxScore: 20, weightage: 25, studentScore: 17, classAverage: 14.8, classHighest: 20 },
          { id: "d2", title: "Internal Assessment 2", maxScore: 20, weightage: 25, studentScore: 17, classAverage: 15.0, classHighest: 20 },
        ]
      },
      {
        subjectId: "cs505",
        code: "CS505",
        name: "Machine Learning & Statistical Modeling Lab",
        maxInternalScore: 40,
        totalInternalScore: 39,
        classAverageTotal: 32.5,
        gradeEstimate: "O (Outstanding)",
        assessments: [
          { id: "e1", title: "Mid-Term Practical Exam", maxScore: 20, weightage: 25, studentScore: 20, classAverage: 16.2, classHighest: 20 },
          { id: "e2", title: "Model Deployment Project", maxScore: 20, weightage: 25, studentScore: 19, classAverage: 16.3, classHighest: 20 },
        ]
      },
    ],
    assignments: [
      {
        id: "asg-501",
        subjectCode: "CS501",
        subjectName: "Distributed Systems",
        title: "Raft Consensus Protocol Distributed Cluster Simulation",
        description: "Implement leader election, log replication, and heartbeat fault handling using gRPC in Go/Node.js.",
        dueDate: "Tomorrow, 11:59 PM",
        rawDueDate: "2026-09-06T23:59:00",
        status: "TODO",
        priority: "HIGH",
        maxScore: 100,
      },
      {
        id: "asg-502",
        subjectCode: "CS503",
        subjectName: "Compiler Design",
        title: "Lexical & Syntax Analyzer with Flex / Bison Parser",
        description: "Generate AST and symbol table for a custom subset of C language grammar.",
        dueDate: "In 3 days (Sep 08)",
        rawDueDate: "2026-09-08T18:00:00",
        status: "IN_PROGRESS",
        priority: "HIGH",
        maxScore: 50,
      },
      {
        id: "asg-503",
        subjectCode: "CS504",
        subjectName: "Computer Networks",
        title: "Multi-Client TCP Socket Chat with Epoll / Non-blocking IO",
        description: "Demonstrate handling 1,000 concurrent socket connections with minimal latency.",
        dueDate: "Sep 02, 2026",
        rawDueDate: "2026-09-02T23:59:00",
        status: "SUBMITTED",
        priority: "MEDIUM",
        maxScore: 100,
        submissionAttachment: "tcp_chat_server_v2.tar.gz"
      },
      {
        id: "asg-504",
        subjectCode: "CS502",
        subjectName: "Database Internals",
        title: "B+ Tree Indexing & LSM Tree Comparative Analysis",
        description: "Comprehensive 8-page whitepaper benchmarking write amplification in RocksDB vs Postgres B-Tree.",
        dueDate: "Aug 28, 2026",
        rawDueDate: "2026-08-28T23:59:00",
        status: "GRADED",
        priority: "MEDIUM",
        maxScore: 100,
        scoreAwarded: 96,
        feedback: "Exceptional depth in write-amplification profiling. High distinction work."
      },
      {
        id: "asg-505",
        subjectCode: "CS505",
        subjectName: "Machine Learning Lab",
        title: "Transformer Attention Mechanism From Scratch (NumPy)",
        description: "Implement Multi-Head Scaled Dot-Product Self Attention with causal masking.",
        dueDate: "Aug 20, 2026",
        rawDueDate: "2026-08-20T23:59:00",
        status: "GRADED",
        priority: "LOW",
        maxScore: 100,
        scoreAwarded: 99,
        feedback: "Flawless tensor vectorization and matrix math notation."
      }
    ],
    backlogs: [
      {
        id: "bk-1",
        subjectCode: "CS302",
        name: "Digital Electronics & Logic Design",
        credits: 4,
        failedSemester: 3,
        examDate: "Oct 18, 2026",
        registrationStatus: "HALL_TICKET_ISSUED",
        hallTicketNumber: "HT-2026-09412",
        attemptsCount: 2,
        syllabusTopics: [
          { topic: "Boolean Algebra & Karnaugh Maps (K-Maps)", completed: true },
          { topic: "Sequential Logic: Flip-Flops & Finite State Machines", completed: true },
          { topic: "Counters, Shift Registers & Timing Hazards", completed: false },
          { topic: "Analog-to-Digital (ADC) & Digital-to-Analog (DAC) Converters", completed: false },
          { topic: "Verilog HDL Hardware Description Modeling", completed: true }
        ]
      }
    ],
    studySessions: [
      { id: "ss-1", subjectCode: "CS501", durationMinutes: 120, date: "2026-09-04", mode: "POMODORO", focusRating: 5, notes: "Raft leader election test cluster" },
      { id: "ss-2", subjectCode: "CS502", durationMinutes: 90, date: "2026-09-04", mode: "MANUAL", focusRating: 4, notes: "WAL logging algorithms" },
      { id: "ss-3", subjectCode: "CS503", durationMinutes: 110, date: "2026-09-03", mode: "STOPWATCH", focusRating: 4, notes: "LR(1) parsing tables" },
      { id: "ss-4", subjectCode: "CS302", durationMinutes: 150, date: "2026-09-02", mode: "POMODORO", focusRating: 5, notes: "Backlog prep: FSM state transitions" },
      { id: "ss-5", subjectCode: "CS504", durationMinutes: 80, date: "2026-09-01", mode: "MANUAL", focusRating: 3, notes: "BGP and OSPF routing protocols" },
      { id: "ss-6", subjectCode: "CS505", durationMinutes: 140, date: "2026-08-31", mode: "POMODORO", focusRating: 5, notes: "PyTorch backpropagation derivatives" },
    ]
  },

  // ==========================================
  // SEMESTER 4 (COMPLETED - 2024-2025 SPRING)
  // ==========================================
  4: {
    semesterNumber: 4,
    academicYear: "2024-2025",
    attendance: [
      { id: "att-cs401", code: "CS401", name: "Operating System Kernels & Architecture", instructor: "Prof. Davies", attended: 38, total: 40, minRequiredPct: 75, credits: 4, history: [] },
      { id: "att-cs402", code: "CS402", name: "Design & Analysis of Algorithms", instructor: "Dr. Mehta", attended: 35, total: 38, minRequiredPct: 75, credits: 4, history: [] },
      { id: "att-cs403", code: "CS403", name: "Theory of Computation & Automata", instructor: "Dr. Arvind", attended: 30, total: 36, minRequiredPct: 75, credits: 4, history: [] },
      { id: "att-cs404", code: "CS404", name: "Software Engineering & Agile Methodologies", instructor: "Prof. Smith", attended: 34, total: 35, minRequiredPct: 75, credits: 4, history: [] },
      { id: "att-cs405", code: "CS405", name: "Operating Systems & Algorithms Laboratory", instructor: "Prof. Davies", attended: 16, total: 16, minRequiredPct: 75, credits: 2, history: [] },
    ],
    marks: [
      {
        subjectId: "cs401",
        code: "CS401",
        name: "Operating System Kernels & Architecture",
        maxInternalScore: 40,
        totalInternalScore: 37,
        classAverageTotal: 30.1,
        gradeEstimate: "A+",
        assessments: [
          { id: "m4-1", title: "Internal Assessment 1", maxScore: 20, weightage: 25, studentScore: 18, classAverage: 15.0, classHighest: 20 },
          { id: "m4-2", title: "Internal Assessment 2", maxScore: 20, weightage: 25, studentScore: 19, classAverage: 15.1, classHighest: 20 },
        ]
      },
      {
        subjectId: "cs402",
        code: "CS402",
        name: "Design & Analysis of Algorithms",
        maxInternalScore: 40,
        totalInternalScore: 39,
        classAverageTotal: 29.5,
        gradeEstimate: "O (Outstanding)",
        assessments: [
          { id: "m4-3", title: "Internal Assessment 1", maxScore: 20, weightage: 25, studentScore: 19, classAverage: 14.5, classHighest: 20 },
          { id: "m4-4", title: "Internal Assessment 2", maxScore: 20, weightage: 25, studentScore: 20, classAverage: 15.0, classHighest: 20 },
        ]
      },
      {
        subjectId: "cs403",
        code: "CS403",
        name: "Theory of Computation & Automata",
        maxInternalScore: 40,
        totalInternalScore: 33,
        classAverageTotal: 28.0,
        gradeEstimate: "A",
        assessments: [
          { id: "m4-5", title: "Internal Assessment 1", maxScore: 20, weightage: 25, studentScore: 16, classAverage: 13.8, classHighest: 19 },
          { id: "m4-6", title: "Internal Assessment 2", maxScore: 20, weightage: 25, studentScore: 17, classAverage: 14.2, classHighest: 19 },
        ]
      },
      {
        subjectId: "cs404",
        code: "CS404",
        name: "Software Engineering & Agile Methodologies",
        maxInternalScore: 40,
        totalInternalScore: 36,
        classAverageTotal: 31.0,
        gradeEstimate: "A+",
        assessments: [
          { id: "m4-7", title: "Mid-Term Review", maxScore: 20, weightage: 25, studentScore: 18, classAverage: 15.5, classHighest: 20 },
          { id: "m4-8", title: "Agile Sprint Project", maxScore: 20, weightage: 25, studentScore: 18, classAverage: 15.5, classHighest: 20 },
        ]
      },
    ],
    assignments: [
      {
        id: "asg-401",
        subjectCode: "CS401",
        subjectName: "OS Kernels",
        title: "Pintos User Memory & Virtual Page Allocation",
        description: "Implement page fault handler and swap table for thread memory management.",
        dueDate: "May 10, 2025",
        rawDueDate: "2025-05-10T23:59:00",
        status: "GRADED",
        priority: "HIGH",
        maxScore: 100,
        scoreAwarded: 95,
        feedback: "Clean kernel synchronization locks and robust test coverage."
      },
      {
        id: "asg-402",
        subjectCode: "CS402",
        subjectName: "Algorithms",
        title: "Dynamic Programming Max-Flow Min-Cut Ford-Fulkerson Implementation",
        description: "Benchmark Edmonds-Karp runtime on large scale graph instances.",
        dueDate: "Apr 22, 2025",
        rawDueDate: "2025-04-22T23:59:00",
        status: "GRADED",
        priority: "MEDIUM",
        maxScore: 100,
        scoreAwarded: 98,
        feedback: "Optimal residual graph update complexity."
      },
      {
        id: "asg-403",
        subjectCode: "CS403",
        subjectName: "Automata",
        title: "Turing Machine Simulator for Context-Sensitive Languages",
        description: "Construct 2-tape non-deterministic TM simulator.",
        dueDate: "Mar 30, 2025",
        rawDueDate: "2025-03-30T23:59:00",
        status: "GRADED",
        priority: "MEDIUM",
        maxScore: 100,
        scoreAwarded: 92,
        feedback: "Thorough state transition delta table design."
      }
    ],
    backlogs: [
      {
        id: "bk-1",
        subjectCode: "CS302",
        name: "Digital Electronics & Logic Design",
        credits: 4,
        failedSemester: 3,
        examDate: "Oct 18, 2026",
        registrationStatus: "REGISTERED",
        hallTicketNumber: "HT-2025-04128",
        attemptsCount: 1,
        syllabusTopics: [
          { topic: "Boolean Algebra & Karnaugh Maps (K-Maps)", completed: true },
          { topic: "Sequential Logic: Flip-Flops & Finite State Machines", completed: true },
          { topic: "Counters, Shift Registers & Timing Hazards", completed: false },
          { topic: "Analog-to-Digital (ADC) & Digital-to-Analog (DAC) Converters", completed: false },
          { topic: "Verilog HDL Hardware Description Modeling", completed: false }
        ]
      }
    ],
    studySessions: []
  },

  // ==========================================
  // SEMESTER 3 (COMPLETED - 2024-2025 FALL)
  // ==========================================
  3: {
    semesterNumber: 3,
    academicYear: "2024-2025",
    attendance: [
      { id: "att-cs301", code: "CS301", name: "Computer Organization & Architecture", instructor: "Prof. Gupta", attended: 35, total: 38, minRequiredPct: 75, credits: 4, history: [] },
      { id: "att-cs302", code: "CS302", name: "Digital Electronics & Logic Design", instructor: "Dr. K. Nair", attended: 20, total: 36, minRequiredPct: 75, credits: 4, history: [] },
      { id: "att-cs303", code: "CS303", name: "Object-Oriented Programming with Java", instructor: "Prof. Sharma", attended: 36, total: 38, minRequiredPct: 75, credits: 4, history: [] },
      { id: "att-ma301", code: "MA301", name: "Probability, Statistics & Random Processes", instructor: "Dr. Roy", attended: 34, total: 36, minRequiredPct: 75, credits: 4, history: [] },
      { id: "att-cs304", code: "CS304", name: "Java & Systems Programming Lab", instructor: "Prof. Sharma", attended: 16, total: 16, minRequiredPct: 75, credits: 2, history: [] },
    ],
    marks: [
      {
        subjectId: "cs301",
        code: "CS301",
        name: "Computer Organization & Architecture",
        maxInternalScore: 40,
        totalInternalScore: 36,
        classAverageTotal: 29.0,
        gradeEstimate: "A",
        assessments: [
          { id: "m3-1", title: "Internal Assessment 1", maxScore: 20, weightage: 25, studentScore: 18, classAverage: 14.5, classHighest: 20 },
          { id: "m3-2", title: "Internal Assessment 2", maxScore: 20, weightage: 25, studentScore: 18, classAverage: 14.5, classHighest: 20 },
        ]
      },
      {
        subjectId: "cs302",
        code: "CS302",
        name: "Digital Electronics & Logic Design (Course Failed)",
        maxInternalScore: 40,
        totalInternalScore: 18,
        classAverageTotal: 28.5,
        gradeEstimate: "F (Arrear Incurred)",
        assessments: [
          { id: "m3-3", title: "Internal Assessment 1", maxScore: 20, weightage: 25, studentScore: 10, classAverage: 14.0, classHighest: 19 },
          { id: "m3-4", title: "Internal Assessment 2", maxScore: 20, weightage: 25, studentScore: 8, classAverage: 14.5, classHighest: 20 },
        ]
      },
      {
        subjectId: "cs303",
        code: "CS303",
        name: "Object-Oriented Programming with Java",
        maxInternalScore: 40,
        totalInternalScore: 38,
        classAverageTotal: 30.5,
        gradeEstimate: "A+",
        assessments: [
          { id: "m3-5", title: "Internal Assessment 1", maxScore: 20, weightage: 25, studentScore: 19, classAverage: 15.0, classHighest: 20 },
          { id: "m3-6", title: "Internal Assessment 2", maxScore: 20, weightage: 25, studentScore: 19, classAverage: 15.5, classHighest: 20 },
        ]
      },
      {
        subjectId: "ma301",
        code: "MA301",
        name: "Probability, Statistics & Random Processes",
        maxInternalScore: 40,
        totalInternalScore: 35,
        classAverageTotal: 28.0,
        gradeEstimate: "A",
        assessments: [
          { id: "m3-7", title: "Internal Assessment 1", maxScore: 20, weightage: 25, studentScore: 17, classAverage: 14.0, classHighest: 20 },
          { id: "m3-8", title: "Internal Assessment 2", maxScore: 20, weightage: 25, studentScore: 18, classAverage: 14.0, classHighest: 20 },
        ]
      },
    ],
    assignments: [
      {
        id: "asg-301",
        subjectCode: "CS303",
        subjectName: "Java OOP",
        title: "Multi-threaded Banking Transaction Ledger in Java",
        description: "Thread-safe synchronized deposits and withdrawals with deadlock prevention.",
        dueDate: "Nov 15, 2024",
        rawDueDate: "2024-11-15T23:59:00",
        status: "GRADED",
        priority: "HIGH",
        maxScore: 100,
        scoreAwarded: 96,
        feedback: "Proper use of ReentrantLocks and atomic integers."
      },
      {
        id: "asg-302",
        subjectCode: "CS301",
        subjectName: "Computer Org",
        title: "5-Stage MIPS Pipeline Hazard Simulator in Python",
        description: "Simulate data forwarding and branch hazard stalling.",
        dueDate: "Oct 28, 2024",
        rawDueDate: "2024-10-28T23:59:00",
        status: "GRADED",
        priority: "MEDIUM",
        maxScore: 100,
        scoreAwarded: 94,
        feedback: "Excellent ALU forwarding paths implementation."
      },
      {
        id: "asg-303",
        subjectCode: "CS302",
        subjectName: "Digital Electronics",
        title: "4-bit Synchronous Up/Down Counter Circuit Design",
        description: "Design and verify circuit in Logisim.",
        dueDate: "Oct 10, 2024",
        rawDueDate: "2024-10-10T23:59:00",
        status: "GRADED",
        priority: "HIGH",
        maxScore: 100,
        scoreAwarded: 45,
        feedback: "Incomplete timing hazard analysis for transition states."
      }
    ],
    backlogs: [
      {
        id: "bk-1",
        subjectCode: "CS302",
        name: "Digital Electronics & Logic Design",
        credits: 4,
        failedSemester: 3,
        examDate: "Oct 18, 2026",
        registrationStatus: "REGISTERED",
        hallTicketNumber: "HT-2024-03102",
        attemptsCount: 0,
        syllabusTopics: [
          { topic: "Boolean Algebra & Karnaugh Maps (K-Maps)", completed: true },
          { topic: "Sequential Logic: Flip-Flops & Finite State Machines", completed: false },
          { topic: "Counters, Shift Registers & Timing Hazards", completed: false },
          { topic: "Analog-to-Digital (ADC) & Digital-to-Analog (DAC) Converters", completed: false },
          { topic: "Verilog HDL Hardware Description Modeling", completed: false }
        ]
      }
    ],
    studySessions: []
  },

  // ==========================================
  // SEMESTER 2 (COMPLETED - 2023-2024 SPRING)
  // ==========================================
  2: {
    semesterNumber: 2,
    academicYear: "2023-2024",
    attendance: [
      { id: "att-cs201", code: "CS201", name: "Data Structures & Algorithms in C++", instructor: "Dr. Mehta", attended: 37, total: 40, minRequiredPct: 75, credits: 4, history: [] },
      { id: "att-ma201", code: "MA201", name: "Discrete Mathematics & Graph Theory", instructor: "Dr. Roy", attended: 35, total: 38, minRequiredPct: 75, credits: 4, history: [] },
      { id: "att-ec201", code: "EC201", name: "Basic Electronic Circuits & Devices", instructor: "Prof. K. Nair", attended: 32, total: 36, minRequiredPct: 75, credits: 4, history: [] },
      { id: "att-cs202", code: "CS202", name: "Object-Oriented Programming (C++)", instructor: "Prof. Smith", attended: 34, total: 36, minRequiredPct: 75, credits: 4, history: [] },
      { id: "att-cs203", code: "CS203", name: "Data Structures Laboratory", instructor: "Dr. Mehta", attended: 16, total: 16, minRequiredPct: 75, credits: 2, history: [] },
    ],
    marks: [
      {
        subjectId: "cs201",
        code: "CS201",
        name: "Data Structures & Algorithms in C++",
        maxInternalScore: 40,
        totalInternalScore: 36,
        classAverageTotal: 29.0,
        gradeEstimate: "A+",
        assessments: [
          { id: "m2-1", title: "Internal Assessment 1", maxScore: 20, weightage: 25, studentScore: 18, classAverage: 14.5, classHighest: 20 },
          { id: "m2-2", title: "Internal Assessment 2", maxScore: 20, weightage: 25, studentScore: 18, classAverage: 14.5, classHighest: 20 },
        ]
      },
      {
        subjectId: "ma201",
        code: "MA201",
        name: "Discrete Mathematics & Graph Theory",
        maxInternalScore: 40,
        totalInternalScore: 35,
        classAverageTotal: 28.5,
        gradeEstimate: "A",
        assessments: [
          { id: "m2-3", title: "Internal Assessment 1", maxScore: 20, weightage: 25, studentScore: 17, classAverage: 14.0, classHighest: 20 },
          { id: "m2-4", title: "Internal Assessment 2", maxScore: 20, weightage: 25, studentScore: 18, classAverage: 14.5, classHighest: 20 },
        ]
      },
      {
        subjectId: "ec201",
        code: "EC201",
        name: "Basic Electronic Circuits & Devices",
        maxInternalScore: 40,
        totalInternalScore: 31,
        classAverageTotal: 27.5,
        gradeEstimate: "B+",
        assessments: [
          { id: "m2-5", title: "Internal Assessment 1", maxScore: 20, weightage: 25, studentScore: 15, classAverage: 13.5, classHighest: 19 },
          { id: "m2-6", title: "Internal Assessment 2", maxScore: 20, weightage: 25, studentScore: 16, classAverage: 14.0, classHighest: 19 },
        ]
      },
    ],
    assignments: [
      {
        id: "asg-201",
        subjectCode: "CS201",
        subjectName: "Data Structures",
        title: "Self-Balancing AVL Tree Implementation with Generic Templates",
        description: "Implement left-right rotations and duplicate handling.",
        dueDate: "Apr 18, 2024",
        rawDueDate: "2024-04-18T23:59:00",
        status: "GRADED",
        priority: "HIGH",
        maxScore: 100,
        scoreAwarded: 96,
        feedback: "Excellent memory leak checks with Valgrind."
      },
      {
        id: "asg-202",
        subjectCode: "MA201",
        subjectName: "Discrete Math",
        title: "Dijkstra and Prim's Minimum Spanning Tree Proofs",
        description: "Formal induction proofs and adjacency list algorithm.",
        dueDate: "Mar 25, 2024",
        rawDueDate: "2024-03-25T23:59:00",
        status: "GRADED",
        priority: "MEDIUM",
        maxScore: 100,
        scoreAwarded: 93,
        feedback: "Rigorous mathematical proof structure."
      }
    ],
    backlogs: [],
    studySessions: []
  },

  // ==========================================
  // SEMESTER 1 (COMPLETED - 2023-2024 FALL)
  // ==========================================
  1: {
    semesterNumber: 1,
    academicYear: "2023-2024",
    attendance: [
      { id: "att-cs101", code: "CS101", name: "Problem Solving & Programming in C", instructor: "Dr. Arvind", attended: 36, total: 38, minRequiredPct: 75, credits: 4, history: [] },
      { id: "att-ma101", code: "MA101", name: "Engineering Calculus & Linear Algebra", instructor: "Dr. Roy", attended: 34, total: 38, minRequiredPct: 75, credits: 4, history: [] },
      { id: "att-ph101", code: "PH101", name: "Engineering Physics & Optics", instructor: "Prof. Das", attended: 32, total: 36, minRequiredPct: 75, credits: 4, history: [] },
      { id: "att-ee101", code: "EE101", name: "Basic Electrical Engineering", instructor: "Dr. Rao", attended: 31, total: 35, minRequiredPct: 75, credits: 4, history: [] },
      { id: "att-cs102", code: "CS102", name: "C Programming Laboratory", instructor: "Dr. Arvind", attended: 16, total: 16, minRequiredPct: 75, credits: 2, history: [] },
    ],
    marks: [
      {
        subjectId: "cs101",
        code: "CS101",
        name: "Problem Solving & Programming in C",
        maxInternalScore: 40,
        totalInternalScore: 36,
        classAverageTotal: 28.5,
        gradeEstimate: "A+",
        assessments: [
          { id: "m1-1", title: "Internal Assessment 1", maxScore: 20, weightage: 25, studentScore: 18, classAverage: 14.0, classHighest: 20 },
          { id: "m1-2", title: "Internal Assessment 2", maxScore: 20, weightage: 25, studentScore: 18, classAverage: 14.5, classHighest: 20 },
        ]
      },
      {
        subjectId: "ma101",
        code: "MA101",
        name: "Engineering Calculus & Linear Algebra",
        maxInternalScore: 40,
        totalInternalScore: 34,
        classAverageTotal: 27.5,
        gradeEstimate: "A",
        assessments: [
          { id: "m1-3", title: "Internal Assessment 1", maxScore: 20, weightage: 25, studentScore: 17, classAverage: 13.5, classHighest: 20 },
          { id: "m1-4", title: "Internal Assessment 2", maxScore: 20, weightage: 25, studentScore: 17, classAverage: 14.0, classHighest: 20 },
        ]
      },
      {
        subjectId: "ph101",
        code: "PH101",
        name: "Engineering Physics & Optics",
        maxInternalScore: 40,
        totalInternalScore: 32,
        classAverageTotal: 28.0,
        gradeEstimate: "A",
        assessments: [
          { id: "m1-5", title: "Internal Assessment 1", maxScore: 20, weightage: 25, studentScore: 16, classAverage: 14.0, classHighest: 19 },
          { id: "m1-6", title: "Internal Assessment 2", maxScore: 20, weightage: 25, studentScore: 16, classAverage: 14.0, classHighest: 20 },
        ]
      },
    ],
    assignments: [
      {
        id: "asg-101",
        subjectCode: "CS101",
        subjectName: "C Programming",
        title: "Student Database Record Management System in C",
        description: "File I/O binary file serialization and search by roll number.",
        dueDate: "Nov 20, 2023",
        rawDueDate: "2023-11-20T23:59:00",
        status: "GRADED",
        priority: "HIGH",
        maxScore: 100,
        scoreAwarded: 98,
        feedback: "Clean code structure and defensive file pointer error checks."
      },
      {
        id: "asg-102",
        subjectCode: "MA101",
        subjectName: "Calculus",
        title: "Eigenvalues & Eigenvectors Numerical Computation Lab",
        description: "Matrix diagonalization and Cayley-Hamilton theorem verification.",
        dueDate: "Oct 15, 2023",
        rawDueDate: "2023-10-15T23:59:00",
        status: "GRADED",
        priority: "MEDIUM",
        maxScore: 100,
        scoreAwarded: 92,
        feedback: "Accurate matrix transformations."
      }
    ],
    backlogs: [],
    studySessions: []
  }
};
