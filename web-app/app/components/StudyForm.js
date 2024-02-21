"use client"

import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

export default function StudyForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    "@id": "",
    "filename": "",
    "identifier": "",
    "title": "",
    "description": "",
    "submissionDate": "",
    "publicReleaseDate": ""
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
      <Typography variant="h6">Study Form</Typography>
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
          name="identifier"
          label="Identifier"
          value={formData["identifier"]}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="title"
          label="Title"
          value={formData["title"]}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="description"
          label="Description"
          value={formData["description"]}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="submissionDate"
          label="Submission Date"
          value={formData["submissionDate"]}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="publicReleaseDate"
          label="Public Release Date"
          value={formData["publicReleaseDate"]}
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
