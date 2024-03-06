"use client"

import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Autocomplete,
} from "@mui/material";

import ReactJson from 'react-json-view-ssr'

import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

class Investigation {
  constructor(data) {
    this["@id"] = data["@id"] || 1;
    this.filename = data.filename || "investigation.json";
    this.identifier = data.identifier || "";
    this.title = data.title || "";
    this.description = data.description || "";
    this.submissionDate = data.submissionDate || "";
    this.publicReleaseDate = data.publicReleaseDate || "";
    this.ontologySourceReferences = data.ontologySourceReferences || [];
    this.publications = data.publications || [];
    this.people = data.people || [];
    this.studies = data.studies || [];
    this.comments = data.comments || [];
  }

  // Getters and setters for each property if needed
}

class Study {
  constructor(data) {
    this["@id"] = data["@id"] || "";
    this.filename = data.filename || "";
    this.identifier = data.identifier || "";
    this.title = data.title || "";
    this.description = data.description || "";
    this.submissionDate = data.submissionDate || null;
    this.publicReleaseDate = data.publicReleaseDate || null;
    this.publications = data.publications || [];
    this.people = data.people || [];
    this.studyDesignDescriptors = data.studyDesignDescriptors || [];
    this.protocols = data.protocols || [];
    this.materials = data.materials || [];
    this.processSequence = data.processSequence || [];
    this.assays = data.assays || [];
    this.factors = data.factors || [];
    this.characteristicCategories = data.characteristicCategories || [];
    this.unitCategories = data.unitCategories || [];
    this.comments = data.comments || [];
  }

  // Getters and setters for each property if needed
}

class Assay {
  constructor(data) {
    this["@id"] = data["@id"] || "";
    this.comments = data.comments || [];
    this.filename = data.filename || "";
    this.measurementType = data.measurementType || [];
    this.technologyType = data.technologyType || [];
    this.technologyPlatform = data.technologyPlatform || "";
    this.dataFiles = data.dataFiles || [];
    this.materials = data.materials || [];
    this.characteristicCategories = data.characteristicCategories || [];
    this.unitCategories = data.unitCategories || [];
    this.processSequence = data.processSequence || [];
  }

  // Getters and setters for each property if needed
}

function downloadJson(jsonObject, filename) {
  // Convert object to JSON string
  const jsonString = JSON.stringify(jsonObject, null, 2);

  // Create a Blob object
  const blob = new Blob([jsonString], { type: "application/json" });

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create an anchor element
  const a = document.createElement("a");

  // Set the href attribute to the URL of the Blob
  a.href = url;

  // Set the download attribute to the filename
  a.download = filename || "data.json";

  // Programmatically click on the anchor element to trigger the download
  a.click();

  // Cleanup: Revoke the URL
  URL.revokeObjectURL(url);
}

// Function to convert a JavaScript object to a TSV string
function objectToTsv(obj) {
  function flatten(obj) {
    const result = {};
    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        obj[key].forEach((item, index) => {
          flatten(item).forEach((value, i) => {
            result[`${key}_${index + 1}_${i + 1}`] = value;
          });
        });
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        flatten(obj[key]).forEach((value, i) => {
          result[`${key}_${i + 1}`] = value;
        });
      } else {
        result[key] = obj[key];
      }
    }
    return result;
  }

  const flattenedObj = flatten(obj);

  const headers = Object.keys(flattenedObj);
  const rows = [headers.map((header) => flattenedObj[header])];

  return rows.map((row) => row.join("\t")).join("\n");
}

