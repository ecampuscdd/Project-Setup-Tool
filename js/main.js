const form = document.querySelector("form");
const projectTypeSelect = document.getElementById("type-select");
const redesignCheckbox = document.getElementById("redesign-checkbox");
const courseTitleDiv = document.querySelector(".course-title-field");
const semesterYearField = document.querySelector(".semester-year-field");
const semesterYearInput = document.getElementById("semester-year-input");
const facultyNameInput = document.getElementById("faculty-name-input");
const facultyNameField = document.querySelector(".faculty-name-field");
const courseLengthInput = document.getElementById("course-length-input");
const courseLengthField = document.querySelector(".course-length-field");
const submitWrapper = document.querySelector(".submit-wrapper");
const successOrErrorMessage = document.getElementById(
"success-or-error-message"
);

const prefixNumberDiv = document.querySelector(".prefix-number-field");
const programDiv = document.querySelector(".program");
const programDivInitHTML = programDiv.innerHTML;
const programSelect = document.getElementById("program-select");
const programSelectWidth = programSelect.offsetWidth;
const prefixLabel = document.querySelector('label[for="prefix-input"]');
const numberLabel = document.querySelector(
'label[for="course-number-input"]'
);
const numberInput = document.getElementById("course-number-input");
const prefixInput = document.getElementById("prefix-input");
const courseTitleInput = document.getElementById("course-title-input");
const sodTemplateSelect = document.getElementById("sod-template-select");
const submitButton = document.querySelector("button[type=submit]");

const WORKER_URL = "https://script.google.com/a/macros/boisestate.edu/s/AKfycbwr8mg5nl2eecV2Xhw4XUmnVbsYy9M1XFTkmT-7VNPuRA97iLhfLOCtx0HKNcM-J_I/exec";

async function submitToGoogle(formObject) {
  // We use a standard form post or fetch
  // NOTE: Because of Google's security, we often use a "Redirect" 
  // or a hidden iframe to handle the login pop-up if the user isn't logged in.
  
  const response = await fetch(WORKER_URL, {
    method: "POST",
    body: JSON.stringify(formObject),
    headers: {
      "Content-Type": "text/plain;charset=utf-8" // Helps avoid CORS pre-flight issues
    }
  });
  
  return await response.json();
}
const submitButtonHeight = submitButton.clientHeight;
const submitButtonInitHTML = submitButton.innerHTML;

prefixInput.style.width = `${prefixLabel.clientWidth}px`;
numberInput.style.width = `${numberLabel.clientWidth}px`;

programDiv.style.display = "none";
programSelect.disabled = true;

semesterYearField.style.display = "none";
semesterYearInput.disabled = true;

facultyNameField.style.display = "none";
facultyNameInput.disabled = true;
courseLengthField.style.display = "none";
courseLengthInput.disabled = true;

courseTitleDiv.style.display = "none";
courseTitleInput.disabled = true;

successOrErrorMessage.style.display = "none";

projectTypeSelect.addEventListener("change", (e) => {
if (e.target.value === "masterProgram") {
  programDiv.style.display = "";
  programSelect.disabled = false;
  facultyNameField.style.display = "none";
  facultyNameInput.disabled = true;
  numberInput.required = true;
  courseLengthField.style.display = "none";
  courseLengthInput.disabled = true;
} else if (e.target.value === "faculty") {
  programDiv.style.display = "none";
  programSelect.disabled = true;
  facultyNameField.style.display = "";
  facultyNameInput.disabled = false;
  courseLengthField.style.display = "";
  courseLengthInput.disabled = false;
} else {
  programDiv.style.display = "none";
  programSelect.disabled = true;
  facultyNameField.style.display = "none";
  facultyNameInput.disabled = true;
  numberInput.required = true;
  courseLengthField.style.display = "none";
  courseLengthInput.disabled = true;
}
});

programSelect.addEventListener("change", () => {
const select = programSelect.options[programSelect.selectedIndex];

if (select.value === "facultyDev" || select.value === "studentSuccess") {
  prefixNumberDiv.style.display = "none";
  prefixInput.disabled = true;
  numberInput.disabled = true;

  courseTitleDiv.style.display = "";
  courseTitleInput.disabled = false;
} else {
  prefixNumberDiv.style.display = "";
  prefixInput.disabled = false;
  numberInput.disabled = false;

  courseTitleDiv.style.display = "none";
  courseTitleInput.disabled = true;
}

if (select.value === "core") {
  prefixInput.value = "CORe";
} else if (select.value === "cyber") {
  prefixInput.value = "CPS";
} else if (select.value === "cyberGrant") {
  prefixInput.value = "CNT";
} else if (select.value === "prc") {
  prefixInput.value = "IDS";
} else if (
  programSelect.options[programSelect.selectedIndex].value === ""
) {
  prefixInput.value = "";
} else {
  prefixInput.value = select.text;
}
});

redesignCheckbox.addEventListener("change", (e) => {
if (e.target.checked) {
  semesterYearField.style.display = "";
  semesterYearInput.disabled = false;
} else {
  semesterYearField.style.display = "none";
  semesterYearInput.disabled = true;
}
});

form.addEventListener("submit", (e) => {
e.preventDefault();
submitButton.disabled = true;
submitButton.style.height = `${submitButtonHeight}px`;
submitButton.style.padding = "0px";
submitButton.innerHTML = `
      <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="30px" height="30px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
      <path fill="#FFF" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
        <animateTransform attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="0.6s"
          repeatCount="indefinite"/>
        </path>
      </svg>
    `;

// setTimeout(() => {
//   submitButton.innerHTML = submitButtonInitHTML;
//   submitButton.removeAttribute('style');
//   formData = new FormData(e.target);
//   const formJson = Object.fromEntries(formData.entries());
//   console.log(formJson);
//   form.addEventListener('input', (e) => {
//     submitButton.disabled = false;
//   });
// }, 2000);

const formData = new FormData(e.target);
const formObject = Object.fromEntries(formData.entries());

function handleSuccessOrFailure() {
  for (let field of fieldsDisabledWhileLoading) {
    field.disabled = false;
  }
  submitButton.innerHTML = submitButtonInitHTML;
  submitButton.removeAttribute("style");
  form.addEventListener(
    "input",
    (e) => {
      submitButton.disabled = false;
      successOrErrorMessage.style.display = "none";
      successOrErrorMessage.textContent = "";
      submitWrapper.removeAttribute("style");
    },
    { once: true }
  );
  successOrErrorMessage.style.display = "";
  submitWrapper.style.marginTop = "-18px";
}

google.script.run
  .withSuccessHandler((success) => {
    handleSuccessOrFailure();
    console.log(success);
    successOrErrorMessage.style.color = "green";
    successOrErrorMessage.innerHTML = `Success! Follow this link to access your project documents: <a
        target="_blank"
        href="${success.folderUrl}"
        >${success.courseCode} documents</a
      >`;
  })
  .withFailureHandler((error) => {
    handleSuccessOrFailure();
    successOrErrorMessage.style.color = "red";
    successOrErrorMessage.textContent = error.message;
  })
  .processForm(formObject);

let fieldsDisabledWhileLoading = [];
document.querySelectorAll("input, select").forEach((field) => {
  if (field.disabled === false) {
    fieldsDisabledWhileLoading.push(field);
    field.disabled = true;
  }
});
});
