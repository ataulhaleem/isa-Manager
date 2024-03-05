"use client"

import React from 'react'
import { Grid, Typography } from '@mui/material'

export default function Home() {
  return (
    <>
    <Grid container>
    <Typography variant='p'>
      ISA stands for "Investigation, Study, and Assay." ISA specifications refer to a set of standards for describing and exchanging metadata related to experimental metadata in life sciences research. These specifications are developed and maintained by the ISA Commons community, which includes researchers, developers, and organizations involved in data management and sharing.
      </Typography>
      <Typography variant='p'>
The ISA specifications consist of several components:
      </Typography>
      <Typography variant='p'>
ISA-Tab: ISA-Tab is a tabular format for describing experimental metadata. It provides a simple and structured way to represent metadata for investigations, studies, and assays in a tab-delimited format. ISA-Tab files are organized into three main sections: Investigation, Study, and Assay.
      </Typography>
      <Typography variant='p'>
ISA-JSON: ISA-JSON is a JSON-based format for representing ISA metadata. It provides a more flexible and machine-readable alternative to ISA-Tab. ISA-JSON files encapsulate the same metadata as ISA-Tab but in a hierarchical JSON structure.
      </Typography>
      <Typography variant='p'>
ISA-Model and ISA-API: The ISA-Model is a conceptual model that defines the core entities and relationships for describing experimental metadata. The ISA-API provides a programming interface for working with ISA metadata in software applications. It includes libraries and tools for creating, reading, and manipulating ISA-Tab and ISA-JSON files.
      </Typography>
      <Typography variant='p'>
Overall, the ISA specifications aim to facilitate the exchange, integration, and reuse of experimental metadata across different research domains and data management systems. They provide a standardized framework for describing experimental protocols, samples, data files, and other metadata elements essential for reproducibility and data sharing in life sciences research.
      </Typography>
    </Grid>

    </>
  )
}
