/**
 * SCRIPT NAME: 	Project Setup Script
 * DATE:			    v.1-13 developed before Sep. 2023. 
 *                v. 14-20 Developed March 2024
 * DEVELOPER:	    Chas Ceasar
 * UPDATES:		    Todd Miranda
 * PURPOSE:       This script was developed to cut the time down on the repetitive copying and subsequent misalignment of common documents. The script starts from a Knowledge Base article maintained by eCampus Staff and will bring users to a web interface. This interface will ask for read/write access to the users account, this is required for the script to run. There are a series of input questions to determine what kind of project is needed and the documentation required. Once the user submits their request the script will look for the template files located in various places hardcoded into the ProgramsAndTemplatesData.gs file, make copies of those files, and then organize them into a standardized folder structure. This folder structure will then be placed into the users' Google Drive account. It is then the responsibility of the user to move that created folder into the proper hierarchy in Course Design and Development Google Drive updating the created folders with the proper access. 
 * RESOURCES:		  CDD Project Documents Setup (Before Week 1) https://boisestateecampus.atlassian.net/wiki/spaces/EKB/pages/2414739457/CDD+Project+Documents+Setup+Before+Week+1
 *                NEW and Improved Folder Setup Process https://boisestateecampus.atlassian.net/wiki/spaces/EKB/pages/2469134337/NEW+and+Improved+Folder+Setup+Process
 * SCRIPT FILES:	Functions.gs - Google Script file that contains all the functions necessary to run the script.
 * 			          Index.html - HTML file that contains the web interface. 
 *                JavaScript.html - HTML file but really just the script portion of the web interface. Information from the form on this interface is passed back to the other files.
 *                ProgramsAndTemplatesData.gs - Google Script file that contains all of the hardcoded identification of the template documents (everything that will be copied)
 *                Stylesheet.html - HTML file used to make the form look good.
 * UPDATE NOTE:		There are instances where the Error thrown says simply "Couldn't find Syllabus template". Looking at the exception thrown you see "Exception: No item with the given ID could be found. Possibly because you have not edited this item or you do not have permission to access it." I could not figure out a way to separate if the file was not found or if there was not access to the file. HOWEVER, to solve the issue double check that the account using this script also has access to the template files this script is copying. 
 *  UPDATE NOTE: 2/27/2025  If there is ever an instance where the GENCOUN department has a faculty course where the new additionalTemplate file is needed, the pull will need to be added to the buildProjectFolder function below to get that file. Rightnow additionalTemplate object is passed over when faculty is slected.
 */

/** doGet()
 *  Creates the instance of the HTML template from the file called Index
 *  Lets the script know that there are variables within the template called “programs” and “sodTemplates”
 *  Returns the template.
 */
function doGet() {
  const template = HtmlService.createTemplateFromFile("Index");
  template.programs = programs;
  template.sodTemplates = sodTemplates;
  return template.evaluate();
}

/** include(filename)
 *  Function to get content from the HTML form in the Index file
 *  Returns that form content
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

//Error testing, it throws an error
function testFormSubmission(form) {
  throw new Error("big error");
}

/** Test variables
 *  constants testMasterData, testCoreMasterData, testFacultyData, testMasterRedesignData, testFacultyRedesignData, and testBadData are
 *  a series of test data inputs used for testing purposes only. These are global variables used across all files
 */
const testMasterData = {
  prefix: "ACCT",
  sodTemplate: "sodTemplateA",
  courseTitle: "Financial Statements",
  courseNumber: "510",
  projectType: "masterProgram",
  program: "acct",
};
const testCoreMasterData = {
  projectType: "masterProgram",
  courseNumber: "325",
  prefix: "CORe",
  sodTemplate: "sodTemplateB",
  courseTitle: "Security",
  program: "core",
};
const testFacultyData = {
  courseNumber: "201",
  facultyName: "John Keating",
  prefix: "ENGL",
  courseLength: "7w",
  sodTemplate: "sodTemplateC",
  projectType: "faculty",
  courseTitle: "Essay Writing",
};
const testMasterRedesignData = {
  redesign: "on",
  prefix: "RESPCARE",
  courseTitle: "History of Respiratory Care",
  sodTemplate: "sodTemplateD",
  courseNumber: "525",
  semesterYear: "FA24",
  projectType: "masterProgram",
  program: "respcare",
};
const testFacultyRedesignData = {
  courseNumber: "442",
  sodTemplate: "sodTemplateA",
  courseLength: "15w",
  facultyName: "Gregory House",
  semesterYear: "SU23",
  prefix: "BIOL",
  redesign: "on",
  projectType: "faculty",
  courseTitle: "Advanced Physiology",
};
const testBadData = {
  projectType: "masterProgram",
  program: "cyber",
  courseTitle: "aa",
  sodTemplate: "sodTemplateC",
  facultyName: "aaa",
  courseLength: "aaa",
};

