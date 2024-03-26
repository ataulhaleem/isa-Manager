"use client";

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

import ReactJson from "react-json-view-ssr";

import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info"; // Import the icon you want to use

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const MIAPPE_V = "(MIAPPE_Checklist-Data-Model-v1.1)";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

import {
  Investigation,
  Study,
  Assay,
  Publication,
  Person,
  Factor,
  Material,
  File,
  Sample
} from "../../utils/classes.js";
import {
  getOrcidId,
  getCitation,
  isDOI,
  downloadJson,
  generateTSV,
  downloadTSVFile,
} from "../../utils/functions.js";

export default function MetadataForm() {
  var investigation = new Investigation({});
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  // -----------------------------------------------------------------------------------------  Investigation
  const [investigationData, setInvestigationData] = useState(investigation);

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

  const handleChangeInvestigation = (e) => {
    const { name, value } = e.target;
    setInvestigationData({ ...investigationData, [name]: value });
  };

  // --------------------------------------------------------------------------------------       Study
  var study = new Study({});

  const [studies, setStudies] = useState([]);
  const [studyCounter, setStudyCounter] = useState(0);
  const [studyPersonCounter, setStudyPersonCounter] = useState(0);

  const [studyData, setStudyData] = useState(study);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [assayCounter, setAssayCounter] = useState(0);
  const handleStudyChange = (event, newValue) => {
    setSelectedStudy(newValue);
  };

  const handleChangeStudy = (e) => {
    const { name, value } = e.target;
    setStudyData({ ...studyData, [name]: value });
  };

  const handleAddStudy = () => {
    studyData.identifier = studyData.identifier
      ? investigationData.identifier + studyData.identifier
      : `${investigationData.identifier}S1`;
    setStudies([...studies, studyData.identifier]);
    const updatedInvestigationData = {
      ...investigationData,
      studies: [...investigationData.studies, studyData],
    };
    // Set the state with the updated studies array and investigationData
    setInvestigationData(updatedInvestigationData);
    // Other state updates
    setStudyCounter(studyCounter + 1);
    setStudyData(new Study({}));
  };

  const handleStudySubmissionDate = (date) => {
    const dateString = date.format("YYYY-MM-DD");
    setStudyData({ ...studyData, startDate: dateString });
  };

  const handleStudyReleaseDate = (date) => {
    const dateString = date.format("YYYY-MM-DD");
    setStudyData({ ...studyData, endDate: dateString });
  };

  const handleAddPersonToStudy = () => {
    const updateStudyData = {
      ...studyData,
      people: [...studyData.people, personData],
    };
    setStudyData(updateStudyData);
    setStudyPersonCounter(studyPersonCounter + 1)
    // Other state updates
    setPersonData(new Person({}));
  };

  // ----------------------------------------------------------------------------------------- Assay
  var assay = new Assay({});

  const [assayData, setAssayData] = useState(assay);

  const handleChangeAssay = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    setAssayData({ ...assayData, [name]: trimmedValue });
  };

  const handleAddAssay = () => {
    // Create a copy of the investigationData with the updated assays array
    console.log("STUDY", selectedStudy);
    const updatedInvestigationData = {
      ...investigationData,
      studies: investigationData.studies.map((study) => {
        if (study.identifier === selectedStudy) {
          return {
            ...study,
            assays: [...study.assays, assayData],
          };
        }
        return study;
      }),
    };

    // Set the state with the updated investigationData
    setInvestigationData(updatedInvestigationData);

    // Other state updates
    setAssayCounter(assayCounter + 1);
    setAssayData(new Assay({}));
  };



    // ----------------------------------------------------------------------------------------- Sample
    var sample = new Sample({})
    const [sampleCounter, setSampleCounter] = useState(0);
    const [sampleData, setSampleData] = useState(sample);
  
    const handleChangeSample = (e) => {
      const { name, value } = e.target;
      setSampleData({ ...sampleData, [name]: value });
    };
  
    const handleAddSample = async () => {
      const updatedAssayData = {
        ...assayData,
        samples: [...assayData.samples, sampleData],
      };
      setAssayData(updatedAssayData);
      setSampleCounter(sampleCounter + 1)
      // Other state updates
      setSampleData(new Sample({}));
      };




          // ----------------------------------------------------------------------------------------- File
    var file = new File({})

    const [fileCounter, setFileCounter] = useState(0);
    const [fileData, setFileData] = useState(file);
  
    const handleChangeFile = (e) => {
      const { name, value } = e.target;
      setFileData({ ...fileData, [name]: value });
    };
  
    const handleAddFile = async () => {
      const updatedSampleData = {
        ...sampleData,
        dataset: [...sampleData.dataset, fileData],
      };
      setSampleData(updatedSampleData);
      setFileCounter(fileCounter + 1)
      // Other state updates
      setFileData(new File({}));
      };




  // ----------------------------------------------------------------------------------------- PERSON
  var person = new Person({});

  const [personCounter, setPersonCounter] = useState(0);
  const [personData, setPersonData] = useState(person);

  const handleChangePeople = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    setPersonData({ ...personData, [name]: trimmedValue });
  };

  const handleAddPerson = async () => {
    const orcidId = await getOrcidId(
      personData.first_name,
      personData.last_name
    );
    personData.person_id = orcidId;
    // Create a copy of the investigationData with the updated assays array
    const updatedInvestigationData = {
      ...investigationData,
      people: [...investigationData.people, personData],
    };

    // Set the state with the updated investigationData
    setInvestigationData(updatedInvestigationData);

    // Other state updates
    setPersonCounter(personCounter + 1);

    setPersonData(new Person({}));
  };


  // ----------------------------------------------------------------------------------------- Factor
    var factor = new Factor({});
    const [factorCounter, setFactorCounter] = useState(0);
    const [factorData, setFactorData] = useState(factor);
  
    const handleChangeFactor = (e) => {
      const { name, value } = e.target;
      const trimmedValue = value.trim();
      setFactorData({ ...factorData, [name]: trimmedValue });
    };
  
    const handleAddFactor = async () => {
      const updateStudyData = {
        ...studyData,
        factors: [...studyData.factors, factorData],
      };
      setStudyData(updateStudyData);
      setFactorCounter(factorCounter + 1)
      // Other state updates
      setFactorData(new Factor({}));
      };

  // ----------------------------------------------------------------------------------------- Material
