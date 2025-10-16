from django.db import models

class Sensor(models.Model):
    owner = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    model = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['owner', 'name']),
            models.Index(fields=['model']),
        ]

    def __str__(self):
        return f"{self.name} ({self.model})"