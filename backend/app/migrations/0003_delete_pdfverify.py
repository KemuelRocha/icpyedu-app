# Generated by Django 4.1.7 on 2023-03-04 17:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_pdfverify_delete_arquivos'),
    ]

    operations = [
        migrations.DeleteModel(
            name='PdfVerify',
        ),
    ]