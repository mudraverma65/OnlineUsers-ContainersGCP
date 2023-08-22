Online Users system using GCP, Containerization and Firestore.

### Containers
1. Container 1: Collects registration info from frontend and stores in backend firestore database.
2. Container 2: Validates Login Information
3. Container 3: Extracts state information from database i.e. users currentl online and sends data to frontend. Maintains session from login to logout. Once logged out the state in updated in the firestore database.

This is Assignment 2 for CSCI 5410 - Serverless Data Processing.
