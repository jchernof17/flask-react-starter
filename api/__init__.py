import os
import secrets
import sqlite3
# import requests
import sys
from datetime import datetime

from flask import Flask, json, jsonify, redirect, request, url_for
from flask_sqlalchemy import SQLAlchemy

from passlib.hash import sha256_crypt

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

import api.routes
