import pytest
from django.test import Client
from django.contrib.auth.models import User


@pytest.mark.django_db
def test_register_user():
    client = Client()
    
    response = client.post('/api/auth/register', {
        'username': 'testtest',
        'email': 'new@test.com',
        'password': 'password123'
    }, content_type='application/json')
    
    assert response.status_code == 200
    data = response.json()
    assert data['success'] == True
    assert 'access_token' in data
    assert 'refresh_token' in data
    assert 'user' in data
    
    assert User.objects.filter(username='testtest').exists()


@pytest.mark.django_db
def test_login_success():
    User.objects.create_user(
        username='testtest',
        email='test@test.com',
        password='password123'
    )
    client = Client()
    
    response = client.post('/api/auth/login', {
        'username': 'testtest',
        'password': 'password123'
    }, content_type='application/json')
    
    assert response.status_code == 200
    data = response.json()
    assert data['success'] == True
    assert 'access_token' in data
    assert 'refresh_token' in data
    assert 'user' in data


@pytest.mark.django_db
def test_login_wrong_password():
    User.objects.create_user(
        username='testtest',
        email='test@test.com',
        password='password123'
    )
    client = Client()
    
    response = client.post('/api/auth/login', {
        'username': 'testtest',
        'password': 'password12'
    }, content_type='application/json')
    
    assert response.status_code == 200
    data = response.json()
    assert data['success'] == False
    assert data['message'] == 'Invalid credentials'


@pytest.mark.django_db
def test_login_user_not_found():
    client = Client()
    
    response = client.post('/api/auth/login', {
        'username': 'blablabla',
        'password': 'password123'
    }, content_type='application/json')
    
    assert response.status_code == 200
    data = response.json()
    assert data['success'] == False
    assert data['message'] == 'Invalid credentials'
