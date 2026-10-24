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
    birthday = user["birthday"]

    account = db.create(
        name=user["name"],
        birthday=birthday
    )

    return account
