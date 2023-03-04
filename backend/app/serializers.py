from rest_framework import serializers

class VerifierSerializer(serializers.Serializer):
    file_pdf = serializers.FileField()

    class Meta:
        fields = ['file_pdf']
 

class SignSerializer(serializers.Serializer):
    file_pdf = serializers.FileField()
    certificado = serializers.FileField()
    email = serializers.EmailField()
    password = serializers.CharField()

    class Meta:
        fields = ['file_pdf', 'certificado', 'email', 'password']