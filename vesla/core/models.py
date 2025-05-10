from django.db import models

# create your models here

class SensorData(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    temperature = models.FloatField()
    ph = models.FloatField()
    tds = models.FloatField()
    turbidity = models.FloatField()

    def __str__(self):
        return f"SensorData at {self.timestamp}"