var material = new Material({});
const [materialCounter, setMaterialCounter] = useState(0);
const [materialData, setMaterialData] = useState(material);

const handleChangeMaterial = (e) => {
  const { name, value } = e.target;
  const trimmedValue = value.trim();
  setMaterialData({ ...materialData, [name]: trimmedValue });
};

const handleAddMaterial = async () => {
  const updateStudyData = {
    ...studyData,
    materials: [...studyData.materials, materialData],
  };
  setStudyData(updateStudyData);
  setMaterialCounter(materialCounter + 1)
  // Other state updates
  // setMaterialData(new Factor({}));
  };
    








  // Publications
  var publication = new Publication({});

  const [publicationData, setPublicationData] = useState(publication);
  const [publicationCounter, setPublicationCounter] = useState(0);

  const handleChangePublication = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    if (isDOI(trimmedValue)) {
      setPublicationData({ ...publicationData, doi: trimmedValue });
    } else {
      setPublicationData({ ...publicationData, citation: trimmedValue });
    }
  };

  const handleAddPublication = async () => {
    // publicationData
    console.log(publicationData);

    if (publicationData.doi) {
      const citation = await getCitation(publication.doi);
      publicationData.citation = citation;
      const updatedInvestigationData = {
        ...investigationData,
        publications: [...investigationData.publications, publicationData],
      };
      setInvestigationData(updatedInvestigationData);
    } else {
      const doi = await getDOI(publication.citation);
      publicationData.doi = doi;
      const updatedInvestigationData = {
        ...investigationData,
        publications: [...investigationData.publications, publicationData],
      };
      setInvestigationData(updatedInvestigationData);
    }
    setPublicationCounter(publicationCounter + 1);
    setPublicationData(new Publication({}));
  };

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
      tsvFiles.push({
        content: studyTSV,
        filename: `Study_${study.identifier}_${investigationData.identifier}.tsv`,
      });

      if (study.assays) {
        study.assays.forEach((assay) => {
          const assayTSV = generateTSV(assay);
          tsvFiles.push({
            content: assayTSV,
            filename: `Assay_${assay.identifier}_${study.identifier}.tsv`,
          });
        });
      }
    });

    // Trigger download for each file
    tsvFiles.forEach(({ content, filename }) => {
      downloadTSVFile(content, filename);
    });
  };

  return (
    <div>
      <Grid container spacing={0.3}>
        <Grid item xs={6}>
          <Paper style={{ border: "1px solid white", minHeight: "100px" }}>
            <Box sx={{ width: "100%" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
              >
                <Tab label="1. Investigation" {...a11yProps(0)} />
                <Tab label="2. Study" {...a11yProps(1)} />
                <Tab label="3. Assay" {...a11yProps(2)} />
              </Tabs>

              <TabPanel value={value} index={0}>
                {/* investigation tab */}
                <Accordion defaultExpanded>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                  >
                    <b>1. Create an Investigation</b>
                  </AccordionSummary>
                  <AccordionDetails>
                    Investigations are research programmes with defined aims.
                    They can exist at various scales (for example, they could
                    encompass a grant-funded programme of work, the various
                    components comprising a peer-reviewed publication, or a
                    single experiment).{" "}
                  </AccordionDetails>

                  {/* investigation */}

                  <Box sx={{ padding: 1 }}>
                    {/* <form onSubmit={handleSubmit}> */}

                    <TextField
                      name="@id"
                      label={
                        <React.Fragment>
                          Investigation ID
                          <Tooltip title="Identifier comprising the unique name of the institution/database hosting the submission of the investigation data, and the accession number of the investigation in that institution.(MIAPPE_Checklist-Data-Model-v1.1)">
                            <IconButton
                              size="small"
                              edge="end"
                              aria-label="info"
                            >
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
                            <IconButton
                              size="small"
                              edge="end"
                              aria-label="info"
                            >
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
                            <IconButton
                              size="small"
                              edge="end"
                              aria-label="info"
                            >
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
                            <IconButton
                              size="small"
                              edge="end"
                              aria-label="info"
                            >
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


                    <Accordion sx={{ mt: 1, mb: 1 }} defaultClosed>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel5-header"
                      >
                        <b>Add People to this investigation</b>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container justifyContent="space-between">
                          <Grid item>
                            <Box>
                              <TextField
                                name="person_id"
                                label={
                                  <React.Fragment>
                                    Person ID
                                    <Tooltip title="An identifier for the data submitter. If that submitter is an individual, ORCID identifiers are recommended.">
                                      <IconButton
                                        size="small"
                                        edge="end"
                                        aria-label="info"
                                      >
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
                                      <IconButton
                                        size="small"
                                        edge="end"
                                        aria-label="info"
                                      >
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
                                      <IconButton
                                        size="small"
                                        edge="end"
                                        aria-label="info"
                                      >
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
                                      <IconButton
                                        size="small"
                                        edge="end"
                                        aria-label="info"
                                      >
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
                                      <IconButton
                                        size="small"
                                        edge="end"
                                        aria-label="info"
                                      >
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
                                      <IconButton
                                        size="small"
                                        edge="end"
                                        aria-label="info"
                                      >
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
                            </Box>
                          </Grid>
                          <Grid item>
                            {personCounter != 0 ? (
                              <Button onClick={handleAddPerson}>
                                + add person ({personCounter})
                              </Button>
                            ) : (
                              <Button onClick={handleAddPerson}>
                                Add person
                              </Button>
                            )}
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>

                    <TextField
                      name="description"
                      label={
                        <React.Fragment>
                          Description
                          <Tooltip title="Human-readable text describing the investigation in more detail.">
                            <IconButton
                              size="small"
                              edge="end"
                              aria-label="info"
                            >
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
                                <IconButton
                                  size="small"
                                  edge="end"
                                  aria-label="info"
                                >
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
                                <IconButton
                                  size="small"
                                  edge="end"
                                  aria-label="info"
                                >
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
                          <Tooltip title="An identifier for a literature publication where the investigation is described. Use of DOIs is recommended.Please add here complete citations or DOI">
                            <IconButton
                              size="small"
                              edge="end"
                              aria-label="info"
                            >
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
                      <Button onClick={handleAddPublication}>
                        add publication
                      </Button>
                    )}

                    <TextField
                      sx={{ mt: 1, mb: 1 }}
                      name="comments"
                      label={
                        <React.Fragment>
                          Comments
                          <Tooltip title="Any supporting comments for this investigation.">
                            <IconButton
                              size="small"
                              edge="end"
                              aria-label="info"
                            >
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
              </TabPanel>

              <TabPanel value={value} index={1}>
                {/* study tab */}

                <Accordion defaultExpanded>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                  >
                    <b>2. Add a Study to the investigation</b>
                  </AccordionSummary>
                  <AccordionDetails>
                    A study (or experiment) comprises a series of assays (or
                    measurements) of one or more types, undertaken to answer a
                    particular biological question.
                    (MIAPPE_Checklist-Data-Model-v1.1)
                  </AccordionDetails>

                  {/* Study */}
                  <Box sx={{ padding: 1 }}>
                    <Typography sx={{ mb: 2 }} variant="h7" color={"green"}>
                      Number of studies added. {studyCounter}
                    </Typography>

                    <TextField
                      name="identifier"
                      label={
                        <React.Fragment>
                          Study ID
                          <Tooltip title="Unique identifier comprising the name or identifier for the institution/database hosting the submission of the study data, and the identifier of the study in that institution.(MIAPPE_Checklist-Data-Model-v1.1)">
                            <IconButton
                              size="small"
                              edge="end"
                              aria-label="info"
                            >
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        </React.Fragment>
                      }
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
                      label={
                        <React.Fragment>
                          Title
                          <Tooltip title="Human-readable text summarising the study.(MIAPPE_Checklist-Data-Model-v1.1)">
                            <IconButton
                              size="small"
                              edge="end"
                              aria-label="info"
                            >
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        </React.Fragment>
                      }
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
                      label={
                        <React.Fragment>
                          Description
                          <Tooltip
                            title={`Human-readable text describing the study.${MIAPPE_V})`}
                          >
                            <IconButton
                              size="small"
                              edge="end"
                              aria-label="info"
                            >
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        </React.Fragment>
                      }
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
                          label="Study Start Date"
                          value={studyData.startDate ? studyData.endDate : null}
                          onChange={handleStudySubmissionDate}
                        />
                      </LocalizationProvider>

                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          sx={{ maxWidth: 250 }}
                          label="Study End Date"
                          value={
                            studyData.publicReleaseDate
                              ? studyData.publicReleaseDate
                              : null
                          }
                          onChange={handleStudyReleaseDate}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Accordion sx={{ mt: 1 }} defaultClosed>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel4-header"
                      >
                        <b>Add People to this study</b>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container justifyContent="space-between">
                          <Grid item>
                            <Box>
                              <TextField
                                name="person_id"
                                label={
                                  <React.Fragment>
                                    Person ID
                                    <Tooltip title="An identifier for the data submitter. If that submitter is an individual, ORCID identifiers are recommended.">
                                      <IconButton
                                        size="small"
                                        edge="end"
                                        aria-label="info"
                                      >
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
                                      <IconButton
                                        size="small"
                                        edge="end"
                                        aria-label="info"
                                      >
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
                                      <IconButton
                                        size="small"
                                        edge="end"
                                        aria-label="info"
                                      >
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
                                      <IconButton
                                        size="small"
                                        edge="end"
                                        aria-label="info"
                                      >
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
                                      <IconButton
                                        size="small"
                                        edge="end"
                                        aria-label="info"
                                      >
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
                                      <IconButton
                                        size="small"
                                        edge="end"
                                        aria-label="info"
                                      >
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
                            </Box>
                          </Grid>
                          <Grid item>
                            {studyPersonCounter != 0 ? (
                              <Button onClick={handleAddPersonToStudy}>
                                + add person ({studyPersonCounter})
                              </Button>
                            ) : (
                              <Button onClick={handleAddPersonToStudy}>
                                Add person
                              </Button>
                            )}
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>

                    <TextField
                      sx={{ mt: 1, mb: 1 }}
                      name="studyDesignDescriptors"
                      label={
                        <React.Fragment>
                          Study Design Descriptors
                          <Tooltip title='Short description of the experimental design, possibly including statistical design. In specific cases, e.g. legacy datasets or data computed from several studies, the experimental design can be "unknown"/"NA", "aggregated/reduced data", or simply "none".'>
                            <IconButton
                              size="small"
                              edge="end"
                              aria-label="info"
                            >
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        </React.Fragment>
                      }
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
                      label={
                        <React.Fragment>
                          Protocols
                          <Tooltip
                            title={`General description of the cultural practices of the study. ${MIAPPE_V}`}
                          >
                            <IconButton
                              size="small"
                              edge="end"
                              aria-label="info"
                            >
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        </React.Fragment>
                      }
                      size="small"
                      value={studyData["protocols"]}
                      onChange={(e) => {
                        handleChangeStudy(e);
                      }}
                      fullWidth
                    />

<Accordion sx={{ mt: 1 }} defaultClosed>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel6-header"
                      >
                        <b>Add Materials</b>
                      </AccordionSummary>
                      <AccordionDetails>








                      <Grid>

<TextField
                    sx={{ mt: 1, mb: 1 }}
                    name="material_id"
                    label={
                      <React.Fragment>
                        Material ID
                        <Tooltip
                          title={`Code used to identify the biological material in the data file. Should be unique within the Investigation. Can correspond to experimental plant ID, seed lot ID, etcÉ This material identification is different from a BiosampleID which corresponds to Observation Unit or Samples sections below. ${MIAPPE_V}`}
                        >
                          <IconButton
                            size="small"
                            edge="end"
                            aria-label="info"
                          >
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </React.Fragment>
                    }
                  size="small"
                    value={materialData["material_id"]}
                    onChange={(e) => {
                      handleChangeMaterial(e);
                    }}
                    fullWidth
                  />

<TextField
                    sx={{ mt: 1, mb: 1 }}
                    name="material_organism"
                    label={
                      <React.Fragment>
                        Organism
                        <Tooltip
                          title={`An identifier for the organism at the species level. Use of the NCBI taxon ID is recommended. ${MIAPPE_V}`}
                        >
                          <IconButton
                            size="small"
                            edge="end"
                            aria-label="info"
                          >
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </React.Fragment>
                    }
                  size="small"
                    value={materialData["material_organism"]}
                    onChange={(e) => {
                      handleChangeMaterial(e);
                    }}
                    fullWidth
                  />


<TextField
                    sx={{ mt: 1, mb: 1 }}
                    name="material_infraspecific_name"
                    label={
                      <React.Fragment>
                        Infraspecific name
                        <Tooltip
                          title={`Name of any subtaxa level, including variety, crossing name, etc. It can be used to store any additional taxonomic identifier. Either free text description or key-value pair list format (the key is the name of the rank and the value is the value of the rank). Ranks can be among the following terms: subspecies, cultivar, variety, subvariety, convariety, group, subgroup, hybrid, line, form, subform. For MCPD compliance, the following abbreviations are allowed: Ôsubsp.Õ (subspecies); Ôconvar.Õ (convariety); Ôvar.Õ (variety); Ôf.Õ (form); ÔGroupÕ (cultivar group). ${MIAPPE_V}`}
                        >
                          <IconButton
                            size="small"
                            edge="end"
                            aria-label="info"
                          >
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </React.Fragment>
                    }
                  size="small"
                    value={materialData["material_infraspecific_name"]}
                    onChange={(e) => {
                      handleChangeMaterial(e);
                    }}
                    fullWidth
                  />

<TextField
                    sx={{ mt: 1, mb: 1 }}
                    name="material_latitude"
                    label={
                      <React.Fragment>
                        Latitude
                        <Tooltip
                          title={`Latitude of the studied biological material. [Alternative identifier for in situ material]. ${MIAPPE_V}`}
                        >
                          <IconButton
                            size="small"
                            edge="end"
                            aria-label="info"
                          >
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </React.Fragment>
                    }
                  size="small"
                    value={materialData["material_latitude"]}
                    onChange={(e) => {
                      handleChangeMaterial(e);
                    }}
                    fullWidth
                  />

<TextField
                    sx={{ mt: 1, mb: 1 }}
                    name="material_longitude"
                    label={
                      <React.Fragment>
                        Longitude
                        <Tooltip
                          title={`Longitude of the studied biological material. [Alternative identifier for in situ material]. ${MIAPPE_V}`}
                        >
                          <IconButton
                            size="small"
                            edge="end"
                            aria-label="info"
                          >
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </React.Fragment>
                    }
                  size="small"
                    value={materialData["material_longitude"]}
                    onChange={(e) => {
                      handleChangeMaterial(e);
                    }}
                    fullWidth
                  />


<TextField
                    sx={{ mt: 1, mb: 1 }}
                    name="material_altitude"
                    label={
                      <React.Fragment>
                        Altitude
                        <Tooltip
                          title={`Altitude of the studied biological material, provided in meters (m). [Alternative identifier for in situ material]. ${MIAPPE_V}`}
                        >
                          <IconButton
                            size="small"
                            edge="end"
                            aria-label="info"
                          >
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </React.Fragment>
                    }
                  size="small"
                    value={materialData["material_altitude"]}
                    onChange={(e) => {
                      handleChangeMaterial(e);
                    }}
                    fullWidth
                  />

<TextField
                    sx={{ mt: 1, mb: 1 }}
                    name="material_coordinates"
                    label={
                      <React.Fragment>
                        Coordinates
                        <Tooltip
                          title={`Circular uncertainty of the coordinates, preferably provided in meters (m). [Alternative identifier for in situ material]. ${MIAPPE_V}`}
                        >
                          <IconButton
                            size="small"
                            edge="end"
                            aria-label="info"
                          >
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </React.Fragment>
                    }
                  size="small"
                    value={materialData["material_coordinates"]}
                    onChange={(e) => {
                      handleChangeMaterial(e);
                    }}
                    fullWidth
                  />

<TextField
                    sx={{ mt: 1, mb: 1 }}
                    name="material_preprocessing"
                    label={
                      <React.Fragment>
                        Preprocessing
                        <Tooltip
                          title={`Description of any process or treatment applied uniformly to the biological material, prior to the study itself. Can be provided as free text or as an accession number from a suitable controlled vocabulary. ${MIAPPE_V}`}
                        >
                          <IconButton
                            size="small"
                            edge="end"
                            aria-label="info"
                          >
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </React.Fragment>
                    }
                  size="small"
                    value={materialData["material_preprocessing"]}
                    onChange={(e) => {
                      handleChangeMaterial(e);
                    }}
                    fullWidth
                  />


<TextField
                    sx={{ mt: 1, mb: 1 }}
                    name="material_source_ID"
                    label={
                      <React.Fragment>
                        Source ID
                        <Tooltip
                          title={`An identifier for the source of the biological material, in the form of a key-value pair comprising the name/identifier of the repository from which the material was sourced plus the accession number of the repository for that material. Where an accession number has not been assigned, but the material has been derived from the crossing of known accessions, the material can be defined as follows: "mother_accession X father_accession", or, if father is unknown, as "mother_accession X UNKNOWN". For in situ material, the region of provenance may be used when an accession is not available. ${MIAPPE_V}`}
                        >
                          <IconButton
                            size="small"
                            edge="end"
                            aria-label="info"
                          >
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </React.Fragment>
                    }
                  size="small"
                    value={materialData["material_source_ID"]}
                    onChange={(e) => {
                      handleChangeMaterial(e);
                    }}
                    fullWidth
                  />


<TextField
                    sx={{ mt: 1, mb: 1 }}
                    name="material_source_DOI"
                    label={
                      <React.Fragment>
                        Source DOI
                        <Tooltip
                          title={`Digital Object Identifier (DOI) of the material source. ${MIAPPE_V}`}
                        >
                          <IconButton
                            size="small"
                            edge="end"
                            aria-label="info"
                          >
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </React.Fragment>
                    }
                  size="small"
                    value={materialData["material_source_DOI"]}
                    onChange={(e) => {
                      handleChangeMaterial(e);
                    }}
                    fullWidth
                  />


<TextField
                    sx={{ mt: 1, mb: 1 }}
                    name="material_source_latitude"
                    label={
                      <React.Fragment>
                        Source Latitude
                        <Tooltip
                          title={`Latitude of the material source. [Alternative identifier for in situ material]. ${MIAPPE_V}`}
                        >
                          <IconButton
                            size="small"
                            edge="end"
                            aria-label="info"
                          >
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </React.Fragment>
                    }
                  size="small"
                    value={materialData["material_source_latitude"]}
                    onChange={(e) => {
                      handleChangeMaterial(e);
                    }}
                    fullWidth
                  />


<TextField
                    sx={{ mt: 1, mb: 1 }}
                    name="material_source_longitude"
                    label={
                      <React.Fragment>
                        Source Longitude
                        <Tooltip
                          title={`Longitude of the material source. [Alternative identifier for in situ material]. ${MIAPPE_V}`}
                        >
                          <IconButton
                            size="small"
                            edge="end"
                            aria-label="info"
                          >
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </React.Fragment>
                    }
                  size="small"
                    value={materialData["material_source_longitude"]}
                    onChange={(e) => {
                      handleChangeMaterial(e);
                    }}
                    fullWidth
                  />

<TextField
                    sx={{ mt: 1, mb: 1 }}
                    name="material_source_altitude"
                    label={
                      <React.Fragment>
                        Source Altitude
                        <Tooltip
                          title={`Altitude of the material source, provided in metres (m). [Alternative identifier for in situ material]. ${MIAPPE_V}`}
                        >
                          <IconButton
                            size="small"
                            edge="end"
                            aria-label="info"
                          >
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </React.Fragment>
                    }
                  size="small"
                    value={materialData["material_source_altitude"]}
                    onChange={(e) => {
                      handleChangeMaterial(e);
                    }}
                    fullWidth
                  />


<TextField
                    sx={{ mt: 1, mb: 1 }}
                    name="material_source_coordinates"
                    label={
                      <React.Fragment>
                        Source Coordinates
                        <Tooltip
                          title={`Circular uncertainty of the coordinates, provided in meters (m). [Alternative identifier for in situ material]. ${MIAPPE_V}`}
                        >
                          <IconButton
                            size="small"
                            edge="end"
                            aria-label="info"
                          >
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </React.Fragment>
                    }
                  size="small"
                    value={materialData["material_source_coordinates"]}
                    onChange={(e) => {
                      handleChangeMaterial(e);
                    }}
                    fullWidth
                  />

<TextField
                    sx={{ mt: 1, mb: 1 }}
                    name="material_source_description"
                    label={
                      <React.Fragment>
                        Source Description
                        <Tooltip
                          title={`Description of the material source. ${MIAPPE_V}`}
                        >
                          <IconButton
                            size="small"
                            edge="end"
                            aria-label="info"
                          >
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </React.Fragment>
                    }
                  size="small"
                    value={materialData["material_source_description"]}
                    onChange={(e) => {
                      handleChangeMaterial(e);
                    }}
                    fullWidth
                  />


</Grid>

<Grid item>
                            {materialCounter != 0 ? (
                              <Button onClick={handleAddMaterial}>
                                + add material ({materialCounter})
                              </Button>
                            ) : (
                              <Button onClick={handleAddMaterial}>
                                Add material
                              </Button>
                            )}
                          </Grid>


                      </AccordionDetails>
</Accordion>

<Accordion sx={{ mt: 1 }} defaultClosed>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel6-header"
                      >
                        <b>Specify experimental Factors</b>
                      </AccordionSummary>
                      <AccordionDetails>
<Grid>
<TextField
                      sx={{ mt: 1, mb: 1 }}
                      name="factor_name"
                      label={
                        <React.Fragment>
                          Factor Name
                          <Tooltip
                            title={`Study Factor Name. ${MIAPPE_V}`}
                          >
                            <IconButton
                              size="small"
                              edge="end"
                              aria-label="info"
                            >
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        </React.Fragment>
                      }
                      size="small"
                      value={factorData["factor_name"]}
                      onChange={(e) => {
                        handleChangeFactor(e);
                      }}
                      fullWidth
                    />
                                          <TextField
                      sx={{ mt: 1, mb: 1 }}
                      name="factor_description"
                      label={
                        <React.Fragment>
                          Factor Description
                          <Tooltip
                            title={`Study Factor Description. ${MIAPPE_V}`}
                          >
                            <IconButton
                              size="small"
                              edge="end"
                              aria-label="info"
                            >
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        </React.Fragment>
                      }
                      size="small"
                      value={factorData["factor_description"]}
                      onChange={(e) => {
                        handleChangeFactor(e);
                      }}
                      fullWidth
                    />                      <TextField
                    sx={{ mt: 1, mb: 1 }}
                    name="factor_value"
                    label={
                      <React.Fragment>
                        Factor Value
                        <Tooltip
                          title={`Study Factor Values. ${MIAPPE_V}`}
                        >
                          <IconButton
                            size="small"
                            edge="end"
                            aria-label="info"
                          >
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </React.Fragment>
                    }
                  size="small"
                    value={factorData["factor_value"]}
                    onChange={(e) => {
                      handleChangeFactor(e);
                    }}
                    fullWidth
                  />

</Grid>

<Grid item>
                            {factorCounter != 0 ? (
                              <Button onClick={handleAddFactor}>
                                + add factor ({factorCounter})
                              </Button>
                            ) : (
                              <Button onClick={handleAddFactor}>
                                Add factor
                              </Button>
                            )}
                          </Grid>


                      </AccordionDetails>
</Accordion>


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
              </TabPanel>

              <TabPanel value={value} index={2}>
                {/* assay tab */}
                {!studyCounter != 0 ? (
                  <h2>Please add at least one study</h2>
                ) : (
                  <Accordion defaultExpanded>
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
                      the steps of one particular experimental workflow
                      described by a particular protocol. Assay-related metadata
                      includes descriptions of the measurement type and
                      technology used, and a link to what study protocol is
                      applied. Where an assay produces data files, links to the
                      data are recorded here.
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
                        name="assay_id"
                        label="Assay id"
                        size="small"
                        value={assayData["assay_id"]}
                        onChange={(e) => {
                          handleChangeAssay(e);
                        }}
                        fullWidth
                        sx={{ mb: 1 }}
                      />


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

<Accordion sx={{ mt: 1 }} defaultClosed>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel7-header"
                      >
                        <b>Add one or more samples to :  {assayData["@id"]}</b>
                      </AccordionSummary>
                      <AccordionDetails>
<Grid>
<TextField
                      sx={{ mt: 1, mb: 1 }}
                      name="sample_id"
                      label={
                        <React.Fragment>
                          Sample Id
                          <Tooltip
                            title={`Unique identifier for the sample. ${MIAPPE_V}`}
                          >
                            <IconButton
                              size="small"
                              edge="end"
                              aria-label="info"
                            >
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        </React.Fragment>
                      }
                      size="small"
                      value={sampleData["sample_id"]}
                      onChange={(e) => {
                        handleChangeSample(e);
                      }}
                      fullWidth
                    />


<TextField
                      sx={{ mt: 1, mb: 1 }}
                      name="Plant_structure_development_stage"
                      label={
                        <React.Fragment>
                          Plant structure development stage
                          <Tooltip
                            title={`The stage in the life of a plant structure during which the sample was taken, in the form of an accession number to a suitable controlled vocabulary (Plant Ontology, BBCH scale). ${MIAPPE_V}`}
                          >
                            <IconButton
                              size="small"
                              edge="end"
                              aria-label="info"
                            >
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        </React.Fragment>
                      }
                      size="small"
                      value={sampleData["Plant_structure_development_stage"]}
                      onChange={(e) => {
                        handleChangeSample(e);
                      }}
                      fullWidth
                    />

<TextField
                      sx={{ mt: 1, mb: 1 }}
                      name="Plant_anatomical_entity"
                      label={
                        <React.Fragment>
                          Plant structure development stage
                          <Tooltip
                            title={`A description of the plant part (e.g. leaf) or the plant product (e.g. resin) from which the sample was taken, in the form of an accession number to a suitable controlled vocabulary (Plant Ontology). ${MIAPPE_V}`}
                          >
                            <IconButton
                              size="small"
                              edge="end"
                              aria-label="info"
                            >
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        </React.Fragment>
                      }
                      size="small"
                      value={sampleData["Plant_anatomical_entity"]}
                      onChange={(e) => {
                        handleChangeSample(e);
                      }}
                      fullWidth
                    />


<TextField
                      sx={{ mt: 1, mb: 1 }}
                      name="Sample_description"
                      label={
                        <React.Fragment>
                          Sample description
                          <Tooltip
                            title={`Any information not captured by the other sample fields, including quantification, sample treatments and processing. ${MIAPPE_V}`}
                          >
                            <IconButton
                              size="small"
                              edge="end"
                              aria-label="info"
                            >
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        </React.Fragment>
                      }
                      size="small"
                      value={sampleData["Sample_description"]}
                      onChange={(e) => {
                        handleChangeSample(e);
                      }}
                      fullWidth
                    />

<TextField
                      sx={{ mt: 1, mb: 1 }}
                      name="Collection_date"
                      label={
                        <React.Fragment>
                          Collection date
                          <Tooltip
                            title={`The date and time when the sample was collected / harvested. ${MIAPPE_V}`}
                          >
                            <IconButton
                              size="small"
                              edge="end"
                              aria-label="info"
                            >
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        </React.Fragment>
                      }
                      size="small"
                      value={sampleData["Collection_date"]}
                      onChange={(e) => {
                        handleChangeSample(e);
                      }}
                      fullWidth
                    />

<TextField
                      sx={{ mt: 1, mb: 1 }}
                      name="External_ID"
                      label={
                        <React.Fragment>
                          External ID 
                          <Tooltip
                            title={`An identifier for the sample in a persistent repository, comprising the name of the repository and the accession number of the observation unit therein. Submission to the EBI Biosamples repository is recommended. URI are recommended when possible. ${MIAPPE_V}`}
                          >
                            <IconButton
                              size="small"
                              edge="end"
                              aria-label="info"
                            >
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        </React.Fragment>
                      }
                      size="small"
                      value={sampleData["External_ID"]}
                      onChange={(e) => {
                        handleChangeSample(e);
                      }}
                      fullWidth
                    />

<TextField
                      sx={{ mt: 1, mb: 1 }}
                      name="Observation_unit_ID"
                      label={
                        <React.Fragment>
                          Observation unit ID
                          <Tooltip
                            title={`Identifier used to identify the observation unit in data files containing the values observed or measured on that unit. Must be locally unique. ${MIAPPE_V}`}
                          >
                            <IconButton
                              size="small"
                              edge="end"
                              aria-label="info"
                            >
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        </React.Fragment>
                      }
                      size="small"
                      value={sampleData["Observation_unit_ID"]}
                      onChange={(e) => {
                        handleChangeSample(e);
                      }}
                      fullWidth
                    />

<TextField
                      sx={{ mt: 1, mb: 1 }}
                      name="Observation_unit_type"
                      label={
                        <React.Fragment>
                          Observation unit type
                          <Tooltip
                            title={`Type of observation unit in textual form, usually one of the following: study, block, sub-block, plot, sub-plot, pot, plant. Use of other observation unit types is possible but not recommended. The observation unit type cannot be used to indicate sub-plant levels. However, observations can still be made on the sub-plant level, as long as the details are indicated in the associated observed variable (see observed variables). Alternatively, it is possible to use samples for more detailed tracing of sub-plant units, attaching the observations to them instead. ${MIAPPE_V}`}
                          >
                            <IconButton
                              size="small"
                              edge="end"
                              aria-label="info"
                            >
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        </React.Fragment>
                      }
                      size="small"
                      value={sampleData["Observation_unit_type"]}
                      onChange={(e) => {
                        handleChangeSample(e);
                      }}
                      fullWidth
                    />

<TextField
                      sx={{ mt: 1, mb: 1 }}
                      name="Spatial_distribution"
                      label={
                        <React.Fragment>
                          Spatial distribution 
                          <Tooltip
                            title={`Type and value of a spatial coordinate (georeference or relative) or level of observation (plot 45, subblock 7, block 2) provided as a key-value pair of the form type:value. Levels of observation must be consistent with those listed in the Study section. ${MIAPPE_V}`}
                          >
                            <IconButton
                              size="small"
                              edge="end"
                              aria-label="info"
                            >
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        </React.Fragment>
                      }
                      size="small"
                      value={sampleData["Spatial_distribution"]}
                      onChange={(e) => {
                        handleChangeSample(e);
                      }}
                      fullWidth
                    />

<TextField
                      sx={{ mt: 1, mb: 1 }}
                      name="Observation_Unit_factor_value"
                      label={
                        <React.Fragment>
                          Observation unit factor value
                          <Tooltip
                            title={`List of values for each factor applied to the observation unit. ${MIAPPE_V}`}
                          >
                            <IconButton
                              size="small"
                              edge="end"
                              aria-label="info"
                            >
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        </React.Fragment>
                      }
                      size="small"
                      value={sampleData["Observation_Unit_factor_value"]}
                      onChange={(e) => {
                        handleChangeSample(e);
                      }}
                      fullWidth
                    />


<Accordion sx={{ mt: 1 }} defaultClosed>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel7-header"
                      >
                        <b>Link one or more files to this sample</b>
                      </AccordionSummary>
                      <AccordionDetails>

                      <Grid>

<TextField
                      sx={{ mt: 1, mb: 1 }}
                      name="data_file"
                      label={
                        <React.Fragment>
                          Data file name
                          <Tooltip
                            title={`A file or digital object holding observation data recorded during one or more assays of the study, typically in tabular form. Multiple data files may be provided per study, and each file can include observations for several observation units and several observed variables. ${MIAPPE_V}`}
                          >
                            <IconButton
                              size="small"
                              edge="end"
                              aria-label="info"
                            >
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        </React.Fragment>
                      }
                      size="small"
                      value={fileData["data_file"]}
                      onChange={(e) => {
                        handleChangeFile(e);
                      }}
                      fullWidth
                    />



<TextField
                      sx={{ mt: 1, mb: 1 }}
                      name="data_file_link"
                      label={
                        <React.Fragment>
                          Data file link
                          <Tooltip
                            title={`Link to the data file (or digital object) in a public database or in a persistent institutional repository; or identifier of the data file when submitted together with the MIAPPE submission. ${MIAPPE_V}`}
                          >
                            <IconButton
                              size="small"
                              edge="end"
                              aria-label="info"
                            >
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        </React.Fragment>
                      }
                      size="small"
                      value={fileData["data_file_link"]}
                      onChange={(e) => {
                        handleChangeFile(e);
                      }}
                      fullWidth
                    />


<TextField
                      sx={{ mt: 1, mb: 1 }}
                      name="data_file_version"
                      label={
                        <React.Fragment>
                          Data file version
                          <Tooltip
                            title={`The version of the dataset (the actual data).. ${MIAPPE_V}`}
                          >
                            <IconButton
                              size="small"
                              edge="end"
                              aria-label="info"
                            >
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        </React.Fragment>
                      }
                      size="small"
                      value={fileData["data_file_version"]}
                      onChange={(e) => {
                        handleChangeFile(e);
                      }}
                      fullWidth
                    />
</Grid>

<Grid item>
                            {fileCounter != 0 ? (
                              <Button onClick={handleAddFile}>
                                + add file ({fileCounter})
                              </Button>
                            ) : (
                              <Button onClick={handleAddFile}>
                                Add file
                              </Button>
                            )}
                          </Grid>


                        </AccordionDetails>

</Accordion>




</Grid>

<Grid item>
                            {sampleCounter != 0 ? (
                              <Button onClick={handleAddSample}>
                                + add sample ({sampleCounter})
                              </Button>
                            ) : (
                              <Button onClick={handleAddSample}>
                                Add sample
                              </Button>
                            )}
                          </Grid>


                      </AccordionDetails>
</Accordion>

<TextField  sx={{ mt: 1 }}
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
              </TabPanel>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper
            sx={{ padding: 1 }}
            style={{ border: "2px solid green", minHeight: "100px" }}
          >
            {/* <ReactJson src={investigation} theme="solarized"/>  */}
            <ReactJson src={investigationData} />
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
