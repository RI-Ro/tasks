# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
from django.contrib.auth.models import User

class LocalUser(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)


class BaseBoard(models.Model):
    title = models.CharField(max_length=30)
    sort_index = models.PositiveIntegerField()

    def __unicode__(self):
        return self.title

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['sort_index']

class Tasks(models.Model):
    title = models.TextField()
    owner = models.ForeignKey(LocalUser, on_delete = models.CASCADE)

    def __unicode__(self):
        return self.title

    def __str__(self):
        return self.title

class Board(models.Model):
    baseBoard = models.ForeignKey(BaseBoard, on_delete = models.CASCADE)
    owner = models.ForeignKey(LocalUser, on_delete = models.CASCADE)
    tasks = models.ManyToManyField(Tasks, blank=True)

    def __unicode__(self):
        return self.baseBoard.title

    def __str__(self):
        return self.baseBoard.title
