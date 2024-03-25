export async function getOrcidId(first_name, last_name) {
const apiUrl = `https://pub.orcid.org/v3.0/search/?q=personal-details:(given-names:"${first_name}" AND family-name:"${last_name}")`;
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
    console.log("ORCID iD not found for", first_name, last_name);
    return 'ORCID iD not found';
    }
} catch (error) {
    console.error("Error fetching ORCID data:", error);
    return 'Error fetching ORCID data';
}
}

export async function getCitation(doi) {
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

export function downloadJson(jsonObject, filename) {
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


export async function getDOI(citation) {
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

  

export function isDOI(str) {
    // Regular expression pattern to match a DOI
    const doiPattern = /^10\.\d{4,}\/\S+$/;
  
    // Test if the string matches the pattern
    return doiPattern.test(str);
  }
  

export function generateTSV(data){
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
  
export function downloadTSVFile(tsvContent, filename){
    const blob = new Blob([tsvContent], { type: "text/tsv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
  };

export default {getOrcidId, getCitation, isDOI, downloadJson , generateTSV, downloadTSVFile}