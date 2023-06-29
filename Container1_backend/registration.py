import firebase_admin
from firebase_admin import firestore
from firebase_admin import credentials
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

cred = credentials.Certificate("C:/Users/dell/firebase/serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://b00932103-csci5410-default-rtdb.firebaseio.com/'
})

db = firestore.client()

@app.route('/register', methods=['POST'])
def register():
    registration_data = request.get_json()

    reg_ref = db.collection('Reg')
    reg_ref.add({
        'email': registration_data['email'],
        'location': registration_data['location'],
        'name': registration_data['name'],
        'password': registration_data['password'],
        })

    return {'message': 'Registration successful'}

if __name__ == '__main__':
    app.run()