/** processForm(formObject)
 *  Gets sent the form object from the JavaScript File. This form object is the form filled out in the Index HTML file. It contains all the input information
 *  Returns: buildProjectFolder after data from the form has been validated in the validateFormData method
 */
function processForm(formObject = testMasterData) {
  return buildProjectFolder(validateFormData(formObject));
}

/** validateFormData(formData)
 *  Gets the form data from the processForm() method to throw errors when possible bad data is entered.
 *  Returns: formDatra - a relatively error free dataset.
 */
function validateFormData(formData = testBadData) {
  if (
    formData.projectType !== "faculty" &&
    formData.projectType !== "masterProgram"
  ) {
    throw new Error("Project type not defined");
  } else if (
    formData.projectType === "masterProgram" &&
    !programs[formData.program]
  ) {
    throw new Error("Program not defined");
  } else if (
    (formData.prefix === undefined || formData.courseNumber === undefined) &&
    formData.courseTitle === undefined
  ) {
    throw new Error("Course code/course title not defined");
  } else if (!sodTemplates[formData.sodTemplate]) {
    throw new Error("Schedule of Deliverables Template not defined");
  } else if (formData.projectType === "faculty" && !formData.facultyName) {
    throw new Error("Faculty name not defined");
  } else if (formData.redesign && !formData.semesterYear) {
    throw new Error("Redesign semester and year not defined");
  } else if (formData.projectType === "faculty" && !formData.courseLength) {
    throw new Error("Course Length not defined");
  } else {
    return formData;
  }
}

/** buildProjectFolder(testCoreMasterData)
 *  Gets dataset from the processForm() method after it has been checked for missing data in the validateFormData() method. Presumably this is actionable data ready to be processed. 
 *  The function then inputs the data into global variables and outputs the data to the console log to be viewed in the web developer
 *  Returns: completed courseCode string and the completed folderUrl that contains all the requested documents
 */
