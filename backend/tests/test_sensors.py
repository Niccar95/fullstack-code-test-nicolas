import pytest
from django.test import Client
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

@pytest.mark.django_db
def test_create_sensor():
    
    user = User.objects.create_user(username='test', password='password123')
    refresh = RefreshToken.for_user(user)
    token = str(refresh.access_token)
    
    client = Client()
    
    response = client.post('/api/sensors', {
        'name': 'device-001',
        'model': 'EnviroSense',
        'description': 'Testtesttest'
    }, 
    content_type='application/json',
    HTTP_AUTHORIZATION=f'Bearer {token}'
    )
    
    assert response.status_code == 200
    data = response.json()
    assert data['success'] == True

@pytest.mark.django_db
def test_update_sensor():
    
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
    
    response = client.put(f'/api/sensors/{sensor_id}', {
        'name': 'device-002',
        'model': 'Test',
        'description': 'Testtesttest'
        },
        content_type='application/json',
        HTTP_AUTHORIZATION=f'Bearer {token}' 
    )
    
    assert response.status_code == 200
    data = response.json()
    assert data['name'] == 'device-002'
    assert data['model'] == 'Test'
    
    
@pytest.mark.django_db
def test_delete_sensor():
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
    
    response = client.delete(f'/api/sensors/{sensor_id}', {
        'name': 'device-001',
        'model': 'EnviroSense',
        'description': 'Testtesttest'
        },
        content_type='application/json',
        HTTP_AUTHORIZATION=f'Bearer {token}' 
    )
    
    assert response.status_code == 200
    data = response.json()
    assert data['success'] == True







