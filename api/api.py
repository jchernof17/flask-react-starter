from flask import Flask, redirect, request, url_for, jsonify, json
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
# import requests
import sys
import os
import sqlite3
import secrets


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db = SQLAlchemy(app)

class InvalidLogin(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv

class InvalidRegister(InvalidLogin):
    pass

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    purpose = db.Column(db.String(140), nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    role = db.Column(db.Integer, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    token = db.Column(db.String(80), unique=True, nullable=False)

    def __repr__(self):
        return '<User: ' + str(self.id) + '(' + self.name + ')>'

@app.errorhandler(InvalidLogin)
def handle_invalid_login(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response

@app.errorhandler(InvalidRegister)
def handle_invalid_register(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response

@app.route("/login", methods=['POST'])
def login():
    body = request.get_json()
    # look up a user with that email and password
    email, password = body['email'], body['password']
    user = User.query.filter_by(email=email, password=password).first()

    # if no user found, send an error response
    if not user:
        raise InvalidLogin('No user found', 401)
    # if user found, format their user dict and send back
    else:
        user_dict = {'id': user.id, 'email': user.email, 'role': user.role, 'purpose': user.purpose, 'token': user.token, 'name': user.name}
        response = {'user': user_dict}
        return response

@app.route("/register", methods=['POST'])
def register():
    body = request.get_json()
    email = body['email']
    # if a user with this email already exists, send an error response
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        raise InvalidRegister('User with that email already exists', 403)
    password = body['password']
    name = body['name']
    role = body.get('role', 1)
    purpose = body['purpose']
    token = str(secrets.token_hex(15))
    user = User(name=name, role=role, purpose=purpose, password=password, email=email, token=token)
    db.session.add(user)
    db.session.commit()
    id = user.id
    user_dict = {'id': user.id, 'email': user.email, 'role': user.role, 'purpose': user.purpose, 'token': token, 'name': name}
    response = app.response_class(
        response=json.dumps({"user": user_dict}),
        mimetype='application/json'
    )
    return response