function buildProjectFolder({
  projectType,
  program,
  prefix,
  courseNumber,
  courseTitle,
  sodTemplate,
  redesign,
  facultyName,
  semesterYear,
  courseLength
} = testCoreMasterData) {
  console.log(
    projectType,
    program,
    courseNumber,
    courseTitle,
    facultyName,
    semesterYear,
    courseLength
  );

  //Getting programData info from the field facultyCourses if project type is set to Faculty, otherwise program data should be a list of programs
  let programData;
  if (projectType === "faculty") {
    programData = programs.facultyCourses;
  } else {
    if (programs[program]) {
      programData = programs[program];
    } else {
      throw new Error(`Couldn't find program`);
    }
  }
  //Sets the courseCode to be a string containing both the course prefix and the course number, otherwise courseCode will containing the course Title.
  let courseCode;
  if (prefix && courseNumber) {
    courseCode = `${prefix} ${String(courseNumber)}`;
  } else if (courseTitle) {
    courseCode = courseTitle;
  }

  /** Sets folderName as a string with 4 possible combinations
   *  If redesign is true and project type is faculty, folderName will be a combination of of courseCode SemesterYear FacultyName and CourseLength OR couseCode.
   *  If only redesign is true the folderName will be a combination of courseCode, semesterYear, facultyName and courseLength.
   *  If redesign is false and projectType is faculty, folderName will be a combination of courseCode, facultyName and courseLength.
   *  and finally if none of the above conditions are true, foldername will be set to courseCode
   */
  let folderName;
  if (redesign && projectType === "faculty") {
    folderName = `${courseCode} (Redesign ${semesterYear}) - ${facultyName} - ${courseLength}`;
  } else if (redesign) {
    folderName = `${courseCode} Redesign (${semesterYear})`;
  } else if (projectType === "faculty") {
    folderName = `${courseCode} - ${facultyName} - ${courseLength}`;
  } else {
    folderName = courseCode;
  }

  //creation of local variables
  let blueprintName,
    sodName,
    settingsTablesName,
    syllabusName,
    csdName,
    igName,
    courseStructureWorksheetName,
    addTempName;
  
  //sets above local variables with input and string additives if the redesign checkbox on the Index HTML is true and different string values if false
  if (redesign) {
    blueprintName = `${courseCode} Blueprint Redesign (${semesterYear})`;
    sodName = `${courseCode} Schedule of Deliverables Redesign (${semesterYear})`;
    settingsTablesName = `${courseCode} Settings Tables Redesign (${semesterYear})`;
    syllabusName = `${courseCode} Course Syllabus Redesign (${semesterYear})`;
    csdName = `${courseCode} Course Suggestions Redesign (${semesterYear})`;
    igName = `${courseCode} Instructor Guide Redesign (${semesterYear})`;
    courseStructureWorksheetName = `${courseCode} Course Structure Worksheet Redesign (${semesterYear})`;
    addTempName = `${courseCode}` + programData.additionalTemplateName;
  } else {
    blueprintName = `${courseCode} Blueprint`;
    sodName = `${courseCode} Schedule of Deliverables`;
    settingsTablesName = `${courseCode} Settings Tables`;
    syllabusName = `${courseCode} Course Syllabus`;
    csdName = `${courseCode} Course Suggestions`;
    igName = `${courseCode} Instructor Guide - Canvas`;
    addTempName = `${courseCode} ` + programData.additionalTemplateName;
  }

  //Creation of local variables, these will be the representation of the documents
  let templateBlueprint,
    templateSod,
    templateSettingsTables,
    templateSyllabus,
    templateCsd,
    templateIg,
    templateCourseStructureWorksheet,
    additionalTemplateFile;

  //creates a cyber variable and sets it to false, followed by instances were the cyber variable should be true
  let cyber = false;
  if (
    programData === programs.core ||
    programData === programs.cyber ||
    programData === programs.cyberGrant
  ) {
    cyber = true;
  }

  //The following are a number of try statements to figure out what the input variables are to provide corresponding templates and files

  // Blueprint Check - Check for specific blueprint template. Change this test to update a program with a unique blueprint template
  try {
    if (cyber) {
      templateBlueprint = DriveApp.getFileById(cyberTemplateBlueprintId);
    } else {
      templateBlueprint = DriveApp.getFileById(templateBlueprintId);
    }
  } catch (e) {
    console.log(e);
    throw new Error(`Couldn't find Blueprint template`);
  }

  // SettingsTable Check - Check for specific settings tables. Change this test to update a program with a unique Settings Table template
  try {
    if (cyber) {
      templateSettingsTables = DriveApp.getFileById(
        cyberTemplateSettingsTablesId
      );
    } else {
      templateSettingsTables = DriveApp.getFileById(templateSettingsTablesId);
    }
  } catch (e) {
    console.log(e);
    throw new Error(`Couldn't find Settings Tables template`);
  }

  // Schedule of Deliverables Template Check - Find and match the selected SoD template. Change this if there is an additional SoD Template
  try {
    if (sodTemplate === "sodTemplateA") {
      templateSod = DriveApp.getFileById(sodTemplates.sodTemplateA.id);
    } else if (sodTemplate === "sodTemplateB") {
      templateSod = DriveApp.getFileById(sodTemplates.sodTemplateB.id);
    } else if (sodTemplate === "sodTemplateC") {
      templateSod = DriveApp.getFileById(sodTemplates.sodTemplateC.id);
    } else if (sodTemplate === "sodTemplateD") {
      templateSod = DriveApp.getFileById(sodTemplates.sodTemplateD.id);
    } else if (sodTemplate === "sodTemplateE") {
      templateSod = DriveApp.getFileById(sodTemplates.sodTemplateE.id);
    } else if (sodTemplate === "sodTemplateF") {
      templateSod = DriveApp.getFileById(sodTemplates.sodTemplateF.id);
    } else {
      throw new Error(`Couldn't find Schedule of Deliverables template`);
    }
  } catch (e) {
    console.log(e);
    throw new Error(`Couldn't find Schedule of Deliverables template`);
  }

  // Syllabus Template Check - Check for the correct the syllabus template
  if (programData.syllabusTemplateId) {
    try {
      templateSyllabus = DriveApp.getFileById(programData.syllabusTemplateId);
    } catch (e) {
      console.log(e);
      throw new Error(`Couldn't find Syllabus template`);
    }
  }

  // Course Suggestion Document template Check - Check for the correct Course Suggestion Document template
  if (programData.csdTemplateId) {
    try {
      templateCsd = DriveApp.getFileById(programData.csdTemplateId);
    } catch (e) {
      console.log(e);
      throw new Error(`Couldn't find Course Suggestion Document template`);
    }
  }

  // Instructor Guide template - Check for the correct Instructor Guide template
  if (programData.igTemplateId) {
    try {
      templateIg = DriveApp.getFileById(programData.igTemplateId);
    } catch (e) {
      console.log(e);
      throw new Error(`Couldn't find Instructor Guide template`);
    }
  }

  // Course Structure Worksheet template for redesigns - Check for the correct Course Structure Worksheet template for redesigns
  if (redesign) {
    try {
      templateCourseStructureWorksheet = DriveApp.getFileById(templateCourseStructureWorksheetId);
    } catch (e) {
      console.log(e);
      throw new Error(
        `Couldn't find Course Structure Worksheet template for redesign`
      );
    }
  }



  // Retrieve the Additional Template File (if available):
  if (programData.additionalTemplate) { // Check the programData object.
    try {
      additionalTemplateFile = DriveApp.getFileById(programData.additionalTemplate);
    } catch (e) {
      console.log(e);
      throw new Error(`Couldn't find Additional Template template`);
    }
  }




  // Wrap it all up. Create the base folder structures
  let wrapperFolder, projectFolder;
  try {
    wrapperFolder = DriveApp.createFolder(
      `${folderName} documents (MOVE CONTENTS OF THIS FOLDER, THEN DELETE)`
    );
    if (projectType === "faculty") {
      projectFolder = wrapperFolder.createFolder(
        `${folderName} (MOVE INTO FACULTY COURSES FOLDER)`
      );
    } else {
      projectFolder = wrapperFolder.createFolder(
        `${folderName} (MOVE INTO PROGRAM FOLDER)`
      );
    }
    projectFolder.setStarred(true);
    projectFolder
      .createFolder(`${courseCode} Media`)
      //.createFolder(`${courseCode} Accessible Media`) //This creates the Accessible Media folder, removed due to process changes TM 12.16.25
      //.createFolder("Transcripts"); //This creates the Transcripts folder, removed since process changes made TM 5/13/2024
  } catch (e) {
    console.log(e);
    throw new Error(`Couldn't create project folders`);
  }


 // Make a copy of the Blueprint template and place it into the folder structure created
  try {
    templateBlueprint.makeCopy(blueprintName, projectFolder);
  } catch (e) {
    console.log(e);
    throw new Error(`Couldn't create Blueprint template copy`);
  }

  // Make a copy of the Settings Table template and place it into the folder structure created
  try {
    templateSettingsTables.makeCopy(settingsTablesName, projectFolder);
  } catch (e) {
    console.log(e);
    throw new Error(`Couldn't create Settings Tables template copy`);
  }

  // Make a copy of the Schedule of Deliverables template and place it into the folder structure created
  try {
    templateSod.makeCopy(`${sodName}`, projectFolder);
  } catch (e) {
    console.log(e);
    throw new Error(`Couldn't create Schedule of Deliverables template copy`);
  }

  // Make a copy of the Syllabus template and place it into the folder structure created
  if (programData.syllabusTemplateId) {
    try {
      if (programData.name === "(MSW) SOCWRK") {
        let syllabusId = templateSyllabus
          .makeCopy(
            `${syllabusName} (CONTACT OCT TO MOVE INTO SOCWRK SYLLABI FOLDER)`,
            wrapperFolder
          )
          .getId();
        projectFolder.createShortcut(syllabusId).setName(syllabusName);
      } else {
        templateSyllabus.makeCopy(syllabusName, projectFolder);
      }
    } catch (e) {
      console.log(e);
      throw new Error(`Couldn't create Syllabus template copy`);
    }
  }

  // Make a copy of the Course Suggestions Document and place it into the folder structure created
  if (programData.csdTemplateId) {
    try {
      if (projectType === "faculty") {
        templateCsd.makeCopy(csdName, projectFolder);
      } else {
        let csdId = templateCsd
          .makeCopy(`${csdName} (MOVE INTO PROGRAM CSD FOLDER)`, wrapperFolder)
          .getId();
        projectFolder.createShortcut(csdId).setName(csdName);
      }
    } catch (e) {
      console.log(e);
      throw new Error(
        `Couldn't create Course Suggestion Document template copy`
      );
    }
  }

  // Make a copy of the Instructor Guide template and place it into the folder structure created
  if (programData.igTemplateId) {
    try {
      if (projectType === "faculty") {
        templateIg.makeCopy(igName, projectFolder);
      } else {
        let igId = templateIg
          .makeCopy(`${igName} (MOVE INTO PROGRAM IG FOLDER)`, wrapperFolder)
          .getId();
        projectFolder.createShortcut(igId).setName(igName);
      }
    } catch (e) {
      console.log(e);
      throw new Error(`Couldn't create Instructor Guide template copy`);
    }
  }

  //Make Course Structure Worksheet for redesigns
  if (redesign) {
    try {
      templateCourseStructureWorksheet.makeCopy(
        courseStructureWorksheetName,
        projectFolder
      );
    } catch (e) {
      console.log(e);
      throw new Error(
        `Couldn't create Course Structure Worksheet template copy for redesign`
      );
    }
  }

  // Make a copy the Additional Template File and place it into the folder structure created
  if (additionalTemplateFile) {
    try {
      additionalTemplateFile.makeCopy(
        addTempName, 
        projectFolder
      );
    } catch (e) {
      console.log(e);
      throw new Error(`Couldn't create Additional Template template copy`);
    }
  }




  // Get the wrapped base folder structure URL
  let folderUrl = wrapperFolder.getUrl();

  //Method done, Return the corseCode and folderURL
  return { courseCode: courseCode, folderUrl: folderUrl };
}

