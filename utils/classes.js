
export class Investigation {
    constructor(data) {
      this["@id"] = data["@id"] || 1;
      this.filename = data.filename || "investigation.json";
      this.identifier = data.identifier || "";
      this.title = data.title || "";
      this.description = data.description || "T";
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

export class Study {
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
  
export class Assay {
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

  export default { Investigation, Study, Assay, Publication, Person };