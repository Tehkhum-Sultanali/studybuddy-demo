"""StudyBuddy Account Management
Handles user registration, authentication, and profiles.
"""

from datetime import datetime
import hashlib
import json

class Database:
    def __init__(self):
        self.users = {}

    def create(self, **kwargs):
        user_id = f"usr_{len(self.users) + 1}"
        record = {"id": user_id, **kwargs, "created_at": datetime.utcnow().isoformat()}
        self.users[user_id] = record
        return record

db = Database()


def create_account(user):
    import datetime

    birthday = user["birthday"]

    today = datetime.date.today()
    age = today.year - birthday.year - (
        (today.month, today.day) < (birthday.month, birthday.day)
    )

    if age < 13 and not user.get("parental_consent_verified"):
        raise ValueError(
            "Users under 13 require verified parental consent before account creation."
        )

    account = db.create(
        name=user["name"],
        birthday=birthday
    )

    return account
