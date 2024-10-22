from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from PIL import Image

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads/'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/api/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({"message": "No image part in the request"}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({"message": "No image selected for uploading"}), 400

    # Save the image to the upload folder
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)

    # Process the image (placeholder for actual AI processing)
    description = process_image(file_path)

    return jsonify({"message": "Image uploaded successfully!", "description": description}), 200

def process_image(image_path):
    """
    Placeholder function to 'process' the image.
    This is where the AI model logic will go in the future.
    """
    try:
        img = Image.open(image_path)
        width, height = img.size
        return f"This image has a width of {width} pixels and a height of {height} pixels."
    except Exception as e:
        return "Unable to process image."

if __name__ == '__main__':
    app.run(debug=True, port=5001)
