# Generated by Django 4.1.7 on 2023-03-07 18:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_product_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='totoalPrice',
            new_name='totalPrice',
        ),
    ]
