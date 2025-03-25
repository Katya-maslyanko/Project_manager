# Generated by Django 5.1.7 on 2025-03-25 22:01

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("tasks", "0006_remove_task_tags"),
    ]

    operations = [
        migrations.AddField(
            model_name="task",
            name="tag",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="task_tags",
                to="tasks.tag",
            ),
        ),
        migrations.DeleteModel(
            name="TaskTag",
        ),
    ]