// Function to download TSV files
function downloadTsv(data, filename) {
  const tsvString = objectToTsv(data);
  console.log(tsvString);
  const blob = new Blob([tsvString], { type: "text/tsv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename || "data.tsv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function MetadataForm() {
  var investigation = new Investigation({});
  var study = new Study({});
  var assay = new Assay({});

  const [investigationData, setInvestigationData] = useState(investigation);
  const [studyCounter, setStudyCounter] = useState(0);
  const [studyData, setStudyData] = useState(study);

  const [studies, setStudies] = useState([]);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [assayCounter, setAssayCounter] = useState(0);

  const handleJsonDownload = () => {
    downloadJson(investigation, investigation.filename);
  };

  const handleIsaTabDownload = () => {
    // Download investigation.tsv
    downloadTsv(investigation, "investigation.tsv");
    // Download study.tsv and assay.tsv for each study and assay
    investigation.studies.forEach((study) => {
      downloadTsv(study, `Study_${study.identifier}.tsv`);
      if (study.assays) {
        study.assays.forEach((assay) => {
          downloadTsv(assay, `Assay_${assay.identifier}.tsv`);
        });
      }
    });
  };

  const [assayData, setAssayData] = useState(assay);

  const handleStudyChange = (event, newValue) => {
    setSelectedStudy(newValue);
  };

  const handleChangeInvestigation = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "people":
        const trimmedValue = value.trim();
        const splitValues = trimmedValue.split(",").map((item) => item.trim());
        setInvestigationData({ ...investigationData, [name]: splitValues });
        break;
      case "comments":
        const trimmedComments = value.trim();
        const splitComments = trimmedComments
          .split(",")
          .map((item) => item.trim());
        setInvestigationData({ ...investigationData, [name]: splitComments });
        break;
      default:
        setInvestigationData({ ...investigationData, [name]: value });
        break;
    }
  };

  const handleChangeStudy = (e) => {
    const { name, value } = e.target;
    if (name == "identifier" || name == "title" || name == "description") {
      setStudyData({ ...studyData, [name]: value });
    } else {
      const trimmedValue = value.trim();
      const splitValues = trimmedValue.split(",").map((item) => item.trim());
      setStudyData({ ...studyData, [name]: splitValues });
    }
  };

  const handleAddStudy = () => {
    var studiesCopy = studies;
    studiesCopy.push(studyData.identifier);
    setStudies(studiesCopy);
    investigationData.studies.push(studyData);
    setStudyCounter(studyCounter + 1);
    setStudyData(new Study({}));
  };

  const handleAddAssay = () => {
    // investigationData.studies.assays.push(studyData)
    investigationData.studies.map((study) => {
      if (study.identifier == selectedStudy) {
        console.log(selectedStudy);
      }
    });

    setAssayCounter(assayCounter + 1);
    setAssayData(new Assay({}));
  };

  const handleChangeAssay = (e) => {
    // const { name, value } = e.target
    // switch(name){
    //   case 'people':
    //     const trimmedValue = value.trim();
    //     const splitValues = trimmedValue.split(",").map((item) => item.trim());
    //     setInvestigationData({ ...investigationData, [name]: splitValues })
    //     break;
    //   case 'comments':
    //     const trimmedComments = value.trim();
    //     const splitComments = trimmedComments.split(",").map((item) => item.trim());
    //     setInvestigationData({ ...investigationData, [name]: splitComments })
    //     break;
    //   default:
    //     setInvestigationData({ ...investigationData, [name]: value })
    //     break;
    //   }
  };

  const handleSubmissionDate = (date) => {
    const dateString = date.format("YYYY-MM-DD");
    setInvestigationData({ ...investigationData, submissionDate: dateString });
  };

  const handleReleaseDate = (date) => {
    const dateString = date.format("YYYY-MM-DD");
    setInvestigationData({
      ...investigationData,
      publicReleaseDate: dateString,
    });
  };

  const handleStudySubmissionDate = (date) => {
    const dateString = date.format("YYYY-MM-DD");
    setStudyData({ ...studyData, submissionDate: dateString });
  };

  const handleStudyReleaseDate = (date) => {
    const dateString = date.format("YYYY-MM-DD");
    setStudyData({ ...studyData, publicReleaseDate: dateString });
  };

  return (
    <div>
      <Grid container spacing={0.3}>
        <Grid item xs={6}>
          <Paper style={{ border: "1px solid white", minHeight: "100px" }}>
            <Grid sx={{ padding: 1 }}>
              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3-content"
                  id="panel3-header"
                >
                  <b>1. Create an Investigation</b>
                </AccordionSummary>
                <AccordionDetails>
                  An investigation represents the overall picture of the
                  project.
                </AccordionDetails>

                {/* investigation */}

                <Box sx={{ padding: 1 }}>
                  {/* <form onSubmit={handleSubmit}> */}

                  <TextField
                    name="@id"
                    label="Investigation ID"
                    size="small"
                    value={investigationData["@id"]}
                    onChange={(e) => {
                      handleChangeInvestigation(e);
                    }}
                    fullWidth
                    sx={{ mb: 1 }}
                  />

                  <TextField
                    name="filename"
                    label="File Name"
                    size="small"
                    value={investigationData["filename"]}
                    onChange={(e) => {
                      handleChangeInvestigation(e);
                    }}
                    fullWidth
                    sx={{ mb: 1 }}
                  />

                  <TextField
                    name="identifier"
                    label="Identifier"
                    size="small"
                    value={investigationData["identifier"]}
                    onChange={(e) => {
                      handleChangeInvestigation(e);
                    }}
                    fullWidth
                    sx={{ mb: 1 }}
                  />

                  <TextField
                    name="title"
                    label="Title"
                    size="small"
                    value={investigationData["title"]}
                    onChange={handleChangeInvestigation}
                    fullWidth
                    sx={{ mb: 1 }}
                  />

                  <TextField
                    name="people"
                    label="People involved"
                    size="small"
                    value={investigationData["people"]}
                    onChange={(e) => {
                      handleChangeInvestigation(e);
                    }}
                    fullWidth
                    sx={{ mb: 1 }}
                  />
                  <TextField
                    name="description"
                    label="Description"
                    size="small"
                    value={investigationData["description"]}
                    onChange={(e) => {
                      handleChangeInvestigation(e);
                    }}
                    fullWidth
                    sx={{ mb: 1 }}
                  />

                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        sx={{ maxWidth: 250 }}
                        label="Submission Date"
                        value={
                          investigationData.submissionDate
                            ? investigationData.submissionDate
                            : null
                        }
                        onChange={handleSubmissionDate}
                      />
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        sx={{ maxWidth: 250 }}
                        label="Public Release Date"
                        value={
                          investigationData.publicReleaseDate
                            ? investigationData.publicReleaseDate
                            : null
                        }
                        onChange={handleReleaseDate}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <TextField
                    sx={{ mt: 1, mb: 1 }}
                    name="comments"
                    label="Comments"
                    size="small"
                    value={investigationData["comments"]}
                    onChange={(e) => {
                      handleChangeInvestigation(e);
                    }}
                    fullWidth
                  />
                </Box>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3-content"
                  id="panel3-header"
                >
                  <b>2. Add a Study to the investigation</b>
                </AccordionSummary>
                <AccordionDetails>
                  A Study contains contextualising information for one or more
                  Assay. Metadata about the study design, study factors used,
                  and study protocols are recorded in Study objects, as well as
                  information similarly to the Investigation including title and
                  description of the study, and related people and scholarly
                  publications.
                </AccordionDetails>

                {/* Study */}
                <Box sx={{ padding: 1 }}>
                  <Typography sx={{ mb: 2 }} variant="h7" color={"green"}>
                    Number of studies added. {studyCounter}
                  </Typography>

                  <TextField
                    name="identifier"
                    label="Identifier"
                    size="small"
                    value={studyData["identifier"]}
                    onChange={(e) => {
                      handleChangeStudy(e);
                    }}
                    fullWidth
                    sx={{ mb: 1 }}
                  />

                  <TextField
                    name="title"
                    label="title"
                    size="small"
                    value={studyData["title"]}
                    onChange={(e) => {
                      handleChangeStudy(e);
                    }}
                    fullWidth
                    sx={{ mb: 1 }}
                  />

                  <TextField
                    name="description"
                    label="description"
                    size="small"
                    value={studyData["description"]}
                    onChange={(e) => {
                      handleChangeStudy(e);
                    }}
                    fullWidth
                    sx={{ mb: 1 }}
                  />

                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        sx={{ maxWidth: 250 }}
                        label="Submission Date"
                        value={
                          studyData.submissionDate
                            ? studyData.submissionDate
                            : null
                        }
                        onChange={handleStudySubmissionDate}
                      />
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        sx={{ maxWidth: 250 }}
                        label="Public Release Date"
                        value={
                          studyData.publicReleaseDate
                            ? studyData.publicReleaseDate
                            : null
                        }
                        onChange={handleStudyReleaseDate}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <TextField
                    sx={{ mt: 1, mb: 1 }}
                    name="publications"
                    label="Publications"
                    size="small"
                    value={studyData["publications"]}
                    onChange={(e) => {
                      handleChangeStudy(e);
                    }}
                    fullWidth
                  />

                  <TextField
                    sx={{ mt: 1, mb: 1 }}
                    name="people"
                    label="People"
                    size="small"
                    value={studyData["people"]}
                    onChange={(e) => {
                      handleChangeStudy(e);
                    }}
                    fullWidth
                  />

                  <TextField
                    sx={{ mt: 1, mb: 1 }}
                    name="studyDesignDescriptors"
                    label="Study Design Descriptors"
                    size="small"
                    value={studyData["studyDesignDescriptors"]}
                    onChange={(e) => {
                      handleChangeStudy(e);
                    }}
                    fullWidth
                  />

                  <TextField
                    sx={{ mt: 1, mb: 1 }}
                    name="protocols"
                    label="Protocols"
                    size="small"
                    value={studyData["protocols"]}
                    onChange={(e) => {
                      handleChangeStudy(e);
                    }}
                    fullWidth
                  />

                  <TextField
                    sx={{ mt: 1, mb: 1 }}
                    name="materials"
                    label="Materials"
                    size="small"
                    value={studyData["materials"]}
                    onChange={(e) => {
                      handleChangeStudy(e);
                    }}
                    fullWidth
                  />

                  <TextField
                    sx={{ mt: 1, mb: 1 }}
                    name="processSequence"
                    label="Process Sequence"
                    size="small"
                    value={studyData["processSequence"]}
                    onChange={(e) => {
                      handleChangeStudy(e);
                    }}
                    fullWidth
                  />

                  <TextField
                    sx={{ mt: 1, mb: 1 }}
                    name="assays"
                    label="Assays"
                    size="small"
                    value={studyData["assays"]}
                    onChange={(e) => {
                      handleChangeStudy(e);
                    }}
                    fullWidth
                  />

                  <TextField
                    sx={{ mt: 1, mb: 1 }}
                    name="factors"
                    label="Factors"
                    size="small"
                    value={studyData["factors"]}
                    onChange={(e) => {
                      handleChangeStudy(e);
                    }}
                    fullWidth
                  />

                  <TextField
                    sx={{ mt: 1, mb: 1 }}
                    name="characteristicCategories"
                    label="Characteristic Categories"
                    size="small"
                    value={studyData["characteristicCategories"]}
                    onChange={(e) => {
                      handleChangeStudy(e);
                    }}
                    fullWidth
                  />

                  <TextField
                    sx={{ mt: 1, mb: 1 }}
                    name="unitCategories"
                    label="Unit Categories"
                    size="small"
                    value={studyData["unitCategories"]}
                    onChange={(e) => {
                      handleChangeStudy(e);
                    }}
                    fullWidth
                  />

                  <TextField
                    sx={{ mt: 1, mb: 1 }}
                    name="comments"
                    label="Comments"
                    size="small"
                    value={studyData["comments"]}
                    onChange={(e) => {
                      handleChangeStudy(e);
                    }}
                    fullWidth
                  />
                </Box>

                <AccordionActions>
                  {studyCounter != 0 ? (
                    <Button onClick={handleAddStudy}>
                      + add study ({studyCounter})
                    </Button>
                  ) : (
                    <Button onClick={handleAddStudy}>Add Study</Button>
                  )}
                </AccordionActions>
              </Accordion>

              {!studyCounter != 0 ? null : (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                  >
                    <b>3. Add an Assay to the Study</b>
                  </AccordionSummary>
                  <AccordionDetails>
                    An Assay groups descriptions of provenance of sample
                    processing for related tests. Each test typically follows
                    the steps of one particular experimental workflow described
                    by a particular protocol. Assay-related metadata includes
                    descriptions of the measurement type and technology used,
                    and a link to what study protocol is applied. Where an assay
                    produces data files, links to the data are recorded here.
                  </AccordionDetails>

                  <Box sx={{ padding: 1 }}>
                    <Autocomplete
                      size="small"
                      sx={{ mb: 1 }}
                      id="autocomplete-demo"
                      options={studies}
                      value={selectedStudy}
                      onChange={handleStudyChange}
                      renderInput={(params) => (
                        <TextField {...params} label="Autocomplete" />
                      )}
                      noOptionsText="Please add a study"
                    />

                    <Typography sx={{ mb: 4 }} variant="h7" color={"green"}>
                      Number of Assays added: {assayCounter} in the study:{" "}
                      {selectedStudy ? selectedStudy : "No study selected"}
                    </Typography>

                    <TextField
                      name="measurementType"
                      label="Measurement Type"
                      size="small"
                      value={assayData["measurementType"]}
                      onChange={(e) => {
                        handleChangeAssay(e);
                      }}
                      fullWidth
                      sx={{ mb: 1 }}
                    />

                    <TextField
                      name="technologyType"
                      label="Technology Type"
                      size="small"
                      value={assayData["technologyType"]}
                      onChange={(e) => {
                        handleChangeAssay(e);
                      }}
                      fullWidth
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      name="technologyPlatform"
                      label="Technology Platform"
                      size="small"
                      value={assayData["technologyPlatform"]}
                      onChange={(e) => {
                        handleChangeAssay(e);
                      }}
                      fullWidth
                      sx={{ mb: 1 }}
                    />

                    <TextField
                      name="filename"
                      label="File name"
                      size="small"
                      value={assayData["filename"]}
                      onChange={(e) => {
                        handleChangeAssay(e);
                      }}
                      fullWidth
                      sx={{ mb: 1, mt: 1 }}
                    />

                    <TextField
                      name="dataFiles"
                      label="Data Files"
                      size="small"
                      value={assayData["dataFiles"]}
                      onChange={(e) => {
                        handleChangeAssay(e);
                      }}
                      fullWidth
                      sx={{ mb: 1, mt: 1 }}
                    />

                    <TextField
                      sx={{ mt: 1, mb: 1 }}
                      name="materials"
                      label="Materials"
                      size="small"
                      value={assayData["materials"]}
                      onChange={(e) => {
                        handleChangeAssay(e);
                      }}
                      fullWidth
                    />

                    <TextField
                      sx={{ mt: 1, mb: 1 }}
                      name="characteristicCategories"
                      label="Characteristic Categories"
                      size="small"
                      value={assayData["characteristicCategories"]}
                      onChange={(e) => {
                        handleChangeAssay(e);
                      }}
                      fullWidth
                    />

                    <TextField
                      sx={{ mt: 1, mb: 1 }}
                      name="unitCategories"
                      label="Unit Categories"
                      size="small"
                      value={assayData["unitCategories"]}
                      onChange={(e) => {
                        handleChangeAssay(e);
                      }}
                      fullWidth
                    />

                    <TextField
                      sx={{ mt: 1, mb: 1 }}
                      name="comments"
                      label="Comments"
                      size="small"
                      value={assayData["comments"]}
                      onChange={(e) => {
                        handleChangeAssay(e);
                      }}
                      fullWidth
                    />
                  </Box>

                  <AccordionActions>
                    {assayCounter != 0 ? (
                      <Button onClick={handleAddAssay}>
                        + add Assay ({studyCounter})
                      </Button>
                    ) : (
                      <Button onClick={handleAddAssay}>Add Assay</Button>
                    )}
                  </AccordionActions>
                </Accordion>
              )}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper
            sx={{ padding: 1 }}
            style={{ border: "2px solid green", minHeight: "100px" }}
          >
            {/* <ReactJson src={investigation} theme="solarized"/>  */}
            <ReactJson src={investigation}/> 


          </Paper>
        </Grid>

        <Box>
          <Button onClick={handleIsaTabDownload}> Downolad ISA-Tab</Button>
          <Button onClick={handleJsonDownload}> Downolad ISA-json</Button>
        </Box>
      </Grid>
    </div>
  );
}
