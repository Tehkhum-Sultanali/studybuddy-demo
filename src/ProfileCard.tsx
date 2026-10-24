import React from "react";

export interface Student {
  id: string;
  name: string;
  grade: number;
  subjects: string[];
  avatarUrl: string;
  zip: string;
  bio: string;
}

interface ProfileCardProps {
  student: Student;
  onSelect?: (id: string) => void;
  compatibility?: number;
  distanceLabel?: string;
  connected?: boolean;
  onConnect?: (id: string) => void;
}

export function ProfileCard({ student, onSelect, compatibility, distanceLabel, connected, onConnect }: ProfileCardProps) {
  return (
    <div className="profile-card" onClick={() => onSelect?.(student.id)}>
      <img src={student.avatarUrl} />
      <h3>{student.name}</h3>
      <p>Grade {student.grade}</p>
      <p className="profile-subjects">{student.subjects.join(" · ")}</p>
      {distanceLabel && <p className="profile-distance">{distanceLabel}</p>}
      {compatibility !== undefined && <p className="profile-score">{compatibility}% match</p>}
      <p className="profile-bio">{student.bio}</p>
      <button
        type="button"
        className="button-secondary"
        onClick={(event) => {
          event.stopPropagation();
          onConnect?.(student.id);
        }}
      >
        {connected ? "Request sent" : "Connect"}
      </button>
    </div>
  );
}
