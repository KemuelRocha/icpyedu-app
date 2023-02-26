import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import './Principal.css'

import {
  Link,
} from "react-router-dom";


const theme = createTheme();

export default function main() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm" className="container">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              ICPyEdu App
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Plataforma desenvolvida para a facilitação do processo de Assinatura e 
                Verificação de Assinatura Digital com Certificado Digital 
                ICPEdu.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Link to="/assinador" className='link'>
              <Button variant="contained">Assinar de forma Digital um  documento PDF </Button>
              </Link>

              <Link to="/verificador" className='link'>
              <Button variant="outlined">Verificar a Assinatura Digital em um PDF </Button>
              </Link>
            </Stack>
          </Container>
        </Box>
        <div>
            <a href="#section2" className="arrow">&#8595;</a>
        </div>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <div className="column-wrapper" id="section2">
              <Typography variant="h4" className="column-heading">Validade Jurídica</Typography>
              <Typography variant="body1" className="column-text">
              Inúmeras leis foram aprovadas para facilitar negócios com o uso de assinatura 
              digital e assinatura eletrônica. Elas asseguram a validade e autoridade jurídica 
              de assinaturas digitais em todo o mundo.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="column-wrapper">
              <Typography variant="h4" className="column-heading">Criptografia</Typography>
              <Typography variant="body1" className="column-text">
              A criptografia da assinatura digital acontece por meio de um código que deixa 
              o documento e o seu conteúdo protegido. Assim, você não precisa se preocupar 
              com fraudes ou tentativas de modificações no documento.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="column-wrapper">
              <Typography variant="h4" className="column-heading">Biblioteca ICPyEdu</Typography>
              <Typography variant="body1" className="column-text">
              Este site utiliza para realizar as operações de Assinatura e Verificação de Assinatura 
              Digital, a Biblioteca Python ICPyEdu, disponível no PyPI para download.
              </Typography>
            </div>
          </Grid>
        </Grid>


        
      </main>
    </ThemeProvider>
  );
}