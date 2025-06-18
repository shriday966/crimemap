import json
import datetime
import os
import subprocess

# Dummy data – replace this with your real scraping logic
data = {
    "last_updated": str(datetime.datetime.now()),
    "crimes": [
        {"title": "Robbery in Delhi", "status": "Unsolved"},
        {"title": "Fraud in Mumbai", "status": "Solved"}
    ]
}

# Save to data.json
with open("data.json", "w") as f:
    json.dump(data, f, indent=2)

# Git commit & push
def git_push():
    try:
        subprocess.run(["git", "add", "."], check=True)
        subprocess.run(["git", "commit", "-m", "Auto update crime data"], check=True)
        subprocess.run(["git", "push", "origin", "main"], check=True)
    except subprocess.CalledProcessError as e:
        print("Git error:", e)

git_push()
