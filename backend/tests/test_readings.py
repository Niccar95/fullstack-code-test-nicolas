import pytest
from django.test import Client
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

@pytest.mark.django_db
def test_create_reading():
    
    user = User.objects.create_user(username='test', password='password123')
    refresh = RefreshToken.for_user(user)
    token = str(refresh.access_token)
    
    client = Client()
    
    sensor_response = client.post('/api/sensors', {
        'name': 'device-001',
        'model': 'EnviroSense',
        'description': 'Testtesttest'
    }, 
    content_type='application/json',
    HTTP_AUTHORIZATION=f'Bearer {token}'
    )
    
    sensor_id = sensor_response.json()['id']
    
      
    response = client.post(f'/api/sensors/{sensor_id}/readings', {
        'sensor': 'device-001',
        'temperature': '23.75',
        'humidity': '45.29',
        'timestamp': '2024-08-01'
    }, 
    content_type='application/json',
    HTTP_AUTHORIZATION=f'Bearer {token}'
    )
    
    assert response.status_code == 200
    data = response.json()
    assert data

@pytest.mark.django_db
def test_filter_readings():
    
    user = User.objects.create_user(username='test', password='password123')
    refresh = RefreshToken.for_user(user)
    token = str(refresh.access_token)
    
    client = Client()
    
    sensor_response = client.post('/api/sensors', {
        'name': 'device-001',
        'model': 'EnviroSense',
        'description': 'Testtesttest'
    }, 
    content_type='application/json',
    HTTP_AUTHORIZATION=f'Bearer {token}'
    )
    
    sensor_id = sensor_response.json()['id']
    
    readings_data = [
        {'temperature': 20, 'humidity': 40, 'timestamp': '2024-08-15'},
        {'temperature': 25, 'humidity': 50, 'timestamp': '2024-09-15'},
        {'temperature': 30, 'humidity': 60, 'timestamp': '2024-08-20'},
        ]
    
    for reading in readings_data:
        client.post(f'/api/sensors/{sensor_id}/readings', reading, 
                    content_type='application/json',
                    HTTP_AUTHORIZATION=f'Bearer {token}'
                    )
        
        
    filtered_readings = client.get(f'/api/sensors/{sensor_id}/readings', {
        'timestamp_from': '2024-08-01', 'timestamp_to': '2024-08-31'
        },
        HTTP_AUTHORIZATION=f'Bearer {token}'
        )
    assert filtered_readings.status_code == 200
    data = filtered_readings.json()
    assert len(data) == 2