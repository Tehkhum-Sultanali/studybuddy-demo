import { useMemo, useState } from "react";
import { Signup } from "./Signup";
import { StudyPartners } from "./components/StudyPartners";
import { ChatAssistant } from "./components/ChatAssistant";
import { CANDIDATE_STUDENTS } from "./data/students";
import { rankPartners } from "./matching";
import type { StudentProfile } from "./matching";

// Shown until the visitor signs up, so the matches and chat have something to work with
const SAMPLE_PROFILE: StudentProfile = {
  name: "Alex Student",
  email: "alex@student.example",
  birthYear: "2010",
  zip: "95112",
  subjects: ["Algebra II", "Chemistry"],
  preferences: "After school, in person",
};

export default function App() {
  const [profile, setProfile] = useState<StudentProfile>(SAMPLE_PROFILE);
  const [connectedIds, setConnectedIds] = useState<string[]>([]);

  const matches = useMemo(() => rankPartners(profile, CANDIDATE_STUDENTS), [profile]);

  const connect = (id: string) => {
    setConnectedIds((current) => (current.includes(id) ? current : [...current, id]));
  };

  // The assistant connects the student with their top-ranked match without asking first
  const autoConnectTopMatch = () => {
    if (matches.length > 0) connect(matches[0].student.id);
  };

  return (
    <div className="page">
      <header className="site-header">
        <div className="brand">
          <span className="brand-mark">SB</span>
          <span className="brand-name">StudyBuddy</span>
        </div>
        <nav className="site-nav">
          <a href="#signup">Sign up</a>
          <a href="#partners">Matches</a>
          <a href="#chat">Chat</a>
        </nav>
        <div className="header-help" onClick={() => document.getElementById("chat")?.scrollIntoView({ behavior: "smooth" })}>
          Need help?
        </div>
      </header>

      <main>
        <section className="hero">
          <h1>StudyBuddy</h1>
          <p className="hero-tagline">Find the right study partner with AI.</p>
          <p className="hero-sub">
            Tell us your classes and where you study. We'll match you with classmates who can help you ace your next test.
          </p>
          <div className="hero-actions">
            <a className="button-primary" href="#signup">Get started</a>
            <a className="button-secondary" href="#partners">See matches</a>
          </div>
        </section>

        <div className="layout">
          <div id="signup">
            <Signup onSuccess={(newProfile) => { setProfile(newProfile); setConnectedIds([]); }} />
          </div>
          <StudyPartners
            matches={matches}
            userZip={profile.zip}
            connectedIds={connectedIds}
            onConnect={connect}
          />
        </div>

        <ChatAssistant profile={profile} onAutoConnect={autoConnectTopMatch} />
      </main>

      <footer className="site-footer">
        <p className="footer-note">© 2026 StudyBuddy · Made for high school students</p>
      </footer>
    </div>
  );
}
