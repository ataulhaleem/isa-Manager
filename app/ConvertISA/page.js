"use client"
import React, { useState, useRef } from 'react';
import { Button, TextField, Typography, Container, Grid, Select, MenuItem } from '@mui/material';
import Papa from 'papaparse';

const FileConverter = () => {
  const [file, setFile] = useState(null);
  const [convertedContent, setConvertedContent] = useState('');
  const [conversionType, setConversionType] = useState('isaTab');

  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };



  // const handleFileChange = (event) => {
  //   const selectedFile = event.target.files[0];
  //   setFile(selectedFile);
  // };

  const handleConvert = () => {
    if (!file) {
      alert('Please select a file.');
      return;
    }
  
    if (conversionType === 'isaTab') {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target.result;
        const lines = result.split('\n');
        const data = {};
  
        lines.forEach((line) => {
          if (line.trim() !== '') {
            const parts = line.split('\t');
            const key = parts[0].trim();
            const value = parts[1].trim();
            data[key] = value;
          }
        });
  
        const jsonContent = JSON.stringify(data, null, 2);
        setConvertedContent(jsonContent);
      };
      reader.readAsText(file);
    } else if (conversionType === 'json') {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target.result;
        try {
          const parsedData = JSON.parse(result);
          const tsvContent = generateTSV(parsedData); // Generate TSV content using provided function
          setConvertedContent(tsvContent); // Set the converted content
        } catch (error) {
          alert('Invalid JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };
  
  const generateTSV = (data) => {
    let tsv = '';
    for (const [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        tsv += `${key}\t${value.join(',')}\n`;
      } else {
        tsv += `${key}\t${value}\n`;
      }
    }
    return tsv;
  };
  
  const handleDownload = () => {
    if (!convertedContent) {
      alert('No converted content available.');
      return;
    }
  
    const fileName = file.name.replace(/\.[^/.]+$/, '');
    const extension = conversionType === 'isaTab' ? 'json' : 'tsv';
    const convertedFileName = `${fileName}.${extension}`;
  
    const blob = new Blob([convertedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = convertedFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  return (
    <Container>
      <Grid container sx={{padding : 4}} spacing={2} alignItems="center" justifyContent="center">
      <Grid item>
          <TextField
            onClick={handleFileInputClick}
            value={file ? file.name : ''}
            variant="outlined"
            size="small"
            InputProps={{ readOnly: true }}
            fullWidth
          />
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </Grid>


        <Grid item>
          <Select size="small" value={conversionType} onChange={(e) => setConversionType(e.target.value)}>
            <MenuItem value="isaTab">ISA-Tab to JSON</MenuItem>
            <MenuItem value="json">JSON to ISA-Tab</MenuItem>
          </Select>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleConvert}>Convert</Button>
        </Grid>
      </Grid>
      {convertedContent && (
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h6">Converted Content</Typography>
            <TextField
              multiline
              fullWidth
              rows={10}
              value={convertedContent}
              variant="outlined"
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleDownload}>Download Converted File</Button>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default FileConverter;
