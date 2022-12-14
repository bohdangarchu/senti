# Generated by Django 4.1.1 on 2022-11-13 19:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_rename_article_nytarticle'),
    ]

    operations = [
        migrations.CreateModel(
            name='FinancialArticle',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('_id', models.CharField(max_length=100)),
                ('title', models.CharField(max_length=1000)),
                ('website', models.CharField(max_length=100)),
                ('date', models.DateTimeField()),
                ('tickers', models.TextField(max_length=100)),
                ('description', models.TextField()),
            ],
            options={
                'db_table': 'financial_article',
            },
        ),
    ]
