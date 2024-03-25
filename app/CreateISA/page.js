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

import { styled } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info'; // Import the icon you want to use


const BlobIcon = styled('div')({
  width: '10px', // Adjust width as needed
  height: '20px', // Adjust height as needed
  backgroundColor: 'lightgray', // Adjust background color as needed
  borderRadius: '50%',
  marginRight: '8px', // Adjust margin as needed
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: 'gray', // Change background color on hover
  },
});



class Investigation {
  constructor(data) {
    this["@id"] = data["@id"] || 600450;
    this.filename = data.filename || "investigation.json";
    this.identifier = data.identifier || "PRJEB32225";
    this.title = data.title || "Long-read sequencing and assembly of version 5 of the B73 maize genome";
    this.description = data.description || "This is the fifth version of the maize B73 inbred line genomic sequence.";
    this.submissionDate = data.submissionDate || "";
    this.publicReleaseDate = data.publicReleaseDate || "";
    this.ontologySourceReferences = data.ontologySourceReferences || [];
    this.publications = data.publications || ['Clifton SW et al., "Sequence and comparative analysis of the maize NB mitochondrial genome.", Plant Physiol, 2004 Nov;136(3):3486-503'];
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


class Publication {
  constructor(data) {
    this.citation = data.citation || '';
    this.doi = data.doi || "";
  }

  // Getters and setters for each property if needed
}

class Person{
  constructor(data) {
    this.person_id = data.person_id || '0000-0003-0782-438X';
    this.first_name = data.first_name || "Carol ";
    this.last_name = data.last_name || "Soderlund";
    this.email = data.email || "cari@agcol.arizona.edu";
    this.affiliation = data.affiliation || "BIO5 Institute, University of Arizona, Tucson, Arizona, United States of America";
    this.role = data.role || "Researcher";
  }
}


async function getOrcidId(searchName) {
  const searchNameParts = searchName.trim().split(' ').filter(item => item !== '');
  const apiUrl = `https://pub.orcid.org/v3.0/search/?q=personal-details:(given-names:"${searchNameParts[0]}" AND family-name:"${searchNameParts[1]}")`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    const results = data.result;

    if (results && results.length > 0) {
      const orcidId = results[0]['orcid-identifier'].path;
      return orcidId;
    } else {
      console.log("ORCID iD not found for", searchName);
      return 'ORCID iD not found';
    }
  } catch (error) {
    console.error("Error fetching ORCID data:", error);
    return 'Error fetching ORCID data';
  }
}

async function getCitation(doi) {
  const apiUrl = `https://api.crossref.org/works/${doi}`;

  try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data && data.message && data.message.title && data.message.author && data.message["container-title"]) {
          const title = data.message.title[0];
          const authors = data.message.author.map(author => `${author.given} ${author.family}`);
          const journal = data.message["container-title"][0];
          const volume = data.message.volume || '';
          const issue = data.message.issue || '';
          const pages = data.message.page || '';
          const year = data.message.published["date-parts"][0][0];

          // Format citation in APA style
          const authorsString = authors.length > 1 ? authors.slice(0, -1).join(', ') + ', & ' + authors.slice(-1) : authors[0];
          const citation = `${authorsString} (${year}). ${title}. ${journal}, ${volume}(${issue}), ${pages}. https://doi.org/${doi}`;

          return citation;
      } else {
          return 'Citation information not found for the provided DOI.';
      }
  } catch (error) {
      console.error("Error fetching citation data:", error);
      return 'Error fetching citation data.';
  }
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

// // Function to convert a JavaScript object to a TSV string
// function objectToTsv(obj) {
//   function flatten(obj) {
//     const result = {};
//     for (const key in obj) {
//       if (Array.isArray(obj[key])) {
//         obj[key].forEach((item, index) => {
//           flatten(item).forEach((value, i) => {
//             result[`${key}_${index + 1}_${i + 1}`] = value;
//           });
//         });
//       } else if (typeof obj[key] === "object" && obj[key] !== null) {
//         flatten(obj[key]).forEach((value, i) => {
//           result[`${key}_${i + 1}`] = value;
//         });
//       } else {
//         result[key] = obj[key];
//       }
//     }
//     return result;
//   }

//   const flattenedObj = flatten(obj);

//   const headers = Object.keys(flattenedObj);
//   const rows = [headers.map((header) => flattenedObj[header])];

//   return rows.map((row) => row.join("\t")).join("\n");
// }

