import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from flask import Flask, jsonify
from flask_cors import CORS
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

@app.route('/profile', methods=['GET'])
def get_online_users():
    # Get the state documents where online is true
    query = db.collection('state').where('online', '==', True)
    snapshot = query.get()

    onlineusers = []
    for doc in snapshot:
        user_data = doc.to_dict()
        onlineusers.append(user_data['email'])

    # Return the email IDs as JSON response
    return jsonify({'onlineusers': onlineusers})

if __name__ == '__main__':
    app.run(host='0.0.0.0')
