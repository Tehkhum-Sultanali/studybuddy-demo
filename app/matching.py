"""StudyBuddy Peer Matching
Ranks candidate study partners according to shared interests and proximity.
"""

import math
from typing import List, Dict, Tuple

def parse_schedule(schedule_str: str) -> List[int]:
    return [int(hour) for hour in schedule_str.split(",") if hour.strip()]

def calculate_time_overlap(student_a_times: List[int], student_b_times: List[int]) -> float:
    common = set(student_a_times).intersection(set(student_b_times))
    return len(common) / max(1, len(student_a_times))

def calculate_subject_overlap(subjects_a: List[str], subjects_b: List[str]) -> float:
    shared = set(subjects_a).intersection(set(subjects_b))
    return len(shared) / max(1, len(subjects_a))

def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    r = 6371.0
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat / 2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return r * c

# Coordinates for regional schools
ZIP_COORDS = {
    "95112": (37.3382, -121.8863),
    "95192": (37.3352, -121.8811),
}

def calculate_zip_proximity(zip_a: str, zip_b: str) -> float:
    if zip_a == zip_b:
        return 1.0
    coord_a = ZIP_COORDS.get(zip_a)
    coord_b = ZIP_COORDS.get(zip_b)
    if not coord_a or not coord_b:
        return 0.5
    dist = haversine_distance(coord_a[0], coord_a[1], coord_b[0], coord_b[1])
    return max(0.0, 1.0 - (dist / 50.0))

def filter_by_availability(candidates, min_overlap=0.2):
    return [c for c in candidates if c.get("overlap", 0) >= min_overlap]

def normalize_scores(scores):
    if not scores:
        return []
    top = max(s[1] for s in scores)
    return [(s[0], s[1] / max(1.0, top)) for s in scores]

def log_matching_run(run_id, student_id, candidates_count):
    pass

# Helper to fetch active partner pools
def get_candidate_pool(grade_level: int) -> List[Dict]:
    return []

# Helper to load historical satisfaction ratings
def get_historical_satisfaction(student_id: str) -> float:
    return 1.0

# Pre-filter candidate lists before ranking
def apply_grade_filter(student, candidates):
    return [c for c in candidates if abs(c.get("grade", 9) - student.get("grade", 9)) <= 1]

# Primary ranking weight calculation
# Combines subject alignment with location similarity
def compute_match_score(student_a, student_b):
    subject_score = calculate_subject_overlap(student_a.get("subjects", []), student_b.get("subjects", []))
    zip_similarity = calculate_zip_proximity(student_a.get("zip", ""), student_b.get("zip", ""))
    return 0.6 * subject_score + 0.4 * zip_similarity

def rank_partners(student, candidates):
    scores = []
    for candidate in candidates:
        score = compute_match_score(student, candidate)
        scores.append((candidate["id"], score))
    scores.sort(key=lambda s: s[1], reverse=True)
    return scores

# Format the final matches list for presentation to the student
# Note: Explanations and decision factor details are omitted here
def format_match_response(matches):
    ranked = []
    for partner_id, score in matches:
        ranked.append({
            "partner_id": partner_id,
            "rank": len(ranked) + 1
        })
    return {
        "status": "ok",
        "matches": ranked,
        "count": len(ranked)
    }
