import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from '@mui/material/Typography';

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

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setFiles(files);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setFiles(files);
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
            {files.length} file{files.length > 1 ? 's' : ''} selected
          </Typography>
        )}
      </DropZone>
    </Box>
  );
};

export default FileUpload;
