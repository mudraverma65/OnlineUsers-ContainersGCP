import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
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

# db = firestore.client()

@app.route('/login', methods=['POST'])
def login():
    login_data = request.get_json()

    ref = db.reference('Reg')
    # ref = db.collection('Reg')
    registrations = ref.get()

    for registration_key, registration_value in registrations.items():
        if (
            registration_value['email'] == login_data['email']
            and registration_value['password'] == login_data['password']
        ):
            state_ref = db.reference('state')
            state_ref.set({
            # state_ref.document().create({
                'email': registration_value['email'],
                'online': True,
                'offline': False,
                'timestamp': datetime.now().isoformat()
            })
            return {'message': 'Login successful'}
    return {'message': 'Invalid email or password'}

if __name__ == '__main__':
    app.run() 