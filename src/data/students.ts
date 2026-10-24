import type { Student } from "../ProfileCard";

// Fictional students for the demo. None of these people are real.
export const CANDIDATE_STUDENTS: Student[] = [
  {
    id: "stu_101",
    name: "Maya Rivera",
    grade: 10,
    subjects: ["Algebra II", "Chemistry"],
    avatarUrl: "/avatars/maya.svg",
    zip: "95112",
    bio: "Loves flashcards and quiet library sessions after school.",
  },
  {
    id: "stu_102",
    name: "Jordan Lee",
    grade: 11,
    subjects: ["AP Biology", "Chemistry"],
    avatarUrl: "/avatars/jordan.svg",
    zip: "95192",
    bio: "Prepping for the AP Bio exam and happy to quiz partners.",
  },
  {
    id: "stu_103",
    name: "Priya Shah",
    grade: 10,
    subjects: ["Algebra II", "World History"],
    avatarUrl: "/avatars/priya.svg",
    zip: "95112",
    bio: "Makes color-coded notes and shares them with everyone.",
  },
  {
    id: "stu_104",
    name: "Diego Morales",
    grade: 9,
    subjects: ["Geometry", "English"],
    avatarUrl: "/avatars/diego.svg",
    zip: "95035",
    bio: "Prefers video calls on weekends; great at essay outlines.",
  },
  {
    id: "stu_105",
    name: "Ava Kim",
    grade: 12,
    subjects: ["AP Calculus", "Physics"],
    avatarUrl: "/avatars/ava.svg",
    zip: "95014",
    bio: "Working through practice exams every Sunday afternoon.",
  },
];

export const SUBJECT_OPTIONS = [
  "Algebra II",
  "Geometry",
  "AP Calculus",
  "Chemistry",
  "AP Biology",
  "Physics",
  "World History",
  "English",
];
