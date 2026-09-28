
export const dashboardStats = [
  {
    id: "appointments",
    label: "Today's Appointments",
    value: 12,
    description: "Scheduled for today",
    icon: "CalendarDays",
    color: "blue",
  },
  {
    id: "patients",
    label: "Total Patients",
    value: 248,
    description: "Registered patients",
    icon: "Users",
    color: "violet",
  },
  {
    id: "pending",
    label: "Pending Consultations",
    value: 4,
    description: "Awaiting completion",
    icon: "ClipboardList",
    color: "amber",
  },
  {
    id: "completed",
    label: "Completed Today",
    value: 8,
    description: "Consultations completed",
    icon: "CheckCircle2",
    color: "emerald",
  },
];

export const todayAppointments = [
  {
    id: "APT-001",
    patientName: "Aarav Sharma",
    patientId: "PAT-1001",
    time: "09:00 AM",
    type: "Follow-up",
    status: "Completed",
  },
  {
    id: "APT-002",
    patientName: "Priya Verma",
    patientId: "PAT-1002",
    time: "09:30 AM",
    type: "General Checkup",
    status: "In Progress",
  },
  {
    id: "APT-003",
    patientName: "Rohan Mehta",
    patientId: "PAT-1003",
    time: "10:00 AM",
    type: "Consultation",
    status: "Upcoming",
  },
  {
    id: "APT-004",
    patientName: "Ananya Gupta",
    patientId: "PAT-1004",
    time: "10:30 AM",
    type: "Follow-up",
    status: "Upcoming",
  },
  {
    id: "APT-005",
    patientName: "Kabir Singh",
    patientId: "PAT-1005",
    time: "11:00 AM",
    type: "General Checkup",
    status: "Upcoming",
  },
];

export const recentPatients = [
  {
    id: "PAT-1001",
    name: "Aarav Sharma",
    age: 34,
    gender: "Male",
    lastVisit: "Today, 09:00 AM",
    condition: "Hypertension",
  },
  {
    id: "PAT-1002",
    name: "Priya Verma",
    age: 28,
    gender: "Female",
    lastVisit: "Today, 09:30 AM",
    condition: "Migraine",
  },
  {
    id: "PAT-1003",
    name: "Rohan Mehta",
    age: 45,
    gender: "Male",
    lastVisit: "Yesterday",
    condition: "Type 2 Diabetes",
  },
  {
    id: "PAT-1004",
    name: "Ananya Gupta",
    age: 31,
    gender: "Female",
    lastVisit: "Yesterday",
    condition: "Asthma",
  },
];
