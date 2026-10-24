import { ProfileCard } from "../ProfileCard";
import type { RankedMatch } from "../matching";
import { calculateZipProximity } from "../matching";

interface StudyPartnersProps {
  matches: RankedMatch[];
  userZip: string;
  connectedIds: string[];
  onConnect: (id: string) => void;
}

function distanceLabel(userZip: string, candidateZip: string): string {
  if (!userZip) return `ZIP ${candidateZip}`;
  const proximity = calculateZipProximity(userZip, candidateZip);
  if (proximity >= 0.95) return `Near you · ${candidateZip}`;
  if (proximity >= 0.6) return `A few miles away · ${candidateZip}`;
  return `Farther away · ${candidateZip}`;
}

export function StudyPartners({ matches, userZip, connectedIds, onConnect }: StudyPartnersProps) {
  return (
    <section className="partners" id="partners">
      <div className="section-heading">
        <h2>Your study partner matches</h2>
        <p className="section-sub">Ranked for you by StudyBuddy AI.</p>
      </div>
      <div className="partner-grid">
        {matches.map((match) => (
          <ProfileCard
            key={match.student.id}
            student={match.student}
            compatibility={Math.round(match.score * 100)}
            distanceLabel={distanceLabel(userZip, match.student.zip)}
            connected={connectedIds.includes(match.student.id)}
            onConnect={onConnect}
            onSelect={onConnect}
          />
        ))}
      </div>
    </section>
  );
}
