from io import BytesIO
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import VerifierSerializer, SignSerializer
from rest_framework.viewsets import ViewSet
from icpyedu import signer
from rest_framework.parsers import FileUploadParser
import os, tempfile
import shutil
from django.http import HttpResponse
from django.http import FileResponse

def assinar_digitalmente(file_pdf_path, password, email, certificado_path):
    lib = signer.Sign()
    return lib.signFile(email, password, file_pdf_path, certificado_path)

def download_pdf(request):
    pdf_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../arquivo-assinado.pdf')
    pdf_file = open(pdf_path, 'rb')
    response = FileResponse(pdf_file)
    response['Content-Type'] = 'application/pdf'
    response['Content-Disposition'] = 'attachment; filename="nome_do_arquivo.pdf"'
    pdf_file.close()
    return response

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

        # Chamar a função assinar_digitalmente com os caminhos dos arquivos temporários
        pdf_assinado = assinar_digitalmente(file_pdf_path, password, email, certificado_path)
        print(pdf_assinado)
        
        print('files')
        print(file_pdf_path)
        print(certificado_path)
        print(email)
        print(password)
        print()

        # Remover o diretório temporário e seus arquivos
        shutil.rmtree(temp_dir)


        pdf_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../arquivo-assinado.pdf')
        # Abrir o arquivo pdf_assinado em modo de leitura binária
        with open(pdf_path, 'rb') as f:
            # Ler todo o conteúdo do arquivo e armazená-lo em uma variável
            pdf_bytes = f.read()

        # Criar uma instância de HttpResponse com o conteúdo do arquivo
        response = HttpResponse(pdf_bytes, content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="arquivo-assinado.pdf"'
        return response


def verificar_assinatura(file_pdf, ac_raiz, ac_pessoa) -> bool:
    lib = signer.Verifier()
    return(lib.verifySignature(file_pdf, ac_pessoa, ac_raiz))

class VerificarView(APIView):
    serializer_class = VerifierSerializer

    def post(self, request):
        file_pdf = request.FILES.get('file_pdf')

        # Criar um diretório temporário
        temp_dir = tempfile.mkdtemp()

        # Obter o caminho completo para o PDF
        file_pdf_path = os.path.join(temp_dir, file_pdf.name)

        # Salvar o arquivo no diretório temporário
        with open(file_pdf_path, 'wb') as f_pdf:
            shutil.copyfileobj(file_pdf, f_pdf)

                 
        print('files')
        print(file_pdf) 
        print() 

        ac_1 = './ac/ac-pessoa.cer'
        ac_2 = './ac/ac-raiz-v3.cer'

        resultado = verificar_assinatura(file_pdf_path, ac_1, ac_2)
        print(resultado)

        if resultado==True:
            response = "OK"
           
        else:
            response = "FAIL"

        print(response)
        # Remover o diretório temporário e seus arquivos
        shutil.rmtree(temp_dir)

        print("Verificação concluida")
        return Response(response)

