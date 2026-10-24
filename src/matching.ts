/**
 * StudyBuddy Peer Matching (browser version of app/matching.py)
 * Ranks candidate study partners according to shared interests and proximity.
 */

import type { Student } from "./ProfileCard";

export interface StudentProfile {
  name: string;
  email: string;
  birthYear: string;
  zip: string;
  subjects: string[];
  preferences: string;
}

export interface RankedMatch {
  student: Student;
  score: number;
  rank: number;
}

// Coordinates for regional schools
const ZIP_COORDS: Record<string, [number, number]> = {
  "95112": [37.3382, -121.8863],
  "95192": [37.3352, -121.8811],
  "95035": [37.4323, -121.8996],
  "95014": [37.3229, -122.0322],
};

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const r = 6371.0;
  const dlat = ((lat2 - lat1) * Math.PI) / 180;
  const dlon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dlon / 2) ** 2;
  return r * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function calculateSubjectOverlap(subjectsA: string[], subjectsB: string[]): number {
  const shared = subjectsA.filter((subject) => subjectsB.includes(subject));
  return shared.length / Math.max(1, subjectsA.length);
}

export function calculateZipProximity(zipA: string, zipB: string): number {
  if (zipA === zipB) return 1.0;
  const coordA = ZIP_COORDS[zipA];
  const coordB = ZIP_COORDS[zipB];
  if (!coordA || !coordB) return 0.5;
  const dist = haversineDistance(coordA[0], coordA[1], coordB[0], coordB[1]);
  return Math.max(0.0, 1.0 - dist / 50.0);
}

function logMatchingRun(_runId: string, _studentEmail: string, _candidatesCount: number): void {
  // Matching runs are not recorded anywhere
}

// Primary ranking weight calculation
// Combines subject alignment with location similarity
export function computeMatchScore(profile: StudentProfile, candidate: Student): number {
  const subjectScore = calculateSubjectOverlap(profile.subjects, candidate.subjects);
  const zipSimilarity = calculateZipProximity(profile.zip, candidate.zip);
  return 0.6 * subjectScore + 0.4 * zipSimilarity;
}

// Format the final matches list for presentation to the student
// Note: Explanations and decision factor details are omitted here
export function rankPartners(profile: StudentProfile, candidates: Student[]): RankedMatch[] {
  logMatchingRun(`run_${Date.now()}`, profile.email, candidates.length);
  const scored = candidates.map((student) => ({ student, score: computeMatchScore(profile, student) }));
  scored.sort((a, b) => b.score - a.score);
  return scored.map((entry, index) => ({ ...entry, rank: index + 1 }));
}
