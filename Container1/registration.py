"""
REFERENCES:
1. https://console.firebase.google.com/
2. https://www.youtube.com/watch?v=mNMv3WNgp0c
"""

import firebase_admin
from firebase_admin import firestore
from firebase_admin import credentials
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Initialize Firebase
cred = credentials.Certificate(os.environ['GOOGLE_APPLICATION_CREDENTIALS'])
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://b00932103-csci5410-default-rtdb.firebaseio.com/'
})

# Initialize Firestore database
db = firestore.client()

@app.route('/register', methods=['POST'])
def register():
    try:
        # Get registration data from request
        registration_data = request.get_json()
        email = registration_data['email']

        # Check if email already exists
        query = db.collection('Reg').where('email', '==', email)
        snapshot = query.get()

        if snapshot:
            # Email already exists, return an error message
            return jsonify({'error': 'Email already exists'}), 400

        # Add new registration to the Firestore collection
        reg_ref = db.collection('Reg').document(email)
        reg_ref.set({
            'name': registration_data['name'],
            'email': email,
            'password': registration_data['password'],
            'location': registration_data['location']
        })

        # Return a success message
        return jsonify({'message': 'Registration successful'}), 200

    except Exception as e:
        # Handle any unexpected errors and return an error response
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0')
