import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrastarArquivo from './SoltarArquivo'


const theme = createTheme();

export default function Verificador() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        
          <h1>Verificar Assinatura</h1>
          Verifique se a assinatura digital do documento é válida. 
          Esta funcionalidade é compatível com certificados emitidos pelo ICPEdu. 
          Clique em "SELECIONAR ARQUIVO PDF" ou arraste o arquivo até  área em destaque
          abaixo, selecione o arquivo a ser validado e, em seguida, clique no botão "VERIFICAR". 
       
      </Box>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <ArrastarArquivo />
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}