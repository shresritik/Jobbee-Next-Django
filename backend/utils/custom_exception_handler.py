from requests import Response
from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    exception__class = exc.__class__.__name__
    # print(exception__class)
    if exception__class == 'AuthenticationFailed':
        response.data = {
            "error": "Invalid Email or Password. Please try again."
        }
    if exception__class == 'NotAuthenticated':
        response.data = {
            "error": "Login first to access this resource."
        }
    if exception__class == 'InvalidToken':
        response.data = {
            "error": "Your authentication token is expired. Please login again."
        }
    return response
