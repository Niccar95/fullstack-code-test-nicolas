from ninja.security import HttpBearer
from rest_framework_simplejwt.tokens import AccessToken
from ninja import NinjaAPI, Schema
from datetime import datetime
from apps.readings.models import Reading
from apps.sensors.models import Sensor 


api = NinjaAPI(urls_namespace='readings')

class ReadingSchema(Schema):
    temperature: float
    humidity: float
    timestamp: datetime


class JWTAuth(HttpBearer):
    def authenticate(self, request, token):
        try:
            access_token = AccessToken(token)
            user_id = access_token['user_id']
            from django.contrib.auth.models import User
            return User.objects.get(id=user_id)
        except:
            return None

@api.get("/sensors/{sensor_id}/readings", auth=JWTAuth())
def list_readings(request, sensor_id: int, timestamp_from: datetime = None, timestamp_to: datetime = None):
    sensor = Sensor.objects.get(id=sensor_id, owner=request.auth)

    readings = Reading.objects.filter(sensor=sensor)

    if timestamp_from:
        readings = readings.filter(timestamp__gte=timestamp_from)
    if timestamp_to:
        readings = readings.filter(timestamp__lte=timestamp_to)

    readings_list = [
        {
            "id": reading.id,
            "sensor_id": reading.sensor.id,
            "temperature": reading.temperature,
            "humidity": reading.humidity,
            "timestamp": reading.timestamp
        }
        for reading in readings
    ]

    return {"success": True, "data": readings_list}

@api.post("/sensors/{sensor_id}/readings", auth=JWTAuth())
def create_reading(request, sensor_id: int, payload: ReadingSchema):
     sensor = Sensor.objects.get(id=sensor_id, owner=request.auth)

     reading = Reading.objects.create(
        sensor=sensor,
        temperature=payload.temperature,
        humidity=payload.humidity,
        timestamp=payload.timestamp
    )

     return {"success": True, "id": reading.id}
