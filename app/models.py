from django.db import models


class Project(models.Model):
	title = models.CharField(max_length=200)
	url = models.CharField(max_length=200)
	image = models.ImageField(upload_to="project_images")

	def __str__(self):
		return f'{self.title}'
	