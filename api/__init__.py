import os
import secrets
import sqlite3
# import requests
import sys
from datetime import datetime

from flask import Flask, json, jsonify, redirect, request, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)
"""
Migration usage: 
flask db migrate -m "migration message"
flask db upgrade
"""

import api.routes
