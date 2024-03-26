
export class Investigation {
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
      this.comments = data.comments || '';
    }
  
    // Getters and setters for each property if needed
  }

export class Study {
    constructor(data) {
      this["@id"] = data["@id"] || "" ;
      this.filename = data.filename || "";
      this.identifier = data.identifier || "";
      this.title = data.title || "";
      this.description = data.description || "";
      this.startDate = data.submissionDate || null;
      this.endDate = data.publicReleaseDate || null;
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
      this.comments = data.comments || '';
    }
  
    // Getters and setters for each property if needed
  }
  
export class Assay {
    constructor(data) {
      this.assays_id = data.assays_id || "";
      this.filename = data.filename || "";
      this.measurementType = data.filename || "";
      this.technologyType = data.technologyType || [];
      this.technologyPlatform = data.technologyPlatform || "";
      this.samples = data.samples || []
      this.comments = data.comments || [];

    }
  
    // Getters and setters for each property if needed
  }
  
  
export class Publication {
    constructor(data) {
      this.citation = data.citation || '';
      this.doi = data.doi || "";
    }
  
    // Getters and setters for each property if needed
  }
  
export class Person{
    constructor(data) {
      this.person_id = data.person_id || '';
      this.first_name = data.first_name || "";
      this.last_name = data.last_name || "";
      this.email = data.email || "";
      this.affiliation = data.affiliation || "";
      this.role = data.role || "";
    }
  }

  export class Factor {
    constructor(data) {
      this.factor_name = data.factor_name || "";
      this.factor_description = data.factor_description || "";
      this.factor_value = data.factor_value || "";
    }
  
    // Getters and setters for each property if needed
  }

  export class Material {
    constructor(data) {
      this.material_id = data.material_id || "";
      this.material_organism = data.material_organism || "";
      this.material_genus = data.material_genus || "";
      this.material_species = data.material_species || "";
      this.material_infraspecific_name = data.material_infraspecific_name || "";
      this.material_latitude = data.material_latitude || "";
      this.material_longitude = data.material_longitude || "";
      this.material_altitude = data.material_altitude || "";
      this.material_coordinates = data.material_coordinates || "";
      this.material_preprocessing = data.material_preprocessing || "";
      this.material_source_ID = data.material_source_ID || "";
      this.material_source_DOI = data.material_source_DOI || "";
      this.material_source_latitude = data.material_source_latitude || "";
      this.material_source_longitude = data.material_source_longitude || "";
      this.material_source_altitude = data.material_source_altitude || "";
      this.material_source_coordinates = data.material_source_coordinates || "";
      this.material_source_description = data.material_source_description || "";
  }
  
    // Getters and setters for each property if needed
  }

  export class File{
    constructor(data){
      this.data_file = data.data_file || "";
      this.data_file_link = data.data_file_link || "";
      this.data_file_version = data.data_file_version || "";
    }
  }
  export class Sample {
    constructor(data) {
      this.sample_id = data.sample_id || "";
      this.Plant_structure_development_stage = data.Plant_structure_development_stage || "";
      this.Plant_anatomical_entity = data.Plant_anatomical_entity || "";
      this.Sample_description = data.Sample_description || "";
      this.Collection_date = data.Collection_date || "";
      this.External_ID = data.material_latitude || "";
      this.Observation_unit_ID = data.material_longitude || "";
      this.Observation_unit_type = data.material_altitude || "";
      this.Spatial_distribution = data.material_coordinates || "";
      this.Observation_Unit_factor_value = data.material_preprocessing || "";
      this.dataset = data.dataset || [];
  }
  
    // Getters and setters for each property if needed
  }


  export default { Investigation, Study, Assay, Publication, Person, Factor, Material };