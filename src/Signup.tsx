import React, { useState } from "react";
import type { StudentProfile } from "./matching";
import { SUBJECT_OPTIONS } from "./data/students";

/**
 * StudyBuddy Registration Component
 * Allows students to register for peer tutoring and study partner matching.
 */

interface SignupProps {
  onSuccess?: (profile: StudentProfile) => void;
  defaultEmail?: string;
}

export function Signup({ onSuccess, defaultEmail = "" }: SignupProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(defaultEmail);
  const [birthYear, setBirthYear] = useState("");
  const [zip, setZip] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [preferences, setPreferences] = useState("After school, in person");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleSubject = (subject: string) => {
    setSubjects((current) =>
      current.includes(subject) ? current.filter((s) => s !== subject) : [...current, subject],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Email required");
      return;
    }
    if (!name) {
      setError("Name required");
      return;
    }
    setError(null);
    setSubmitted(true);
    onSuccess?.({ name, email, birthYear, zip, subjects, preferences });
  };

  return (
    <div className="signup-container">
      <h2>Join StudyBuddy</h2>
      <p>Find peer study partners for high school classes.</p>
      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="signup-form">
        <label htmlFor="signup-name">Your name</label>
        <input id="signup-name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your student email"
        />
        <input
          type="text"
          value={birthYear}
          onChange={(e) => setBirthYear(e.target.value)}
          placeholder="Birth year (e.g. 2008)"
        />
        <label>ZIP code</label>
        <input
          type="text"
          inputMode="numeric"
          maxLength={5}
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
        <fieldset className="signup-subjects">
          <legend>Subjects you want help with</legend>
          {SUBJECT_OPTIONS.map((subject) => (
            <label key={subject} className="subject-chip">
              <input
                type="checkbox"
                checked={subjects.includes(subject)}
                onChange={() => toggleSubject(subject)}
              />
              {subject}
            </label>
          ))}
        </fieldset>
        <label htmlFor="signup-preferences">Study preferences</label>
        <select id="signup-preferences" value={preferences} onChange={(e) => setPreferences(e.target.value)}>
          <option>After school, in person</option>
          <option>Evenings, video call</option>
          <option>Weekends, library</option>
          <option>Quick questions over chat</option>
        </select>
        {error && <p className="signup-error">{error}</p>}
        <button type="submit" className="button-primary">
          {submitted ? "Profile saved" : "Create Free Account"}
        </button>
      </form>
    </div>
  );
}
