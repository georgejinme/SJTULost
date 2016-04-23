from django.db import models

# Create your models here.
class ItemType(models.Model):
    id = models.AutoField(primary_key=True)
    description = models.CharField(max_length=200)
    def __unicode__(self):
        return str(self.id) + self.description


class User(models.Model):
    id = models.AutoField(primary_key=True)
    phone = models.CharField(max_length=20)
    name = models.CharField(max_length=20)
    student_number = models.CharField(max_length=25, default='0')
    class Meta:
        unique_together = ('id', 'student_number')
    def __unicode__(self):
        return str(self.id) + self.name

class Place(models.Model):
    id = models.AutoField(primary_key=True)
    description = models.CharField(max_length=200)
    def __unicode__(self):
        return str(self.id) + self.description

class Finding(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User)
    type_id = models.ManyToManyField(ItemType)
    description = models.CharField(max_length=200)
    pay = models.FloatField()
    state = models.IntegerField()
    image = models.CharField(max_length=200)
    place_ids = models.ManyToManyField(Place)
    place_detail = models.CharField(max_length=200)
    lost_time = models.DateField()
    create_time = models.DateField(auto_now_add=True)
    complete_time = models.DateField()
    def __unicode__(self):
        return str(self.id)

class Found(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User)
    type_id = models.ManyToManyField(ItemType)
    description = models.CharField(max_length=200)
    state = models.IntegerField()
    image = models.CharField(max_length=200)
    place_ids = models.ForeignKey(Place)
    place_detail = models.CharField(max_length=200)
    found_time = models.DateField()
    create_time = models.DateField(auto_now_add=True)
    complete_time = models.DateField()
    def __unicode__(self):
        return str(self.id)

class Recommend(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User)
    found_id = models.ForeignKey(Found)
    def __unicode__(self):
        return str(self.id)