from app import app
from flask import render_template, flash, redirect, url_for, request, send_from_directory, jsonify
import os

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/stereo')
def stereo():
    return render_template('stereo.html')

@app.route('/targets')
def targets():
    return render_template('targets.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/favicon')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static', 'images'), 'favicon.ico')

@app.route('/generateCalibrationTarget', methods=['POST'])
def generate_calibration_target():
    print(request.get_json())
    return "It works!\n"

