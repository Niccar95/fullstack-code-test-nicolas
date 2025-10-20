from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from apps.sensors.models import Sensor
from apps.readings.models import Reading
import csv
from datetime import datetime
from pathlib import Path


class Command(BaseCommand):
    help = 'Load seed data: users, sensors, and readings from CSV'

    def handle(self, *args, **kwargs):
        self.stdout.write('Loading seed data...')
        
        user, created = User.objects.get_or_create(
            username='testuser',
            defaults={
                'email': 'test@example.com',
            }
        )
        if created:
            user.set_password('testpass123')
            user.save()
            self.stdout.write(self.style.SUCCESS('Created user: testuser'))
        
        sensors_data = [
            {'name': 'device-001', 'model': 'EnviroSense'},
            {'name': 'device-002', 'model': 'ClimaTrack'},
            {'name': 'device-003', 'model': 'AeroMonitor'},
            {'name': 'device-004', 'model': 'HydroTherm'},
            {'name': 'device-005', 'model': 'EcoStat'},
        ]
        
        sensors = {}
        for data in sensors_data:
            sensor, created = Sensor.objects.get_or_create(
                name=data['name'],
                owner=user,
                defaults={'model': data['model']}
            )
            sensors[data['name']] = sensor
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created sensor: {data["name"]}'))
        
        csv_path = Path(__file__).parent.parent.parent.parent.parent / 'sensor_readings_wide.csv'
        
        if not csv_path.exists():
            self.stdout.write(self.style.ERROR(f'CSV file not found at {csv_path}'))
            return
        
        with open(csv_path, 'r') as file:
            reader = csv.DictReader(file)
            readings_created = 0
            
            for row in reader:
                device_id = row['device_id']
                if device_id in sensors:
                    Reading.objects.get_or_create(
                        sensor=sensors[device_id],
                        timestamp=datetime.fromisoformat(row['timestamp']),
                        defaults={
                            'temperature': float(row['temperature']),
                            'humidity': float(row['humidity'])
                        }
                    )
                    readings_created += 1
            
            self.stdout.write(self.style.SUCCESS(f'Created {readings_created} readings'))
        
        self.stdout.write(self.style.SUCCESS('Seed data loaded successfully!'))