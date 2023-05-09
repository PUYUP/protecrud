# Generated by Django 4.2.1 on 2023-05-09 03:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0013_group_is_default'),
    ]

    operations = [
        migrations.CreateModel(
            name='Asset',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create_at', models.DateTimeField(auto_now_add=True, db_index=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
                ('quantity', models.IntegerField(default=0)),
                ('condition', models.CharField(choices=[('good', 'Good'), ('bad', 'Bad'), ('unknown', 'Unknown')], default='unknown', max_length=15)),
            ],
            options={
                'ordering': ['-create_at'],
            },
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create_at', models.DateTimeField(auto_now_add=True, db_index=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(db_index=True, max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
            ],
            options={
                'verbose_name_plural': 'Companies',
                'ordering': ['-create_at'],
            },
        ),
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create_at', models.DateTimeField(auto_now_add=True, db_index=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='employees', to='tracker.company')),
                ('roles', models.ManyToManyField(to='auth.group')),
            ],
        ),
    ]
