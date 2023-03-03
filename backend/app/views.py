from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import VerifierSerializer, SignSerializer
from icpyedu import signer


def verificar_certificado(file_pdf, ac_raiz, ac_pessoa) -> bool:
    lib = signer.Verifier()
    return(lib.verifySignature(file_pdf, ac_pessoa, ac_raiz))

class VerificarView(APIView):


    def post(self, request, format=None):

        print(request.data)

        serializer = VerifierSerializer(request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        
        file_pdf = data['file_pdf']
        ac_raiz = data['ac_raiz']
        ac_pessoa = data['ac_pessoa']

        flag_verificado = verificar_certificado(file_pdf, ac_raiz, ac_pessoa)

        if flag_verificado:
            return Response(
                {'response': 'Arquivo certificado' },
                status=status.HTTP_200_OK
            ) 
        else:
            return Response(
                {'response': 'Arquivo não certificado' },
                status=status.HTTP_200_OK
            )  