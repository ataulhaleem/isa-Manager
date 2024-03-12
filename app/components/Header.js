"use client"
import * as React from "react";

import { Card, CardContent, Typography, Button,  Grid } from '@mui/material';
import Link from "next/link";

export default function Header() {
  return (
    <>
    
    <Card sx={{ mb: 1, backgroundColor: '#a1bdc7' }}>
      <CardContent>
        <Grid
          container
          direction="column"
          alignItems="center"
          spacing={2}
        >
          <Typography sx={{mt:4}} variant="h5" color="primary" fontSize={50}>
            isaManager
          </Typography>
          <Typography variant="body2" color="text.secondary" fontSize={20}>
            isaManager is a web-based tool for manipulating ISA-Tab and ISA-Json files. 
          </Typography>
          <Typography variant="body2" color="text.secondary" fontSize={20}>
            It allows one to create new meta-data files in ISA formats, validate existing metadata files, and convert between formats.
          </Typography>

          <Grid item container justifyContent="center" spacing={2}>
            <Grid item>
              <Link href="/Home">
                <Button variant="contained" color="primary">
                  Home
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/CreateISA">
                <Button variant="contained" color="secondary">
                  Create
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/ValidateISA">
                <Button variant="contained" color="error">
                  Validate
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/ConvertISA">
                <Button variant="contained" color="info">
                  Convert
                </Button>
              </Link>
            </Grid>

            <Grid item>
              <Link href="/SubmitISA">
                <Button variant="contained" color="info">
                  Submit
                </Button>
              </Link>
            </Grid>

            <Grid item>
              <Link href="/About">
                <Button variant="contained" color="success">
                  About
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>

<div>
<Typography variant='h6' color={'red'} > <b>Note:</b> The input data will stay on you device. </Typography>
<Typography variant='p' >  </Typography>
</div>
</>

  );
}
