# Generated by Django 4.1.1 on 2022-11-20 16:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_financialarticle_description_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='financialarticle',
            name='sentiment',
            field=models.FloatField(default=0),
        ),
    ]
