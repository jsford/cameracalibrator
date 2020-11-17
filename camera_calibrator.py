#! /usr/bin/env python3
import sys
import logging
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0, "/var/www/html/com.cameracalibrator")

from app import app
app.secret_key = 'doobleydoobleydoo9128374120947'

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=80, use_reloader=False);
