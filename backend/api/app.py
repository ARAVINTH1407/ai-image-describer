from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)  # Enable CORS to allow communication with the frontend

@app.route('/api/test', methods=['GET'])
@cross_origin()  # Enable CORS for this route
def test():
    return jsonify({"message": "Backend is working!"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5001)

