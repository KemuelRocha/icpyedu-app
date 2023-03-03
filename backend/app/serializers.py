from rest_framework import serializers

class VerifierSerializer(serializers.Serializer):
    file_pdf: serializers.FileField()
    ac_raiz: serializers.FileField()
    ac_pessoa: serializers.FileField()

class SignSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    file_pdf: serializers.FileField()
    file_certificado: serializers.FileField()