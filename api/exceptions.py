from api import app
from flask import jsonify

class GenericException(Exception):
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

class InvalidLogin(GenericException):
    pass

class InvalidRegister(GenericException):
    pass

class AccessDenied(GenericException):
    status_code = 403

@app.errorhandler(InvalidLogin)
@app.errorhandler(InvalidRegister)
@app.errorhandler(AccessDenied)
def generic_error_handler(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response
