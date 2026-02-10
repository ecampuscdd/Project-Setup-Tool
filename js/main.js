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
async function initialize() {
    try {
        const resp = await fetch('js/templates.json');
        templateData = await resp.json();
        
        populateDropdowns();
        setupEventListeners();
        console.log("Ready.");
    } catch (e) {
        successOrErrorMessage.textContent = "Configuration Error.";
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
    // Logic for hiding/showing fields based on projectTypeSelect (from your original code)
    // Logic for auto-filling prefix based on programSelect (from your original code)
    
    form.addEventListener("submit", handleFormSubmit);
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
