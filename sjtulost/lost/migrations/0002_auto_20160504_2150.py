# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lost', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='finding',
            name='detail',
            field=models.TextField(default='rt'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='found',
            name='detail',
            field=models.TextField(default='rt'),
            preserve_default=False,
        ),
    ]
