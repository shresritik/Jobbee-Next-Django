# Generated by Django 4.0.4 on 2022-05-12 09:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('job', '0002_alter_job_point'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='job',
            name='point',
        ),
    ]
