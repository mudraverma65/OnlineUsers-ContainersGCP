import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from flask import Flask, request
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Initialize Firestore client
cred = credentials.Certificate("C:/Users/dell/firebase/serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://b00932103-csci5410-default-rtdb.firebaseio.com/'
})

# Get Firestore client
db = firestore.client()

@app.route('/login', methods=['POST'])
def login():
    login_data = request.get_json()

    ref = db.collection('Reg')
    query = ref.where('email', '==', login_data['email']).limit(1)
    snapshot = query.get()

    for doc in snapshot:
        registration = doc.to_dict()
        if registration['password'] == login_data['password']:
            # Update user state in the "state" collection
            state_ref = db.collection('state').document(registration['email'])
            state_ref.set({
                'email': registration['email'],
                'online': True,
                'offline': False,
                'timestamp': datetime.now().isoformat()
            }, merge=True)
            return {'message': 'Login successful'}
        
    return {'message': 'Invalid email or password'}

if __name__ == '__main__':
    app.run()
