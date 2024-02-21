"use client"

import React, { useEffect, useState } from 'react';
import { Button, Box, Typography, Grid , Paper, TextField} from '@mui/material';
import InvestigationForm from '../components/InvestigationForm';
import StudyForm from '../components/StudyForm';
import AssayForm from '../components/AssayForm';
import { useMetadata, MetadataProvider } from '../contexts/MetadataContext';

import ReactJson from 'react-json-view';

export default function MetadataForm() {
  const [step, setStep] = useState(2);
  const [metadata, setMetadata] = useState({});

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleMetadataChange = (newMetadata) => {
    setMetadata({ ...metadata, ...newMetadata });
  };

  const handleFormSubmit = () => {
    console.log(metadata)
    // Parse metadata and generate ISA-JSON and ISA-Tab files
    // Provide options to download the files
  };

  useEffect(() => {},[step])

  
  return (
    <MetadataProvider>


<Grid container spacing={0.2}>
      <Grid item xs={6}>
        <Paper style={{ border: '1px solid black', minHeight: '100px' }}>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper style={{ border: '1px solid blue', minHeight: '100px' }}>

        {/* investigation */}

        <form>
        <TextField
          name="@id"
          label="ID"
          value={formData["@id"]}
          onChange={handleChange}
          fullWidth
        />

        </form>


        <ReactJson src={metadata} />
        </Paper>
      </Grid>
    </Grid>


    </MetadataProvider>
  );
}
