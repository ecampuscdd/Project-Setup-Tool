let templateBlueprintId = "1FONxZaZr2HEIM3sc7GNBcLtsB6U-KtCVJ5S2K3uiEtE";
let templateSettingsTablesId = "19KG-oXHerwL0TdKxxA6Ek9abbfRyPCZoBR_GavZSDus";
let cyberTemplateBlueprintId = "1FONxZaZr2HEIM3sc7GNBcLtsB6U-KtCVJ5S2K3uiEtE";
let cyberTemplateSettingsTablesId =
  "1RboXhFGh5gnCeBqRMT6Gm1CRezeR1RVEeuSF9spprLI";

let sodTemplates = {
  sodTemplateA: {
    id: "1b3aSpXBEEaZ_4ZngU6QeCBsGACYRC5qPt8XEXqO6FMs",
    name: "Template A: Schedule of Deliverables",
  },
  sodTemplateB: {
    id: "1Sq1aF5R5AiYAJHZ5Y5jgHwT-Wjn0vOb2RJhX8d78aGk",
    name: "Template B: Agenda / Schedule of Deliverables",
  },
  sodTemplateC: {
    id: "1U5LOw8xaB1cKjMnZ-iWCATdWnSIOW8laBATV63u7ZkU",
    name: "Template C: Schedule of Deliverables",
  },
  sodTemplateD: {
    id: "1HquHUvdJMokyXErkGwy-7avHRkzFaFEg4DpXUhlqZVw",
    name: "Template D: Schedule of Deliverables",
  },
  sodTemplateE: {
    id: "1jyo4w93j33DeVMuSwv2AaDUMT8q_sGkXhBeAccVGf5k",
    name: "Template E: Meeting Agendas, Minutes, Action Items, & Notes",
  },
};

let templateOnlineCourseSyllabusId =
  "1gYWqI4curZDV0BMfwDRqXok4S8S3b0_5AcJtgEnDYsM";
let dabaSyllabusTemplateId = "1qpKKs4Q0l0KjPeE_4t4NT3mFSyLsPU9jXKzaDlaLZT4";
let busmgtBusbtcEntbusEntrepRhmSyllabusTemplateId =
  "1FxZS8pQBvBpTvF_zl7Ga7jG5NPKeDc4jCGB01-g33Yg";
let cpsCoreSyllabusTemplateId = "1LbMFCDSnMx656itcY5VjkcCHuK-CSpLNm--M0uhblrk";

let templateFacultyCsdId = "12-tvk2XXTHEBbMBJglTXqqG0tJW9w-wo737KRwXY1wA";
let templateMasterCsdId = "18_Y0UQ1PkXUbjscKpSzdr2QmBKhWUQqqOLNKnXROspU";
let templateProgramCsdId = "16tQVMZx1S2wdb9PxT9ySH-aiZP3pHuVJos-4mdCGFlI";

let templateIgCanvasId = "1SJ4IxyzQtbZ5PtzFvYPaYsDdmJdxwAxF_WFyXQl7R68";
let cpsCoreIgTemplateId = "1VS2facu_67PRcTnpY2G3kk-jxaZK9op6wAvhEejdbXQ";

let templateCourseStructureWorksheetId =
  "1qZY4bSH2Rl-yQSPiUHTlzYn9cvZzuxbiuOgBUMbvajY";

let templateQmrWorksheetId = "133_ka4oyIqkSGy9gOyVy3A4ehSyRoErDMKRdotkrxY4";
let templateQmPeerReviewWorksheetId =
  "1mzIpe5GSv7waJlN0ceQ4kVsS3i0m2lnZhqJxSuxx2YQ";

