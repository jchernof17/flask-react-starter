from api import app, db
from flask import request, json, jsonify
from api.models import User
from passlib.hash import sha256_crypt
from api.exceptions import InvalidLogin, InvalidRegister, AccessDenied
import secrets

@app.route("/login", methods=['POST'])
def login():
    body = request.get_json()
    # look up a user with that email and password
    email, password = body['email'], body['password']
    user = User.query.filter_by(email=email).first()
    # if no user found, send an error response
    if (not user or not sha256_crypt.verify(password, user.password)):
        raise InvalidLogin('No user found', 401)

    # if user found, format their user dict and send back
    else:
        user_dict = {'id': user.id, 'email': user.email, 'purpose': user.purpose, 'token': user.token, 'name': user.name}
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
    password = sha256_crypt.hash(body['password'])
    name = body['name']
    role = body.get('role', 1)
    purpose = body['purpose']
    token = str(secrets.token_hex(15))
    user = User(name=name, role=role, purpose=purpose, password=password, email=email, token=token)
    db.session.add(user)
    db.session.commit()
    id = user.id
    user_dict = {'id': user.id, 'email': user.email, 'purpose': user.purpose, 'token': token, 'name': name}
    response = app.response_class(
        response=json.dumps({"user": user_dict}),
        mimetype='application/json'
    )
    return response

@app.route("/access", methods=['GET'])
def access():
    body = request.get_json()
    token = body['token']
    access_level = body['access_level']
    user = User.query.filter_by(token=token).first()
    if not user or user.id != access_level:
        raise AccessDenied('You don\'t have the permission to access this resource', 403)
    response = app.response_class(
        response=json.dumps({"info": 0}),
        mimetype='application/json'
    )
    return response
