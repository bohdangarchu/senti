# Generated by Django 4.1.1 on 2022-11-13 17:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_datepoint'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='article',
            table='nyt_article',
        ),
    ]
