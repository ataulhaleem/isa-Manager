"use client"

import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

export default function AssayForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    "@id": "",
    "filename": "",
    "technologyPlatform": ""
    // Add additional properties as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Box>
      <Typography variant="h6">Assay Form</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="@id"
          label="ID"
          value={formData["@id"]}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="filename"
          label="Filename"
          value={formData["filename"]}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="technologyPlatform"
          label="Technology Platform"
          value={formData["technologyPlatform"]}
          onChange={handleChange}
          fullWidth
        />
        {/* Add input fields for additional properties as needed */}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
}
