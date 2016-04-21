# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Finding',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True)),
                ('description', models.CharField(max_length=200)),
                ('pay', models.FloatField()),
                ('state', models.IntegerField()),
                ('image', models.CharField(max_length=200)),
                ('place_detail', models.CharField(max_length=200)),
                ('lost_time', models.DateField()),
                ('create_time', models.DateField(auto_now_add=True)),
                ('complete_time', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Found',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True)),
                ('description', models.CharField(max_length=200)),
                ('state', models.IntegerField()),
                ('image', models.CharField(max_length=200)),
                ('place_detail', models.CharField(max_length=200)),
                ('found_time', models.DateField()),
                ('create_time', models.DateField(auto_now_add=True)),
                ('complete_time', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='ItemType',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True)),
                ('description', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Place',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True)),
                ('description', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Recommend',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True)),
                ('found_id', models.ForeignKey(to='lost.Found')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True)),
                ('phone', models.CharField(max_length=20)),
                ('name', models.CharField(max_length=20)),
                ('student_number', models.CharField(max_length=25)),
            ],
        ),
        migrations.AddField(
            model_name='recommend',
            name='user_id',
            field=models.ForeignKey(to='lost.User'),
        ),
        migrations.AddField(
            model_name='found',
            name='place_ids',
            field=models.ForeignKey(to='lost.Place'),
        ),
        migrations.AddField(
            model_name='found',
            name='type_id',
            field=models.ManyToManyField(to='lost.ItemType'),
        ),
        migrations.AddField(
            model_name='found',
            name='user_id',
            field=models.ForeignKey(to='lost.User'),
        ),
        migrations.AddField(
            model_name='finding',
            name='place_ids',
            field=models.ManyToManyField(to='lost.Place'),
        ),
        migrations.AddField(
            model_name='finding',
            name='type_id',
            field=models.ManyToManyField(to='lost.ItemType'),
        ),
        migrations.AddField(
            model_name='finding',
            name='user_id',
            field=models.ForeignKey(to='lost.User'),
        ),
    ]
