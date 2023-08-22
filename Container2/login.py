"""
REFERENCES:
1. https://console.firebase.google.com/
2. https://www.youtube.com/watch?v=mNMv3WNgp0c
"""

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from flask import Flask, request, make_response
from flask_cors import CORS
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# Initialize Firestore client
cred = credentials.Certificate(os.environ['GOOGLE_APPLICATION_CREDENTIALS'])
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://b00932103-csci5410-default-rtdb.firebaseio.com/'
})

# Get Firestore client
db = firestore.client()

@app.route('/login', methods=['POST'])
def login():
    try:
        # Enable CORS headers
        response = make_response('')
        response.headers.add('Access-Control-Allow-Origin', 'https://a2-frontend-fb74xf24fq-uc.a.run.app:3000')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')

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

        return {'message': 'Invalid email or password'}, 401

    except Exception as e:
        # Handle any unexpected errors and return an error response
        return {'error': str(e)}, 500


@app.route('/logout', methods=['POST'])
def logout():
    try:
        # Enable CORS headers
        response = make_response('')
        response.headers.add('Access-Control-Allow-Origin', 'https://a2-frontend-fb74xf24fq-uc.a.run.app:3000')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')

        logout_data = request.get_json()

        # Update user state in the "state" collection
        state_ref = db.collection('state').document(logout_data['email'])
        state_ref.set({
            'online': False,
            'offline': True,
            'timestamp': datetime.now().isoformat()
        }, merge=True)

        return {'message': 'Logout successful'}

    except Exception as e:
        # Handle any unexpected errors and return an error response
        return {'error': str(e)}, 500


if __name__ == '__main__':
    app.run(host='0.0.0.0')
