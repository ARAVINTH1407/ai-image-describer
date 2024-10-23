from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from msrest.authentication import CognitiveServicesCredentials
import os
import pyodbc
from dotenv import load_dotenv
from PIL import Image

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads/'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Load environment variables
load_dotenv()

# Azure Cognitive Services credentials
subscription_key = os.getenv("AZURE_SUBSCRIPTION_KEY")
endpoint = os.getenv("AZURE_ENDPOINT")

# Database connection string
database_url = os.getenv("DATABASE_URL")

# Initialize the Azure Computer Vision client
computervision_client = ComputerVisionClient(endpoint, CognitiveServicesCredentials(subscription_key))

@app.route('/api/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({"message": "No image part in the request"}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({"message": "No image selected for uploading"}), 400

    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)

    # Use Azure Cognitive Services to analyze the image
    description = process_image(file_path)

    # Store image and description in the database
    store_image_history(file_path, description)

    return jsonify({"message": "Image uploaded successfully!", "description": description}), 200

def process_image(image_path):
    """
    Send the image to Azure Computer Vision API and get the description.
    """
    try:
        with open(image_path, "rb") as image_stream:
            analysis = computervision_client.describe_image_in_stream(image_stream)
            if len(analysis.captions) > 0:
                return analysis.captions[0].text
            else:
                return "No description could be generated."
    except Exception as e:
        return str(e)

def store_image_history(image_path, description):
    """
    Store the image path and description in the SQL database.
    """
    try:
        conn = pyodbc.connect(database_url)
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO image_history (image_path, description) VALUES (?, ?)",
            (image_path, description)
        )
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"Error storing image history: {str(e)}")

# Add a route to serve images from the uploads directory
@app.route('/uploads/<path:filename>', methods=['GET'])
def serve_uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Fetch the image upload history
@app.route('/api/history', methods=['GET'])
def get_history():
    """
    Fetch the image upload history from the database.
    """
    try:
        conn = pyodbc.connect(database_url)
        cursor = conn.cursor()
        cursor.execute("SELECT id, image_path, description, upload_time FROM image_history")
        history = cursor.fetchall()
        conn.close()

        # Convert to a list of dictionaries
        result = []
        for row in history:
            result.append({
                "id": row[0],
                "image_path": row[1],
                "description": row[2],
                "upload_time": row[3]
            })

        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
