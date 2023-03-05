from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import VerifierSerializer, SignSerializer
from rest_framework.viewsets import ViewSet
from icpyedu import signer
from rest_framework.parsers import FileUploadParser
import os, tempfile
import shutil

def assinar_digitalmente(file_pdf_path, password, email, certificado_path):
    lib = signer.Sign()
    return(lib.signFile(email, password, file_pdf_path, certificado_path))

class AssinarView(APIView):
    serializer_class = SignSerializer

    def post(self, request, format=None):
        file_pdf = request.FILES.get('file_pdf')
        certificado = request.FILES.get('certificado')
        email = request.data.get('email')
        password = request.data.get('password')

        # Criar um diretório temporário
        temp_dir = tempfile.mkdtemp()

        # Obter os caminhos completos para o PDF e o certificado
        file_pdf_path = os.path.join(temp_dir, file_pdf.name)
        certificado_path = os.path.join(temp_dir, certificado.name)

        # Salvar os arquivos no diretório temporário
        with open(file_pdf_path, 'wb') as f_pdf:
            shutil.copyfileobj(file_pdf, f_pdf)

        with open(certificado_path, 'wb') as f_cert:
            shutil.copyfileobj(certificado, f_cert)

        print('files')
        print(file_pdf_path)
        print(certificado_path)
        print(email)
        print(password)
        print()

        # Chamar a função assinar_digitalmente com os caminhos dos arquivos temporários
        print(assinar_digitalmente(file_pdf_path, password, email, certificado_path))

        # Remover o diretório temporário e seus arquivos
        shutil.rmtree(temp_dir)

        response = "Documento assinado digitalmente com sucesso!"
        return Response(response)




def verificar_assinatura(file_pdf, ac_raiz, ac_pessoa) -> bool:
    lib = signer.Verifier()
    return(lib.verifySignature(file_pdf, ac_pessoa, ac_raiz))

class VerificarView(APIView):
    serializer_class = VerifierSerializer

    def post(self, request):
        file_pdf = request.FILES.get('file_pdf')
          
        content_type = file_pdf.content_type

        print('files')
        print(file_pdf) 
        print() 

        response = "POST API and you have uploaded a {} file".format(content_type)
        return Response(response)

