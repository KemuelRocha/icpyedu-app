import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Sobre() {
  return (
     <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography paragraph>
          
          <h1>Sobre o ICPyEdu App</h1>
          Plataforma desenvolvida para a facilitação do processo de Assinatura e 
          Verificação de Assinatura Digital, utilizando o Certificado Digital 
          emitido pela ICPEdu. Este site se utiliza das ferramentas do
          Pacote Pyhton ICPyEdu, disponível no repositório de software para a 
          linguagem de programação Python, o PyPI.

          <h2>Regras de uso</h2>
          O usuário pode escolher no menu lateral esquerdo qual operação deseja realizar,
          após isso, basta preecher os campos com os dados necessários e fazer o upload
          dos arquivos solicitados para cada operação. Para assinar de forma digital 
          um documento, é necessário o uso de um Certificado 
          Digital válido, emitido pela ICPEdu, e sejam inseridos o endereço de e-mail
          vinculado a este certificado, assim como a senha pessoal do certificado, e claro,
          o documento em PDF que receberá a assinatura. Para verificar a validade de uma 
          Assinatura Digital, basta que se envie o documento em PDF para verificação.

          <h2>Ainda não tem certificado digital?</h2>
          Se você está vinvulado a alguma instituição brasileira que faz parte da 
          Comunidade Acadêmica Federada, então poderá estar emitindo diretamente 
          do site da RNP, rede brasileira para educação e pesquisa. Basta buscar
          na aba de Serviços por ICPEdu, onde será redirecionado para a plataforma 
          de emissão de certificados digitais pessoais. Através desse processo, poderá
          ser feito o download do Certificado e também das Autoridades Certificadoras
          de forma gratuita.
        </Typography>
      </Box>
  );
}
