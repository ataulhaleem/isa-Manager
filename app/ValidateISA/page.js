"use client"

import React, { useState, useRef } from 'react';
import { Button, Container, Grid, Paper, Typography, TextField, Box } from '@mui/material';

const IsaFileValidator = () => {
  const [file, setFile] = useState(null);
  const [validationReport, setValidationReport] = useState('');
  const [fixingData, setFixingData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [showFix, setShowFix] = useState(false)

  const fileInputRef = useRef(null);
  
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile)
    handleFileRead(selectedFile);
  };
  
  const handleFileRead = (selectedFile) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const fileContent = reader.result;
      try {
        let fixingData;

        if (selectedFile.name.endsWith('.json')) {
          fixingData = JSON.parse(fileContent);
        } else {
          const lines = fileContent.split('\n');
          fixingData = parseTabData(lines);
        }
  
        const validationReport = generateMissingDataReport(fixingData);
        setShowFix(true);
        setValidationReport(validationReport);
        setFixingData(fixingData);
      } catch (error) {
        setValidationReport('Invalid file format.');
      }
    };
  
    reader.readAsText(selectedFile);
  };
  


  


  

  const parseTabData = (lines) => {
    const data = {};
    lines.forEach((line) => {
      if (line.length > 1) {
        const [key, value] = line.split('\t');
        data[key] = value;
      }
    });
    return data;
  };

  const generateMissingDataReport = (data) => {
    let report = '';

    for (const key in data) {
      const value = data[key];
      if (!value || value.trim() === '') {
        report += `${key}: Missing data\n`;
      }
    }

    if (!report) {
      report = 'No missing data found.';
    }

    return report;
  };

  const handleFixClick = () => {
      setShowForm(true);

  };

  const handleDownloadClick = (format) => {
    setValidationReport('')
    setShowForm(false)
    setShowFix(false)
    setFile(null)

    let content = '';
    if (format === 'isatab') {
      content = generateIsaTabContent(fixingData);
    } else if (format === 'isajson') {
      content = JSON.stringify(fixingData, null, 2);
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fixed_file.${format === 'isatab' ? 'txt' : 'json'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

  };

  const handleInputChange = (event, key) => {
    setFixingData({ ...fixingData, [key]: event.target.value });
  };

  const generateIsaTabContent = (data) => {
    let content = '';
    for (const key in data) {
      content += `${key}\t${data[key]}\n`;
    }
    return content;
  };


  const handleFileInputClick = () => {
    fileInputRef.current.click();
    setFile(1)
  };


  return (
    <Container>

       <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>
          <TextField
            style={{ marginTop: '20px' }}
            onClick={handleFileInputClick}
            value={file ? file.name : ''}
            variant="outlined"
            size="small"
            InputProps={{ readOnly: true }}
            fullWidth
            label='Please click me to select a file'
            InputLabelProps={{ shrink: true, style: { textAlign: 'center' } }}
            sx={{ '& .MuiOutlinedInput-root': { borderColor: 'green' } }}
          />
                              <input
            ref={fileInputRef}
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

        </Grid>
      </Grid>


      {
        !file ? <Typography style={{ marginTop: '20px', padding: '20px' }} variant='h5' color={'green'}>Please selecet an ISA tab or ISA json metadata file for validation / correction</Typography> 
        :
      <Paper style={{ marginTop: '20px', padding: '20px' }}>
        <Typography variant="h5" color={'green'}>Validation Report</Typography>
        {validationReport.split('\n').map((item, index) => (
          <Typography key={index}>{item}</Typography>
        ))}
        {!showFix||
        <Button  variant="contained" onClick={handleFixClick} style={{ float: 'right', marginTop: '-25px' }}>
          FIX
        </Button>
        }
        {showForm && (
          <Box mt={2}>
            <Typography variant="h5">Fill in Missing Fields</Typography>
            <form>
              {Object.keys(fixingData).map((key) => (
                <TextField
                  key={key}
                  label={key}
                  value={fixingData[key]}
                  onChange={(event) => handleInputChange(event, key)}
                  fullWidth
                  margin="normal"
                />
              ))}
              <Button
                variant="contained"
                onClick={() => handleDownloadClick('isatab')}
                style={{ marginRight: '10px', marginTop: '10px' }}
              >
                Download ISA-Tab
              </Button>
              <Button
                variant="contained"
                onClick={() => handleDownloadClick('isajson')}
                style={{ marginTop: '10px' }}
              >
                Download ISA JSON
              </Button>
            </form>
          </Box>
        )}
      </Paper>

}


    </Container>
  );
};

export default IsaFileValidator;
