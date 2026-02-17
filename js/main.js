const WORKER_URL = "https://script.google.com/a/macros/boisestate.edu/s/AKfycbwr8mg5nl2eecV2Xhw4XUmnVbsYy9M1XFTkmT-7VNPuRA97iLhfLOCtx0HKNcM-J_I/exec";
let templateData = null;

// Selectors
const form = document.getElementById("setup-form");
const projectTypeSelect = document.getElementById("type-select");
const programSelect = document.getElementById("program-select");
const sodTemplateSelect = document.getElementById("sod-template-select");
const submitButton = document.querySelector("button[type=submit]");
const successOrErrorMessage = document.getElementById("success-or-error-message");

/**
 * 1. INITIALIZE TOOL
 */
async function initializeTool() {
  try {
    // Fetch the JSON from GitHub
    const response = await fetch('js/templates.json');
    if (!response.ok) throw new Error("Could not find templates.json");
    
    templateData = await response.json();
    
    // Fill the dropdowns
    populateDropdowns(templateData);
    
    // Set up form behavior
    setupEventListeners();
    
    // Notify readiness
    successOrErrorMessage.style.display = "block";
    successOrErrorMessage.style.color = "#39843b"; 
    successOrErrorMessage.textContent = "✓ Templates Loaded. System Ready.";
    
    setTimeout(() => {
      successOrErrorMessage.style.display = "none";
    }, 5000);

    console.log("Health Check: System initialized.");
  } catch (error) {
    console.error("Initialization failed:", error);
    successOrErrorMessage.style.display = "block";
    successOrErrorMessage.style.color = "red";
    successOrErrorMessage.textContent = "✘ Error: Could not load data.";
  }
}

/**
 * 2. POPULATE DROPDOWNS
 */
function populateDropdowns(data) {
    // Fill Programs
    for (let key in data.programs) {
        if (key !== "facultyCourses" && data.programs[key].active !== false) {
            let opt = document.createElement("option");
            opt.value = key;
            opt.textContent = data.programs[key].name;
            programSelect.appendChild(opt);
        }
    }
    // Fill SODs
    for (let key in data.sodTemplates) {
        let opt = document.createElement("option");
        opt.value = key;
        opt.textContent = data.sodTemplates[key].name;
        sodTemplateSelect.appendChild(opt);
    }
}

/**
 * 3. EVENT LISTENERS
 */
function setupEventListeners() {
    // Handle the project type toggle logic here
    projectTypeSelect.addEventListener("change", (e) => {
        const programDiv = document.querySelector(".program");
        if (e.target.value === "masterProgram") {
            programDiv.style.display = "block";
            programSelect.required = true;
        } else {
            programDiv.style.display = "none";
            programSelect.required = false;
        }
    });

    // Handle form submission
    form.addEventListener("submit", handleFormSubmit);
}

/**
 * 4. SUBMISSION
 */
async function handleFormSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(WORKER_URL, {
            method: "POST",
            mode: "no-cors", // Crucial for Google Apps Script Web Apps
            body: JSON.stringify(formObject)
        });

        // NOTE: with "no-cors", we can't read the response JSON.
        // We'll assume success if the fetch doesn't throw an error.
        successOrErrorMessage.style.display = "block";
        successOrErrorMessage.style.color = "green";
        successOrErrorMessage.textContent = "Request sent! Check your Google Drive.";
        
    } catch (err) {
        successOrErrorMessage.style.color = "red";
        successOrErrorMessage.textContent = "Error: " + err.message;
    } finally {
        setLoading(false);
    }
}

function setLoading(isLoading) {
    submitButton.disabled = isLoading;
    submitButton.innerHTML = isLoading ? "Creating..." : "Create Project Folder";
}

// MAKE SURE THIS MATCHES YOUR FUNCTION NAME
window.addEventListener("load", initializeTool);