// Function to create spreadsheet from program data - I suspect this was used in testing and might not be useful as of 3/1/2024. 
// Once the initial sheet was created it took a life of its own and was then edited by others.
function makeSpreadsheet() {
  //Function to create spreadsheet from program data--
  //edited version exists with ID below
  let ss = SpreadsheetApp.openById(
    "1ggXJDFfKpNe45_8VBGeIq5U91R8BXkHFc1h-JJ9UZrg"
  );
  let sheet = ss.getSheets()[0];
  let programsArray = Object.entries(programs);
  let idArray = programsArray.map((program) => {
    return [
      program[1].name,
      program[1].syllabusTemplateId,
      program[1].csdTemplateId,
      program[1].igTemplateId,
      program[1].qmrTemplateId,
    ];
  });
  let fileArray = idArray.map((arr) => {
    return arr.map((item, i) => {
      if (i === 0) {
        return item;
      } else {
        if (item) {
          const file = DriveApp.getFileById(item);
          const obj = {
            url: file.getUrl(),
            title: file.getName(),
          };
          if (
            item !== templateOnlineCourseSyllabusId &&
            item !== templateFacultyCsdId &&
            item !== templateMasterCsdId &&
            item !== templateProgramCsdId &&
            item !== templateIgCanvasId &&
            item !== templateQmrWorksheetId &&
            item !== templateQmPeerReviewWorksheetId
          ) {
            obj.unique = true;
          }
          return obj;
        } else {
          return undefined;
        }
      }
    });
  });
  console.log(fileArray);
  fileArray.forEach((arr, i) => {
    i = i + 1;
    arr.forEach((item, n) => {
      n = n + 1;
      let range = sheet.getRange(i, n);
      if (n === 1) {
        range.setValue(item);
      } else if (item === undefined) {
        return;
      } else {
        let richText = SpreadsheetApp.newRichTextValue()
          .setText(item.title)
          .setLinkUrl(item.url)
          .build();
        range.setRichTextValue(richText);
        if (item.unique) {
          range.setBackground("#ead1dc");
        }
      }
    });
  });
}