let programs = {
   facultyCourses: {
    name: "*Faculty Online Courses",
    syllabusTemplateId: templateOnlineCourseSyllabusId,
    csdTemplateId: templateFacultyCsdId,
    igTemplateId: templateIgCanvasId,
    qmrTemplateId: templateQmPeerReviewWorksheetId,
    // no additionalTemplate:,
  },
  generic:{ //Update the Prefix to 
    name: "*Program Not Listed",
    syllabusTemplateId: "1gYWqI4curZDV0BMfwDRqXok4S8S3b0_5AcJtgEnDYsM", // Empty doc, Populate doc with program syllabus template, find that info on the KB article
    //This syllabus Template was changed to the generic one 5/5/25 not sure if it is the correct one? TM
    csdTemplateId: null,
    igTemplateId: templateIgCanvasId,
    // no additionalTemplate:,
    //no additionalTemplateName:
  },
  acct: {
    name: "ACCT",
    syllabusTemplateId: templateOnlineCourseSyllabusId,
    csdTemplateId: templateMasterCsdId,
    igTemplateId: templateIgCanvasId,
    qmrTemplateId: templateQmrWorksheetId,
    // no additionalTemplate:,
    //no additionalTemplateName:
  },
  ami: {
    name: "AMI",
    syllabusTemplateId: "1_-tL_OuGPoPuTRHWwesJbNfPYNGdjc0r",
    csdTemplateId: templateProgramCsdId,
    igTemplateId: templateIgCanvasId,
    qmrTemplateId: "1yfz_xptgrydrKkOw8K_RREThHKJwjACsJrRJSTSeXl8",
    // no additionalTemplate:,
    //no additionalTemplateName:
  },/** ANTH was deleted from the Program
  anth: {
    name: "ANTH",
    syllabusTemplateId: dabaSyllabusTemplateId,
    csdTemplateId: templateMasterCsdId,
    igTemplateId: templateIgCanvasId,
    qmrTemplateId: "1HG1nGrdfgWJOgUBMuplj2SCZiXKQxaOXCaqOLGyyBZ8",
    // no additionalTemplate:,
    //no additionalTemplateName:
  },*/
  basIps: {
    name: "BAS/IPS",
    syllabusTemplateId: "1Kx4lfziBN3HokD7PAnQPnJyYR4UkDBbq",
    csdTemplateId: templateMasterCsdId,
    igTemplateId: templateIgCanvasId,
    qmrTemplateId: "1YpskTtyJ9tw6CbxuV7M4uo3I-0oARmkoTXHGy7WpeJQ",
    // no additionalTemplate:,
    //no additionalTemplateName:
  },
  busbtc: {
    name: "BUSBTC",
    syllabusTemplateId: busmgtBusbtcEntbusEntrepRhmSyllabusTemplateId,
    csdTemplateId: templateMasterCsdId,
    igTemplateId: templateIgCanvasId,
    qmrTemplateId: "1qyKhPaToWclJvSH0uvV8XtXEYFEa6quiabDtksHTQmY",
    // no additionalTemplate:,
    //no additionalTemplateName:
  },
  busmgt: {
    name: "BUSMGT",
    syllabusTemplateId: busmgtBusbtcEntbusEntrepRhmSyllabusTemplateId,
    csdTemplateId: templateMasterCsdId,
    igTemplateId: templateIgCanvasId,
    qmrTemplateId: "1UCkr6mBxvWZs8ciiIN7W_K3vhxooOH8z8prnlwOKlxI",
    // no additionalTemplate:,
    //no additionalTemplateName:
  },
  cip: {
    name: "CIP",
    syllabusTemplateId: "1beDTo00KA66xhjX1ToKWaO1AZeSkWNhxukqc9MI5DFE",
    csdTemplateId: templateMasterCsdId,
    igTemplateId: templateIgCanvasId,
    qmrTemplateId: "1MBb7pJJwt2dKDlxRQ4eJX9g090v-_J63-KDo908o8V0",
    // no additionalTemplate:,
    //no additionalTemplateName:
  },
  conflict: {
    name: "CONFLICT",
    syllabusTemplateId: "1WkpS8z9xIoq4FrK66nok43QCHERi9zqctTFg_nchkZk",
    csdTemplateId: "1YlBCIPRjg-gsfi_JU8CCboTUWLf0NzcYWDq1TOCi_yQ",
    igTemplateId: "1RArrUaE3cek36zPlkQpXow1qMDmYazZr_uZU2EGainc",
    qmrTemplateId: templateQmPeerReviewWorksheetId,
    // no additionalTemplate:,
    //no additionalTemplateName:
  },
  core: {
    name: "Cyber CORe",
    syllabusTemplateId: cpsCoreSyllabusTemplateId,
    csdTemplateId: templateMasterCsdId,
    igTemplateId: cpsCoreIgTemplateId,
    qmrTemplateId: "1RIljo8LRhYIJCoSf_YmBHEuS5cli6UdF1KjNrU7LPBM",
    // no additionalTemplate:,
  },
  cyber: {
    name: "Cyber for All",
    syllabusTemplateId: cpsCoreSyllabusTemplateId,
    csdTemplateId: templateMasterCsdId,
    igTemplateId: cpsCoreIgTemplateId,
    qmrTemplateId: "1mYYq4haUAEqZfQRYw2QJ1hRNguDu4bMt899aGPP2lXs",
    // no additionalTemplate:,
    //no additionalTemplateName:
  },
  dcm: {
    name: "DCM",
    syllabusTemplateId: "1JAvIIuT7WFGcZGtyM3AXztVjuJ1JnlhmP1MOfBA0qHg",
    csdTemplateId: null,  //Not Applicable as of 2/29/2024 TM
    igTemplateId: templateIgCanvasId,
    //QMR Status unknown - 2/29/2024 TM
    // no additionalTemplate:,
    //no additionalTemplateName:
  },
  facultyDev: {
    name: "eCampus Faculty Development",
    syllabusTemplateId: null,
    csdTemplateId: templateProgramCsdId,
    igTemplateId: templateIgCanvasId,
    //No QM template
    // no additionalTemplate:,
    //no additionalTemplateName:
  },
  studentSuccess: {
    name: "eCampus Student Success Initiatives",
    syllabusTemplateId: null,
    csdTemplateId: null,
    igTemplateId: null,
    //not linked, but just using defaults for csd and ig
    //No QMR?
    // no additionalTemplate:,
    //no additionalTemplateName:
  },
  entbus: {
    name: "ENTBUS",
    syllabusTemplateId: busmgtBusbtcEntbusEntrepRhmSyllabusTemplateId,
    csdTemplateId: templateMasterCsdId,
    igTemplateId: templateIgCanvasId,
    qmrTemplateId: "16n5rOlYx4X4rqLZZLHhX9yJ9gHpOV_AdWumnQ23olfM",
    // no additionalTemplate:,
    //no additionalTemplateName:
  },
  gencoun: {
    name: "GENCOUN",
    syllabusTemplateId: "1JKf9ieg2XRT8L8G6kivbG-9lygFQSxt6VRnLMIsis4k",
    csdTemplateId: templateMasterCsdId,
    igTemplateId: templateIgCanvasId,
    qmrTemplateId: templateQmrWorksheetId,
    additionalTemplate:"1omwB7XX1iQrZm8b3ZQqv143vBVBBSx2g3HQbxpk-jxA",
    additionalTemplateName: "Resource Document Template" //program number will need to be added into title later
  },
  iep: {
    name: "IEP",
    syllabusTemplateId: "1rQFznhGupbe47zYaBOU7UATVy98OLpAFZEsSAJIxn7g",
    //No CSDs
    igTemplateId: templateIgCanvasId,
    qmrTemplateId: "1muFLHsq2nNtKlkzzGQOzi1TzVcu22L0L", //This is a weird one
    // no additionalTemplate:,
    //no additionalTemplateName:
  },
  imgsci: {
    name: "IMGSCI",
    syllabusTemplateId: "1nwVlkabE1LqXXp9vHcg6_iDIm3LILfU3",
    csdTemplateId: templateMasterCsdId,
    igTemplateId: templateIgCanvasId,
    qmrTemplateId: "1UbtMBJeKKPyYq8mi-6fTaeJ4mC9UwEyvWNz004QpLMw",
    // no additionalTemplate:,
    //no additionalTemplateName:
  },
  lead: {
    name: "LEAD",
    syllabusTemplateId: "1Ra4RiRB8s6B5VqM49W7gUA4HuqTCZbhwHAvWU7ZncH8",
    csdTemplateId: templateMasterCsdId,
    igTemplateId: templateIgCanvasId,
    //QMRs but not QMR template
    // no additionalTemplate:,
    //no additionalTemplateName:
  },
  nonprof: {
    name: "NONPROF",
    syllabusTemplateId: busmgtBusbtcEntbusEntrepRhmSyllabusTemplateId,
    csdTemplateId: templateMasterCsdId,
    igTemplateId: templateIgCanvasId,
    // no additionalTemplate:,
    //no additionalTemplateName:
  },
  odp: {
    name: "ODP",
    syllabusTemplateId: "1gYWqI4curZDV0BMfwDRqXok4S8S3b0_5AcJtgEnDYsM",
    csdTemplateId: templateMasterCsdId,
    igTemplateId: templateIgCanvasId,
    qmrTemplateId: "133_ka4oyIqkSGy9gOyVy3A4ehSyRoErDMKRdotkrxY4",
    // no additionalTemplate:,
    //no additionalTemplateName:
  },/** Grant is done
  cyberGrant: {
    name: "Online Idaho Cyber Grant",
    syllabusTemplateId: cpsCoreSyllabusTemplateId,
    csdTemplateId: templateMasterCsdId,
    igTemplateId: cpsCoreIgTemplateId,
    qmrTemplateId: "1RIljo8LRhYIJCoSf_YmBHEuS5cli6UdF1KjNrU7LPBM",
    // no additionalTemplate:,
    //no additionalTemplateName:
  }, */
  opwl: {
    name: "OPWL",
    syllabusTemplateId: "1edX2QBS1oDFMAqhzVaTJZWC8y_T-Yk0S",
    csdTemplateId: templateFacultyCsdId,
    igTemplateId: templateIgCanvasId,
    //No QMRs?
    // no additionalTemplate:,
    //no additionalTemplateName:
  },
  pace: {
    name: "PaCE",
    syllabusTemplateId: "1Mkeqv3qBdyiwv4mB2ViX4LsVPX1lAE0UzfgnpUknH9k",
    csdTemplateId: templateMasterCsdId,
    igTemplateId: templateIgCanvasId,
    //No QMR?
    // no additionalTemplate:,
    //no additionalTemplateName:
  },
  phsm: {
    name: "PHSM",
    syllabusTemplateId: "1AM7ODwmKq1AI65sLo-pKCldHsb2alCvd5rVUDVQXAJc",
    csdTemplateId: templateProgramCsdId,
    igTemplateId: templateIgCanvasId,
    //QMRs but no template?
    // no additionalTemplate:,
    //no additionalTemplateName:
  },
  prc: {
    name: "PRC",
    syllabusTemplateId: templateOnlineCourseSyllabusId,
    csdTemplateId: templateFacultyCsdId,
    igTemplateId: templateIgCanvasId,
    //No QMR template or QMRs
    // no additionalTemplate:,
    //no additionalTemplateName:
  },
  projmgt: {
    name: "PROJMGT",
    syllabusTemplateId: "1VIMjBwrZp1ShaAt8Rl0w1BpHWz44GhOD80yE3m-J690", //File was updated. 2/29/2024 - TM
    csdTemplateId: templateFacultyCsdId,
    igTemplateId: templateIgCanvasId,
    //QMR but no QMR template
    // no additionalTemplate:,
    //no additionalTemplateName:
  },
  pubadm: {
    name: "PUBADM",
    syllabusTemplateId: "1uIkB-rKVRLx40zkTB2gGicvGkV_5WTy1yPmXHRE5N5g",
    csdTemplateId: templateMasterCsdId,
    igTemplateId: templateIgCanvasId,
    qmrTemplateId: templateQmrWorksheetId,
    // no additionalTemplate:,
    //no additionalTemplateName:
  },
  pubh: {
    name: "PUBH",
    syllabusTemplateId: "1ZEpXI_Pac4bcOTjtj3YXpHygebmEJzzmB9KHrwTtZqI",
    csdTemplateId: templateMasterCsdId,
    igTemplateId: templateIgCanvasId,
    qmrTemplateId: templateQmrWorksheetId,
    // no additionalTemplate:,
    //no additionalTemplateName:
  },
  respcare: {
    name: "RESPCARE",
    syllabusTemplateId: "1L2pWPYXF2Ehsjeg7mMdzwz7QcKlYMHYfpsBQFi0e5ks",
    csdTemplateId: templateMasterCsdId,
    igTemplateId: templateIgCanvasId,
    qmrTemplateId: templateQmrWorksheetId,
    // no additionalTemplate:,
    //no additionalTemplateName:
  },
  rhm: {
    name: "RHM",
    syllabusTemplateId: busmgtBusbtcEntbusEntrepRhmSyllabusTemplateId,
    csdTemplateId: templateMasterCsdId,
    igTemplateId: templateIgCanvasId,
    qmrTemplateId: "1UCkr6mBxvWZs8ciiIN7W_K3vhxooOH8z8prnlwOKlxI", //Different standard template?
    // no additionalTemplate:,
    //no additionalTemplateName:
  },
  socwrk: {
    name: "(BSW) SOCWRK",
    syllabusTemplateId: "1X_DIti21h1_-ISdXcpN6ogELEOUlq2Zd4wiZJ44LQ9Q",
    csdTemplateId: templateMasterCsdId,
    igTemplateId: templateIgCanvasId,
    //qmrTemplateId: "1UCkr6mBxvWZs8ciiIN7W_K3vhxooOH8z8prnlwOKlxI",
    // no additionalTemplate:,
    //no additionalTemplateName:
  },
  socwrk2: {
    name: "(MSW) SOCWRK",
    syllabusTemplateId: "1vDsQt5sTbRi-aGXQT48A3bRIaCdN-K0DiN9LJeNd8to",
    csdTemplateId: "1Oqfctc8nKQ-9C-JxFdVFxK19POzYYOV9EMl3-3uA-BQ",
    igTemplateId: "1084jvXn7i1i80ti08CdZl2dzVqYlA2b4hcbcsbo-pF0",
    qmrTemplateId: "1s90578XrziZp13WrwNRLn_xzaTrHMtB-c5wk_Qjuflw",
    // no additionalTemplate:,
    //no additionalTemplateName:
  },
  sps: {
    name: "SPS",
    syllabusTemplateId: "1Oc7srHFJwg6dEIVX_c2iCsoqQammYPgqz9gwJFx4TZg",
    csdTemplateId: null,  //Requested removed - TM, 3/11/2024
    igTemplateId: templateIgCanvasId,
    //QMR Status unknown - 2/29/2024 TM
    // no additionalTemplate:,
    //no additionalTemplateName:
  },
  stratcom: {
    name: "STRATCOM", // Formerly PRO. Name was updated 2/27/2025 - TM
    syllabusTemplateId: "1hOWkUqtucSLK0aewGpawOuaczzA4lyd_",
    csdTemplateId: templateMasterCsdId,
    igTemplateId: templateIgCanvasId,
    qmrTemplateId: "1rI8S2c49LNBkJeefaqa5sYfNStxs6yHKA7t6vLUvqRE",
    additionalTemplate:"1nX_QzcNk1xy9t4TZb9PSotzdeFlF_Yoh",
    additionalTemplateName: "How to be Successful in This Course" //program number will need to be added into title later
  },
  ethno: {
    name: "UX",
    syllabusTemplateId: dabaSyllabusTemplateId,
    csdTemplateId: templateMasterCsdId, //??
    igTemplateId: templateIgCanvasId,
    //QMRs, but no QMR template
    // no additionalTemplate:,
    //no additionalTemplateName:
  },
  write: {
    name: "WRITE",
    syllabusTemplateId: "174zHzd-mvzQutpo0yGr4s4tD8-4NFCMEqX125J77_y0",
    csdTemplateId: templateFacultyCsdId,
    igTemplateId: templateIgCanvasId,
    qmrTemplateId: "1r4llfy8rvRGzR9OM7ScgWsb1tVeoLgNFlKhdPtDGz1Y", //Sheet
    // no additionalTemplate:,
    //no additionalTemplateName:
  },
  
};
