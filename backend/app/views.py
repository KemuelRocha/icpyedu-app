from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import VerifierSerializer, SignSerializer
from rest_framework.viewsets import ViewSet
from icpyedu import signer
from rest_framework.parsers import FileUploadParser


def assinar_certificado(file_pdf, password, email, file_certificado):
    lib = signer.Sign()
    return(lib.signFile(email, password, file_pdf, file_certificado))

class AssinarView(APIView):
    serializer_class = SignSerializer

    def post(self, request, format=None):
        file_pdf = request.FILES.get('file_pdf')
        certificado = request.FILES.get('certificado')
        email = request.data.get('email')
        password = request.data.get('password')
 
        print('files')
        print(file_pdf) 
        print(certificado) 
        print(email) 
        print(password) 
        print() 
        print() 

        # print(assinar_certificado(file_pdf, password, email, certificado))

        response = "POST API and you have uploaded a {} file".format(file_pdf.content_type)
        return Response(response)



def verificar_certificado(file_pdf, ac_raiz, ac_pessoa) -> bool:
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


    # def post(self, request, format=None):
        # print(request.data)

        # serializer = VerifierSerializer(request.data)
        # serializer.is_valid(raise_exception=True)
        # data = serializer.validated_data
        
        # file_pdf = data['file_pdf']
        # ac_raiz = data['ac_raiz']
        # ac_pessoa = data['ac_pessoa']

        # flag_verificado = verificar_certificado(file_pdf, ac_raiz, ac_pessoa)

        # if flag_verificado:
        #     return Response(
        #         {'response': 'Arquivo Assinado Digitalmente' },
        #         status=status.HTTP_200_OK
        #     ) 
        # else:
        #     return Response(
        #         {'response': 'Arquivo Não Assinado' },
        #         status=status.HTTP_200_OK
        #     )  
        
