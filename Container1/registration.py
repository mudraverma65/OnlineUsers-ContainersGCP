import firebase_admin
from firebase_admin import firestore
from firebase_admin import credentials
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

cred = credentials.Certificate(os.environ['GOOGLE_APPLICATION_CREDENTIALS'])
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://b00932103-csci5410-default-rtdb.firebaseio.com/'
})

db = firestore.client()

@app.route('/register', methods=['POST'])
def register():
    registration_data = request.get_json()
    email = registration_data['email']

    # Check if email already exists
    query = db.collection('Reg').where('email', '==', email)
    snapshot = query.get()
    if snapshot:
        return {'error': 'Email already exists'}

    # Add new registration
    reg_ref = db.collection('Reg').document(email)
    reg_ref.set({
        'name': registration_data['name'],
        'email': email,
        'password': registration_data['password'],
        'location': registration_data['location']
    })

    return {'message': 'Registration successful'}

if __name__ == '__main__':
    app.run(host='0.0.0.0')
