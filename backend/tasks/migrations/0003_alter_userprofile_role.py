# Generated by Django 5.1.7 on 2025-03-26 21:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("tasks", "0002_alter_task_due_date"),
    ]

    operations = [
        migrations.AlterField(
            model_name="userprofile",
            name="role",
            field=models.CharField(
                choices=[
                    ("admin", "Администратор"),
                    ("project_creator", "Создатель проекта"),
                    ("team_member", "Участник команды"),
                ],
                default="team_member",
                max_length=50,
            ),
        ),
    ]
