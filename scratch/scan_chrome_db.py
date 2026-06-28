import os
import re

profiles_dir = r"C:\Users\Guilherme\AppData\Local\Google\Chrome\User Data"
target_term = b"hostinger"
target_term_utf16 = "hostinger".encode("utf-16le")

found_occurrences = []

for root, dirs, files in os.walk(profiles_dir):
    if "Local Storage" in root and "leveldb" in root:
        for file in files:
            file_path = os.path.join(root, file)
            try:
                with open(file_path, "rb") as f:
                    content = f.read()
                    if target_term in content or target_term_utf16 in content:
                        print(f"Found match in: {file_path}")
                        found_occurrences.append(file_path)
            except Exception as e:
                pass

print(f"Total files with match: {len(found_occurrences)}")