// // Function to download TSV files
// function downloadTsv(data, filename) {
//   const tsvString = objectToTsv(data);
//   console.log(tsvString);
//   const blob = new Blob([tsvString], { type: "text/tsv" });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = filename || "data.tsv";
//   a.click();
//   URL.revokeObjectURL(url);
// }

export default function MetadataForm() {
  var investigation = new Investigation({});
  var study = new Study({});
  var assay = new Assay({});
  var person = new Person({});
  var publication = new Publication({})



  const [investigationData, setInvestigationData] = useState(investigation);
  const [studyCounter, setStudyCounter] = useState(0);
  const [studyData, setStudyData] = useState(study);

  const [studies, setStudies] = useState([]);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [assayCounter, setAssayCounter] = useState(0);




  const handleJsonDownload = () => {
    downloadJson(investigationData, investigation.filename);
  };

  const handleIsaTabDownload = () => {
    // Create an array to store TSV content for each file
    const tsvFiles = [];
  
    // Generate investigation.tsv
    const investigationTSV = generateTSV(investigationData);
    tsvFiles.push({ content: investigationTSV, filename: "investigation.tsv" });
  
    // Generate study.tsv and assay.tsv for each study and assay
    investigationData.studies.forEach((study) => {
      const studyTSV = generateTSV(study);
      tsvFiles.push({ content: studyTSV, filename: `Study_${study.identifier}_${investigationData.identifier}.tsv` });
  
      if (study.assays) {
        study.assays.forEach((assay) => {
          const assayTSV = generateTSV(assay);
          tsvFiles.push({ content: assayTSV, filename: `Assay_${assay.identifier}_${study.identifier}.tsv` });
        });
      }
    });
    
    // Trigger download for each file
    tsvFiles.forEach(({ content, filename }) => {
      downloadTSVFile(content, filename);
    });
  };
  
  
  const generateTSV = (data) => {
    let tsv = "";
    for (const [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        tsv += `${key}\t${value.join(',')}\n`;
      } else {
        tsv += `${key}\t${value}\n`;
      }
    }
    return tsv;
  };
  
  const downloadTSVFile = (tsvContent, filename) => {
    const blob = new Blob([tsvContent], { type: "text/tsv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
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
    // Create a copy of the studies array and add the new study identifier
    const updatedStudies = [...studies, studyData.identifier];
  
    // Create a copy of the investigationData with the updated studies array
    const updatedInvestigationData = {
      ...investigationData,
      studies: [...investigationData.studies, studyData]
    };
  
    // Set the state with the updated studies array and investigationData
    setStudies(updatedStudies);
    setInvestigationData(updatedInvestigationData);
  
    // Other state updates
    setStudyCounter(studyCounter + 1);
    setStudyData(new Study({}));
  };
  

  const handleAddAssay = () => {
    // Create a copy of the investigationData with the updated assays array
    const updatedInvestigationData = {
      ...investigationData,
      studies: investigationData.studies.map(study => {
        if (study.identifier === selectedStudy) {
          return {
            ...study,
            assays: [...study.assays, assay]
          };
        }
        return study;
      })
    };
  
    // Set the state with the updated investigationData
    setInvestigationData(updatedInvestigationData);
  
    // Other state updates
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






// PERSON
const [personCounter, setPersonCounter] = useState(0);
const [personData, setPersonData] = useState(person);

const handleChangePeople = (e) => {
  const { name, value } = e.target;
  const trimmedValue = value.trim();
  setPersonData({ ...personData, [name]: trimmedValue });
};


const handleAddPerson = async () => {
  const searchName = `${person.first_name} ${person.last_name}`
  const orcidId = await getOrcidId(searchName)
  personData.person_id = orcidId
  // Create a copy of the investigationData with the updated assays array
  const updatedInvestigationData = {
    ...investigationData,
    people: [...investigationData.people, personData]
  };

  // Set the state with the updated investigationData
  setInvestigationData(updatedInvestigationData);

  // Other state updates
  setPersonCounter(personCounter + 1);

  setPersonData(new Person({}));
};


// Publications


const [publicationData, setPublicationData] = useState(publication);
const [publicationCounter, setPublicationCounter] = useState(0);

function isDOI(str) {
  // Regular expression pattern to match a DOI
  const doiPattern = /^10\.\d{4,}\/\S+$/;

  // Test if the string matches the pattern
  return doiPattern.test(str);
}

const handleChangePublication = (e) => {
  const { name, value } = e.target;
  const trimmedValue = value.trim();
  if(isDOI(trimmedValue)){
    setPublicationData({ ...publicationData, 'doi': trimmedValue });
  }else{
    setPublicationData({ ...publicationData, 'citation': trimmedValue });
  }

};

async function getDOI(citation) {
  const apiUrl = `https://api.crossref.org/works?query.bibliographic=${encodeURIComponent(citation)}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const items = data.message.items;

    // Check if any items are returned
    if (items && items.length > 0) {
      // Return the DOI of the first item
      console.log(items[0].DOI)
      return items[0].DOI;
    } else {
      console.log("DOI not found for the citation:", citation);
      return null;
    }
  } catch (error) {
    console.error("Error fetching DOI data:", error);
    return null;
  }
}

// Example usage:
getDOI("Title of the research paper").then(doi => {
  console.log("DOI:", doi);
});


const handleAddPublication = async () => {
  // publicationData
  console.log(publicationData)

  if(publicationData.doi){
    const citation = await getCitation(publication.doi)
    publicationData.citation = citation
    const updatedInvestigationData = {
    ...investigationData,
    publications: [...investigationData.publications, publicationData]
  };
  setInvestigationData(updatedInvestigationData);

  }else{
    const doi = await getDOI(publication.citation)
    publicationData.doi = doi
    const updatedInvestigationData = {
    ...investigationData,
    publications: [...investigationData.publications, publicationData]
  };
  setInvestigationData(updatedInvestigationData);

  }
  setPublicationCounter(publicationCounter + 1)
  setPublicationData(new Publication({}));
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
                Investigations are research programmes with defined aims. They can exist at various scales (for example, they could encompass a grant-funded programme of work, the various components comprising a peer-reviewed publication, or a single experiment).                </AccordionDetails>

                {/* investigation */}

                <Box sx={{ padding: 1 }}>
                  {/* <form onSubmit={handleSubmit}> */}


                  <TextField
      name="@id"
      label={
        <React.Fragment>
          Investigation ID
          <Tooltip title="Identifier comprising the unique name of the institution/database hosting the submission of the investigation data, and the accession number of the investigation in that institution.(MIAPPE_Checklist-Data-Model-v1.1)">
            <IconButton size="small" edge="end" aria-label="info">
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      }
      value={investigationData["@id"]}
      onChange={(e) => {
        handleChangeInvestigation(e);
      }}

      size="small"
      fullWidth
      sx={{ mb: 1 }}
    />


                  <TextField
                    name="filename"
                    label={
                      <React.Fragment>
                        File Name
                        <Tooltip title="The name of the downIdentifier comprising the unique name of the institution/database hosting the submission of the investigation data, and the accession number of the investigation in that institution.(MIAPPE_Checklist-Data-Model-v1.1)">
                          <IconButton size="small" edge="end" aria-label="info">
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </React.Fragment>
                    }
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
                    label={
                      <React.Fragment>
                        Identifier
                        <Tooltip title="Identifier comprising the unique name of the institution/database hosting the submission of the investigation data, and the accession number of the investigation in that institution.(MIAPPE_Checklist-Data-Model-v1.1)">
                          <IconButton size="small" edge="end" aria-label="info">
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </React.Fragment>
                    }
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
                    label={
                      <React.Fragment>
                        Title
                        <Tooltip title="Human-readable string summarising the investigation.(MIAPPE_Checklist-Data-Model-v1.1)">
                          <IconButton size="small" edge="end" aria-label="info">
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </React.Fragment>
                    }
                    size="small"
                    value={investigationData["title"]}
                    onChange={handleChangeInvestigation}
                    fullWidth
                    sx={{ mb: 1 }}
                  />




<Typography variant="h7"  ><b>Add People</b></Typography>
<Grid sx={{border:1, borderColor : 'green', mt:1, mb:1}}> 
<Box sx={{padding:1}}>

<TextField
                    name="person_id"
                    label={
                      <React.Fragment>
                        Person ID
                        <Tooltip title="An identifier for the data submitter. If that submitter is an individual, ORCID identifiers are recommended.">
                          <IconButton size="small" edge="end" aria-label="info">
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </React.Fragment>
                    }

                    size="small"
                    value={personData["person_id"]}
                    onChange={(e) => {
                      handleChangePeople(e);
                    }}
                    fullWidth
                    sx={{ mb: 1 }}
                  />


<TextField
                    name="first_name"
                    label={
                      <React.Fragment>
                        First Name
                        <Tooltip title="First name of the person.">
                          <IconButton size="small" edge="end" aria-label="info">
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </React.Fragment>
                    }

                    size="small"
                    value={personData["first_name"]}
                    onChange={(e) => {
                      handleChangePeople(e);
                    }}
                    fullWidth
                    sx={{ mb: 1 }}
                  />

<TextField
                    name="last_name"
                    label={
                      <React.Fragment>
                        Last Name
                        <Tooltip title="Last name of the person.">
                          <IconButton size="small" edge="end" aria-label="info">
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </React.Fragment>
                    }
                    size="small"
                    value={personData["last_name"]}
                    onChange={(e) => {
                      handleChangePeople(e);
                    }}
                    fullWidth
                    sx={{ mb: 1 }}
                  />

<TextField
                    name="email"
                    label={
                      <React.Fragment>
                        Email
                        <Tooltip title="The electronic mail address of the person.">
                          <IconButton size="small" edge="end" aria-label="info">
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </React.Fragment>
                    }
                    size="small"
                    value={personData["email"]}
                    onChange={(e) => {
                      handleChangePeople(e);
                    }}
                    fullWidth
                    sx={{ mb: 1 }}
                  />


<TextField
                    name="role"
                    label={
                      <React.Fragment>
                        Role
                        <Tooltip title="Type of contribution of the person to the investigation.">
                          <IconButton size="small" edge="end" aria-label="info">
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </React.Fragment>
                    }
                    size="small"
                    value={personData["role"]}
                    onChange={(e) => {
                      handleChangePeople(e);
                    }}
                    fullWidth
                    sx={{ mb: 1 }}
                  />

<TextField
                    name="affiliation"
                    label={
                      <React.Fragment>
                        Affiliation
                        <Tooltip title="The institution the person belongs to.">
                          <IconButton size="small" edge="end" aria-label="info">
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </React.Fragment>
                    }

                    size="small"
                    value={personData["affiliation"]}
                    onChange={(e) => {
                      handleChangePeople(e);
                    }}
                    fullWidth
                    sx={{ mb: 1 }}
                  />

{personCounter != 0 ? (
                    <Button onClick={handleAddPerson}>
                      + add person ({personCounter})
                    </Button>
                  ) : (
                    <Button onClick={handleAddPerson}>Add person</Button>
                  )}

</Box>


</Grid>


                  <TextField
                    name="description"
                    label={
                      <React.Fragment>
                        Description
                        <Tooltip title="Human-readable text describing the investigation in more detail.">
                          <IconButton size="small" edge="end" aria-label="info">
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </React.Fragment>
                    }
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
                        label={
                          <React.Fragment>
                            Submission Date
                            <Tooltip title="Date of submission of the dataset presently being described to a host repository.">
                              <IconButton size="small" edge="end" aria-label="info">
                                <InfoIcon />
                              </IconButton>
                            </Tooltip>
                          </React.Fragment>
                        }
    
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
                        label={
                          <React.Fragment>
                            Public Release Date
                            <Tooltip title="Date of first public release of the dataset presently being described.">
                              <IconButton size="small" edge="end" aria-label="info">
                                <InfoIcon />
                              </IconButton>
                            </Tooltip>
                          </React.Fragment>
                        }

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
                    name="publications"
                    label={
                      <React.Fragment>
                        Publications
                        <Tooltip title='An identifier for a literature publication where the investigation is described. Use of DOIs is recommended.Please add here complete citations or DOI'>
                          <IconButton size="small" edge="end" aria-label="info">
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </React.Fragment>
                    }
                    size="small"
                    value={investigationData["publications"][0]}
                    onChange={(e) => {
                      handleChangePublication(e);
                    }}
                    fullWidth
                  />

{publicationCounter != 0 ? (
                    <Button onClick={handleAddPublication}>
                      + add publication ({publicationCounter})
                    </Button>
                  ) : (
                    <Button onClick={handleAddPublication}>add publication</Button>
                  )
                  }



                  <TextField
                    sx={{ mt: 1, mb: 1 }}
                    name="comments"
                    label={
                      <React.Fragment>
                        Comments
                        <Tooltip title="Any supporting comments for this investigation.">
                          <IconButton size="small" edge="end" aria-label="info">
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </React.Fragment>
                    }
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
             <ReactJson src={investigationData}/> 



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
