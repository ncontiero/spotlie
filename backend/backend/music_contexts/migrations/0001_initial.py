# Generated by Django 4.2.9 on 2024-01-04 18:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("musics", "0002_alter_music_artist"),
        ("playlists", "0004_alter_musicorder_options"),
        ("contenttypes", "0002_remove_content_type_name"),
    ]

    operations = [
        migrations.CreateModel(
            name="MusicContext",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("object_id", models.UUIDField()),
                (
                    "content_type",
                    models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="contenttypes.contenttype"),
                ),
                (
                    "current_music",
                    models.ForeignKey(
                        blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to="musics.music"
                    ),
                ),
                (
                    "current_playlist",
                    models.ForeignKey(
                        blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to="playlists.playlist"
                    ),
                ),
                ("musics", models.ManyToManyField(blank=True, related_name="musics_context", to="musics.music")),
            ],
            options={
                "verbose_name": "Music Context",
                "verbose_name_plural": "Music Contexts",
                "ordering": ["id"],
            },
        ),
    ]
