(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[137],{9654:function(e,s,t){Promise.resolve().then(t.bind(t,4327))},4327:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return W}});var i=t(7437),a=t(2265),l=t(8874),n=t(6055),o=t(7812),r=t(1988),c=t(3226),d=t(9050),m=t(1597),u=t(5665),h=t.n(u),p=t(5201),x=t(3955),b=t(5873),f=t(8768),g=t(1344),j=t(4124),y=t(2750),C=t(360);class Z{constructor(e){this["@id"]=e["@id"]||1,this.filename=e.filename||"investigation.json",this.identifier=e.identifier||"",this.title=e.title||"",this.description=e.description||"",this.submissionDate=e.submissionDate||"",this.publicReleaseDate=e.publicReleaseDate||"",this.ontologySourceReferences=e.ontologySourceReferences||[],this.publications=e.publications||[],this.people=e.people||[],this.studies=e.studies||[],this.comments=e.comments||[]}}class v{constructor(e){this["@id"]=e["@id"]||"",this.filename=e.filename||"",this.identifier=e.identifier||"",this.title=e.title||"",this.description=e.description||"",this.submissionDate=e.submissionDate||null,this.publicReleaseDate=e.publicReleaseDate||null,this.publications=e.publications||[],this.people=e.people||[],this.studyDesignDescriptors=e.studyDesignDescriptors||[],this.protocols=e.protocols||[],this.materials=e.materials||[],this.processSequence=e.processSequence||[],this.assays=e.assays||[],this.factors=e.factors||[],this.characteristicCategories=e.characteristicCategories||[],this.unitCategories=e.unitCategories||[],this.comments=e.comments||[]}}class D{constructor(e){this["@id"]=e["@id"]||"",this.comments=e.comments||[],this.filename=e.filename||"",this.measurementType=e.measurementType||[],this.technologyType=e.technologyType||[],this.technologyPlatform=e.technologyPlatform||"",this.dataFiles=e.dataFiles||[],this.materials=e.materials||[],this.characteristicCategories=e.characteristicCategories||[],this.unitCategories=e.unitCategories||[],this.processSequence=e.processSequence||[]}}function W(){var e=new Z({}),s=new v({}),t=new D({});let[u,W]=(0,a.useState)(e),[z,S]=(0,a.useState)(0),[A,w]=(0,a.useState)(s),[P,R]=(0,a.useState)([]),[k,M]=(0,a.useState)(null),[Y,T]=(0,a.useState)(0),I=e=>{let s="";for(let[t,i]of Object.entries(e))Array.isArray(i)?s+="".concat(t,"	").concat(i.join(","),"\n"):s+="".concat(t,"	").concat(i,"\n");return s},_=(e,s)=>{let t=new Blob([e],{type:"text/tsv"}),i=URL.createObjectURL(t),a=document.createElement("a");a.href=i,a.download=s,a.click()},[E,F]=(0,a.useState)(t),N=e=>{let{name:s,value:t}=e.target;switch(s){case"people":let i=t.trim(),a=i.split(",").map(e=>e.trim());W({...u,[s]:a});break;case"comments":let l=t.trim(),n=l.split(",").map(e=>e.trim());W({...u,[s]:n});break;default:W({...u,[s]:t})}},O=e=>{let{name:s,value:t}=e.target;if("identifier"==s||"title"==s||"description"==s)w({...A,[s]:t});else{let e=t.trim(),i=e.split(",").map(e=>e.trim());w({...A,[s]:i})}},U=()=>{let e=[...P,A.identifier],s={...u,studies:[...u.studies,A]};R(e),W(s),S(z+1),w(new v({}))},q=()=>{let e={...u,studies:u.studies.map(e=>e.identifier===k?{...e,assays:[...e.assays,t]}:e)};W(e),T(Y+1),F(new D({}))},L=e=>{};return(0,i.jsx)("div",{children:(0,i.jsxs)(l.ZP,{container:!0,spacing:.3,children:[(0,i.jsx)(l.ZP,{item:!0,xs:6,children:(0,i.jsx)(n.Z,{style:{border:"1px solid white",minHeight:"100px"},children:(0,i.jsxs)(l.ZP,{sx:{padding:1},children:[(0,i.jsxs)(p.Z,{defaultExpanded:!0,children:[(0,i.jsx)(b.Z,{expandIcon:(0,i.jsx)(g.Z,{}),"aria-controls":"panel3-content",id:"panel3-header",children:(0,i.jsx)("b",{children:"1. Create an Investigation"})}),(0,i.jsx)(f.Z,{children:"An investigation represents the overall picture of the project."}),(0,i.jsxs)(o.Z,{sx:{padding:1},children:[(0,i.jsx)(r.Z,{name:"@id",label:"Investigation ID",size:"small",value:u["@id"],onChange:e=>{N(e)},fullWidth:!0,sx:{mb:1}}),(0,i.jsx)(r.Z,{name:"filename",label:"File Name",size:"small",value:u.filename,onChange:e=>{N(e)},fullWidth:!0,sx:{mb:1}}),(0,i.jsx)(r.Z,{name:"identifier",label:"Identifier",size:"small",value:u.identifier,onChange:e=>{N(e)},fullWidth:!0,sx:{mb:1}}),(0,i.jsx)(r.Z,{name:"title",label:"Title",size:"small",value:u.title,onChange:N,fullWidth:!0,sx:{mb:1}}),(0,i.jsx)(r.Z,{name:"people",label:"People involved",size:"small",value:u.people,onChange:e=>{N(e)},fullWidth:!0,sx:{mb:1}}),(0,i.jsx)(r.Z,{name:"description",label:"Description",size:"small",value:u.description,onChange:e=>{N(e)},fullWidth:!0,sx:{mb:1}}),(0,i.jsxs)(l.ZP,{container:!0,direction:"row",justifyContent:"space-between",alignItems:"center",children:[(0,i.jsx)(j._,{dateAdapter:y.y,children:(0,i.jsx)(C.M,{sx:{maxWidth:250},label:"Submission Date",value:u.submissionDate?u.submissionDate:null,onChange:e=>{let s=e.format("YYYY-MM-DD");W({...u,submissionDate:s})}})}),(0,i.jsx)(j._,{dateAdapter:y.y,children:(0,i.jsx)(C.M,{sx:{maxWidth:250},label:"Public Release Date",value:u.publicReleaseDate?u.publicReleaseDate:null,onChange:e=>{let s=e.format("YYYY-MM-DD");W({...u,publicReleaseDate:s})}})})]}),(0,i.jsx)(r.Z,{sx:{mt:1,mb:1},name:"comments",label:"Comments",size:"small",value:u.comments,onChange:e=>{N(e)},fullWidth:!0})]})]}),(0,i.jsxs)(p.Z,{children:[(0,i.jsx)(b.Z,{expandIcon:(0,i.jsx)(g.Z,{}),"aria-controls":"panel3-content",id:"panel3-header",children:(0,i.jsx)("b",{children:"2. Add a Study to the investigation"})}),(0,i.jsx)(f.Z,{children:"A Study contains contextualising information for one or more Assay. Metadata about the study design, study factors used, and study protocols are recorded in Study objects, as well as information similarly to the Investigation including title and description of the study, and related people and scholarly publications."}),(0,i.jsxs)(o.Z,{sx:{padding:1},children:[(0,i.jsxs)(c.Z,{sx:{mb:2},variant:"h7",color:"green",children:["Number of studies added. ",z]}),(0,i.jsx)(r.Z,{name:"identifier",label:"Identifier",size:"small",value:A.identifier,onChange:e=>{O(e)},fullWidth:!0,sx:{mb:1}}),(0,i.jsx)(r.Z,{name:"title",label:"title",size:"small",value:A.title,onChange:e=>{O(e)},fullWidth:!0,sx:{mb:1}}),(0,i.jsx)(r.Z,{name:"description",label:"description",size:"small",value:A.description,onChange:e=>{O(e)},fullWidth:!0,sx:{mb:1}}),(0,i.jsxs)(l.ZP,{container:!0,direction:"row",justifyContent:"space-between",alignItems:"center",children:[(0,i.jsx)(j._,{dateAdapter:y.y,children:(0,i.jsx)(C.M,{sx:{maxWidth:250},label:"Submission Date",value:A.submissionDate?A.submissionDate:null,onChange:e=>{let s=e.format("YYYY-MM-DD");w({...A,submissionDate:s})}})}),(0,i.jsx)(j._,{dateAdapter:y.y,children:(0,i.jsx)(C.M,{sx:{maxWidth:250},label:"Public Release Date",value:A.publicReleaseDate?A.publicReleaseDate:null,onChange:e=>{let s=e.format("YYYY-MM-DD");w({...A,publicReleaseDate:s})}})})]}),(0,i.jsx)(r.Z,{sx:{mt:1,mb:1},name:"publications",label:"Publications",size:"small",value:A.publications,onChange:e=>{O(e)},fullWidth:!0}),(0,i.jsx)(r.Z,{sx:{mt:1,mb:1},name:"people",label:"People",size:"small",value:A.people,onChange:e=>{O(e)},fullWidth:!0}),(0,i.jsx)(r.Z,{sx:{mt:1,mb:1},name:"studyDesignDescriptors",label:"Study Design Descriptors",size:"small",value:A.studyDesignDescriptors,onChange:e=>{O(e)},fullWidth:!0}),(0,i.jsx)(r.Z,{sx:{mt:1,mb:1},name:"protocols",label:"Protocols",size:"small",value:A.protocols,onChange:e=>{O(e)},fullWidth:!0}),(0,i.jsx)(r.Z,{sx:{mt:1,mb:1},name:"materials",label:"Materials",size:"small",value:A.materials,onChange:e=>{O(e)},fullWidth:!0}),(0,i.jsx)(r.Z,{sx:{mt:1,mb:1},name:"processSequence",label:"Process Sequence",size:"small",value:A.processSequence,onChange:e=>{O(e)},fullWidth:!0}),(0,i.jsx)(r.Z,{sx:{mt:1,mb:1},name:"assays",label:"Assays",size:"small",value:A.assays,onChange:e=>{O(e)},fullWidth:!0}),(0,i.jsx)(r.Z,{sx:{mt:1,mb:1},name:"factors",label:"Factors",size:"small",value:A.factors,onChange:e=>{O(e)},fullWidth:!0}),(0,i.jsx)(r.Z,{sx:{mt:1,mb:1},name:"characteristicCategories",label:"Characteristic Categories",size:"small",value:A.characteristicCategories,onChange:e=>{O(e)},fullWidth:!0}),(0,i.jsx)(r.Z,{sx:{mt:1,mb:1},name:"unitCategories",label:"Unit Categories",size:"small",value:A.unitCategories,onChange:e=>{O(e)},fullWidth:!0}),(0,i.jsx)(r.Z,{sx:{mt:1,mb:1},name:"comments",label:"Comments",size:"small",value:A.comments,onChange:e=>{O(e)},fullWidth:!0})]}),(0,i.jsx)(x.Z,{children:0!=z?(0,i.jsxs)(d.Z,{onClick:U,children:["+ add study (",z,")"]}):(0,i.jsx)(d.Z,{onClick:U,children:"Add Study"})})]}),0!=!z?null:(0,i.jsxs)(p.Z,{children:[(0,i.jsx)(b.Z,{expandIcon:(0,i.jsx)(g.Z,{}),"aria-controls":"panel3-content",id:"panel3-header",children:(0,i.jsx)("b",{children:"3. Add an Assay to the Study"})}),(0,i.jsx)(f.Z,{children:"An Assay groups descriptions of provenance of sample processing for related tests. Each test typically follows the steps of one particular experimental workflow described by a particular protocol. Assay-related metadata includes descriptions of the measurement type and technology used, and a link to what study protocol is applied. Where an assay produces data files, links to the data are recorded here."}),(0,i.jsxs)(o.Z,{sx:{padding:1},children:[(0,i.jsx)(m.Z,{size:"small",sx:{mb:1},id:"autocomplete-demo",options:P,value:k,onChange:(e,s)=>{M(s)},renderInput:e=>(0,i.jsx)(r.Z,{...e,label:"Autocomplete"}),noOptionsText:"Please add a study"}),(0,i.jsxs)(c.Z,{sx:{mb:4},variant:"h7",color:"green",children:["Number of Assays added: ",Y," in the study:"," ",k||"No study selected"]}),(0,i.jsx)(r.Z,{name:"measurementType",label:"Measurement Type",size:"small",value:E.measurementType,onChange:e=>{L(e)},fullWidth:!0,sx:{mb:1}}),(0,i.jsx)(r.Z,{name:"technologyType",label:"Technology Type",size:"small",value:E.technologyType,onChange:e=>{L(e)},fullWidth:!0,sx:{mb:1}}),(0,i.jsx)(r.Z,{name:"technologyPlatform",label:"Technology Platform",size:"small",value:E.technologyPlatform,onChange:e=>{L(e)},fullWidth:!0,sx:{mb:1}}),(0,i.jsx)(r.Z,{name:"filename",label:"File name",size:"small",value:E.filename,onChange:e=>{L(e)},fullWidth:!0,sx:{mb:1,mt:1}}),(0,i.jsx)(r.Z,{name:"dataFiles",label:"Data Files",size:"small",value:E.dataFiles,onChange:e=>{L(e)},fullWidth:!0,sx:{mb:1,mt:1}}),(0,i.jsx)(r.Z,{sx:{mt:1,mb:1},name:"materials",label:"Materials",size:"small",value:E.materials,onChange:e=>{L(e)},fullWidth:!0}),(0,i.jsx)(r.Z,{sx:{mt:1,mb:1},name:"characteristicCategories",label:"Characteristic Categories",size:"small",value:E.characteristicCategories,onChange:e=>{L(e)},fullWidth:!0}),(0,i.jsx)(r.Z,{sx:{mt:1,mb:1},name:"unitCategories",label:"Unit Categories",size:"small",value:E.unitCategories,onChange:e=>{L(e)},fullWidth:!0}),(0,i.jsx)(r.Z,{sx:{mt:1,mb:1},name:"comments",label:"Comments",size:"small",value:E.comments,onChange:e=>{L(e)},fullWidth:!0})]}),(0,i.jsx)(x.Z,{children:0!=Y?(0,i.jsxs)(d.Z,{onClick:q,children:["+ add Assay (",z,")"]}):(0,i.jsx)(d.Z,{onClick:q,children:"Add Assay"})})]})]})})}),(0,i.jsx)(l.ZP,{item:!0,xs:6,children:(0,i.jsx)(n.Z,{sx:{padding:1},style:{border:"2px solid green",minHeight:"100px"},children:(0,i.jsx)(h(),{src:u})})}),(0,i.jsxs)(o.Z,{children:[(0,i.jsx)(d.Z,{onClick:()=>{let e=[],s=I(u);e.push({content:s,filename:"investigation.tsv"}),u.studies.forEach(s=>{let t=I(s);e.push({content:t,filename:"Study_".concat(s.identifier,"_").concat(u.identifier,".tsv")}),s.assays&&s.assays.forEach(t=>{let i=I(t);e.push({content:i,filename:"Assay_".concat(t.identifier,"_").concat(s.identifier,".tsv")})})}),e.forEach(e=>{let{content:s,filename:t}=e;_(s,t)})},children:" Downolad ISA-Tab"}),(0,i.jsx)(d.Z,{onClick:()=>{!function(e,s){let t=JSON.stringify(e,null,2),i=new Blob([t],{type:"application/json"}),a=URL.createObjectURL(i),l=document.createElement("a");l.href=a,l.download=s||"data.json",l.click(),URL.revokeObjectURL(a)}(u,e.filename)},children:" Downolad ISA-json"})]})]})})}}},function(e){e.O(0,[518,107,368,971,472,744],function(){return e(e.s=9654)}),_N_E=e.O()}]);