import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

export default function Assinador() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        
        <h1>Assinar um Documento</h1>
        Assinar um documento de forma digital. 
        Esta funcionalidade é compatível com certificados emitidos pelo ICPEdu. 
        Clique em "ESCOLHER ARQUIVO PDF", selecione o arquivo a ser assinado e, 
        em seguida, clique em "CARREGAR CERTIFICADO DIGITAL", e selecione o 
        Certificado Digital emitido pela ICPEdu com extensão .p12, então preencha
        os campos de "E-mail" e "Senha do Certificado Digital" e clique no botão 
        "ASSINAR". 
     
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
                    <input hidden accept="application/pdf" multiple type="file" />
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" component="label">
                    Carregar Certificado Digital
                    <input hidden accept="application/p12" multiple type="file" />
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