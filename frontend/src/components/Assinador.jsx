import * as React from 'react';
import { saveAs } from 'file-saver';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const theme = createTheme();

export default function Assinador() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/assinar/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'blob' // Indica que a resposta é do tipo Blob
      });
  
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      saveAs(pdfBlob, 'arquivo-assinado.pdf'); // Faz o download do arquivo PDF retornado pela API
  
      console.log('Documento assinado digitalmente com sucesso!');
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h1>Assinar um Documento</h1>
        <Typography paragraph>
          Assinar um documento de forma digital. 
          Esta funcionalidade é compatível com certificados emitidos pelo ICPEdu. 
          Clique em "ESCOLHER ARQUIVO PDF", selecione o arquivo a ser assinado e, 
          em seguida, clique em "CARREGAR CERTIFICADO DIGITAL", e selecione o 
          Certificado Digital emitido pela ICPEdu com extensão .p12, então preencha
          os campos de "E-mail" e "Senha do Certificado Digital" e clique no botão 
          "ASSINAR". 
        </Typography>
    </Box>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            // marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" component="label">
                    Escolher arquivo PDF
                    <input name="file_pdf" hidden accept="application/pdf" multiple type="file" />
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" component="label">
                    Carregar Certificado Digital
                    <input name="certificado" hidden accept="application/p12" multiple type="file" />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Senha do Certificado Digital"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ASSINAR
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="https://pessoal.icpedu.rnp.br/home" 
                target="_blank" variant="body2">
                  Você não tem um Certificado Digital ainda?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}