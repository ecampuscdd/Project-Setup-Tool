const WORKER_URL = "https://script.google.com/a/macros/boisestate.edu/s/AKfycbwr8mg5nl2eecV2Xhw4XUmnVbsYy9M1XFTkmT-7VNPuRA97iLhfLOCtx0HKNcM-J_I/exec";
let templateData = null;

// Selectors
const form = document.querySelector("form");
const projectTypeSelect = document.getElementById("type-select");
const programSelect = document.getElementById("program-select");
const sodTemplateSelect = document.getElementById("sod-template-select");
const submitButton = document.querySelector("button[type=submit]");
const successOrErrorMessage = document.getElementById("success-or-error-message");
const prefixInput = document.getElementById("prefix-input");

/**
 * INITIALIZE TOOL
 */
async function initializeTool() {
  try {
    const response = await fetch('js/templates.json');
    templateData = await response.json();
    
    populateDropdowns(templateData);
    initUI();
    
    // NOTIFY READINESS
    const statusBox = document.getElementById("success-or-error-message");
    statusBox.style.display = "block";
    statusBox.style.color = "#39843b"; // Boise State Green
    statusBox.textContent = "✓ Templates Loaded. System Ready.";
    
    // Optional: Hide the message after 3 seconds
    setTimeout(() => {
      statusBox.style.display = "none";
    }, 5000);

    console.log("Health Check: JSON Data parsed and UI initialized.");
  } catch (error) {
    console.error("Initialization failed:", error);
    const statusBox = document.getElementById("success-or-error-message");
    statusBox.style.display = "block";
    statusBox.style.color = "red";
    statusBox.textContent = "✘ Error: Could not load templates.json";
  }
}

function populateDropdowns() {
    // Fill Programs
    for (let key in templateData.programs) {
        if (key !== "facultyCourses" && templateData.programs[key].active !== false) {
            let opt = document.createElement("option");
            opt.value = key;
            opt.textContent = templateData.programs[key].name;
            programSelect.appendChild(opt);
        }
    }
    // Fill SODs
    for (let key in templateData.sodTemplates) {
        let opt = document.createElement("option");
        opt.value = key;
        opt.textContent = templateData.sodTemplates[key].name;
        sodTemplateSelect.appendChild(opt);
    }
}

function setupEventListeners() {
    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries());
    
    // DEBUG LOG: See exactly what is being sent to Google
    console.log("Ready to build! Sending the following data to Google Worker:");
    console.table(formObject); 
    
    // This allows you to verify that the 'program' key matches the JSON key
    // before the Worker tries to find the IDs.
}

async function handleFormSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());

    try {
        // We use fetch instead of google.script.run
        const response = await fetch(WORKER_URL, {
            method: "POST",
            body: JSON.stringify(formObject)
        });
        const result = await response.json();

        if (result.status === "success") {
            successOrErrorMessage.style.color = "green";
            successOrErrorMessage.innerHTML = `Success! <a href="${result.folderUrl}" target="_blank">Open Folder</a>`;
        } else {
            throw new Error(result.message);
        }
    } catch (err) {
        successOrErrorMessage.style.color = "red";
        successOrErrorMessage.textContent = err.message;
    } finally {
        setLoading(false);
    }
}

function setLoading(isLoading) {
    submitButton.disabled = isLoading;
    submitButton.innerHTML = isLoading ? "Creating..." : "Create Project Folder";
}

window.addEventListener("load", initialize);
