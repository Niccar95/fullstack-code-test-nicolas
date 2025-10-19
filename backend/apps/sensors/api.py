from typing import List
from apps.sensors.models import Sensor
from ninja import NinjaAPI, Schema
from ninja.security import HttpBearer 
from rest_framework_simplejwt.tokens import AccessToken

api = NinjaAPI(urls_namespace='sensors')

class SensorSchema(Schema):
    name: str
    description: str = None
    model: str

class SensorSchemaList(Schema):
    id: int
    name: str
    model: str
    description: str = None 
    
    
class JWTAuth(HttpBearer):
    def authenticate(self, request, token):
        try:
            access_token = AccessToken(token)
            user_id = access_token['user_id']
            from django.contrib.auth.models import User
            return User.objects.get(id=user_id)
        except:
            return None

@api.post("/sensors", auth=JWTAuth())
def create_sensor(request, payload: SensorSchema):
    sensor =  Sensor.objects.create(
        owner=request.auth,
        name = payload.name,
        description = payload.description,
        model = payload.model,
    )

    return {"success": True, "id": sensor.id, "name": sensor.name}


@api.get("/sensors", auth=JWTAuth(), response=List[SensorSchemaList])
def list_sensors(request, page: int = 1, page_size: int = 10, q: str = None):

    sensors = Sensor.objects.filter(owner=request.auth)
    
    if q:
        sensors = sensors.filter(name__icontains=q) | sensors.filter(model__icontains=q)
    
    start = (page - 1) * page_size
    end = start + page_size
    sensors = sensors[start:end]
    
    return sensors

@api.get("/sensors/{sensor_id}", auth=JWTAuth(), response=SensorSchemaList)
def get_sensor(request, sensor_id: int):
    sensor = Sensor.objects.get(id=sensor_id, owner=request.auth)
    return sensor

@api.put("/sensors/{sensor_id}", auth=JWTAuth(), response=SensorSchemaList)
def update_sensor(request, sensor_id: int, payload: SensorSchema):
    sensor = Sensor.objects.get(id=sensor_id, owner=request.auth)
    
    sensor.name = payload.name
    sensor.description = payload.description
    sensor.model = payload.model
    
    sensor.save()
    
    return sensor

@api.delete("/sensors/{sensor_id}", auth=JWTAuth())
def delete_sensor(request, sensor_id: int):
    sensor = Sensor.objects.get(id=sensor_id, owner=request.auth)

    sensor.delete()
    return {"success": True}