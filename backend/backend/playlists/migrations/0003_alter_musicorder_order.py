# Generated by Django 4.2.8 on 2023-12-28 15:23

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("playlists", "0002_alter_musicorder_options"),
    ]

    operations = [
        migrations.AlterField(
            model_name="musicorder",
            name="order",
            field=models.PositiveIntegerField(default=0),
        ),
    ]
