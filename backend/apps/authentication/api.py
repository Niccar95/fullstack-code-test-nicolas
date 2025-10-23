from ninja import NinjaAPI, Schema
from ninja.security import django_auth
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

api = NinjaAPI(urls_namespace='auth')
class LoginSchema(Schema):
    username: str
    password: str
class RegisterSchema(Schema):
    username: str
    email: str
    password: str

@api.post("/login", response={200: dict, 401: dict})
def login_view(request, payload: LoginSchema):
    user = authenticate(request, username=payload.username, password=payload.password)
    if user is not None:
        login(request, user)

        refresh = RefreshToken.for_user(user)

        return {
            "success": True,
            "data": {
                "message": "User logged in successfully",
                "access_token": str(refresh.access_token),
                "refresh_token": str(refresh),
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email
                }
            }
        }
    return 401, {"success": False, "message": "Invalid credentials"}


@api.post("/logout", auth=django_auth)
def logout_view(request):
    logout(request)
    return {"message": "Logged out"}

@api.post("/register", response={200: dict, 400: dict})
def register(request, payload: RegisterSchema):
    if User.objects.filter(username=payload.username).exists():
        return 400, {"success": False, "message": "Username already exists"}

    if User.objects.filter(email=payload.email).exists():
        return 400, {"success": False, "message": "Email already exists"}

    user = User.objects.create_user(
        username=payload.username,
        email=payload.email,
        password=payload.password
    )

    refresh = RefreshToken.for_user(user)

    return {
        "success": True,
        "data": {
            "message": "User registered successfully",
            "access_token": str(refresh.access_token),
            "refresh_token": str(refresh),
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email
            }
        }
    }


