import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Icon } from '@mui/material';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ErrorIcon from '@mui/icons-material/Error';

const DropZone = styled('div')(({ theme }) => ({
  minHeight: '200px',
  padding: '40px',
  border: '2px dashed rgba(0, 0, 0, 0.3)',
  borderRadius: '5px',
  textAlign: 'center',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
}));

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [response, setResponse] = useState(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setFiles(files);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setFiles(files);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file_pdf', files[0]);

    axios
      .post('http://127.0.0.1:8000/verificar/', formData)
      .then((response) => {
        setResponse(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const renderResponseCard = () => {
    if (response === 'OK') {
      return (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" color="green">
              <Icon sx={{ marginRight: '8px' }}>
                <DoneOutlineIcon />
              </Icon>
              Assinatura Digital Válida!
            </Typography>
            
            <Typography variant='subtitle2' color='black'>
              <Icon sx={{ marginRight: '8px' }}>
                <CardMembershipIcon />
              </Icon>
              Certificado emitido por ICPEdu!
            </Typography>
            
            <Typography variant='subtitle2' color='black'> 
              <Icon sx={{ marginRight: '8px' }}>
                <HowToRegIcon />
              </Icon>
              Cadeia de certificação validada por AC-PESSOA e AC-RAIZ.
            </Typography>
          </CardContent>
        </Card>
      );
    } else if (response === 'FAIL') {
      return (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="subtitle2" color="red">
              <Icon sx={{ marginRight: '8px' }}>
                <ErrorIcon />
              </Icon>
              Não foram detectadas assinaturas válidas emitidas por ICPEdu.
            </Typography>
          </CardContent>
        </Card>
      );
    } else {
      return null;
    }
  };

  return (
    <Box>
      <DropZone onDrop={handleDrop} onDragOver={(event) => event.preventDefault()}>
        {files.length === 0 ? (
          <>
            <CloudUploadIcon fontSize="large" />
            <Typography variant="h6" gutterBottom>
              Arraste o arquivo até aqui, ou clique no botão abaixo
            </Typography>
            <Button variant="contained" component="label">
              Selecionar Arquivo PDF
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
          </>
        ) : (
          <Typography variant="subtitle1" gutterBottom>
            {files.length} arquivo{files.length > 1 ? 's' : ''} selecionado
          </Typography>
        )}
      </DropZone>
      {files.length > 0 && (
        <Button 
          variant="contained" 
          onClick={handleUpload} 
          fullWidth 
          sx={{ mt: 3, mb: 2 }}>
          Verificar       
      </Button>
      )}
      {renderResponseCard()}
    </Box>
  );
};

export default FileUpload;
