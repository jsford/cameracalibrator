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

@app.route('/patterns')
def patterns():
    return render_template('patterns.html', title='Pattern Generator')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/favicon')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static', 'images'), 'favicon.ico')
