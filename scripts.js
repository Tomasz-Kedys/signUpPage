const container = document.getElementById("form-container");

const form = document.createElement("form");
form.className = "signup-form";
form.noValidate = true;

const fields = [
  { type: "text", placeholder: "First Name", name: "firstName" },
  { type: "text", placeholder: "Last Name", name: "lastName" },
  { type: "email", placeholder: "Email Address", name: "email" },
  { type: "password", placeholder: "Password", name: "password" },
];

fields.forEach((f) => {
  const input = document.createElement("input");
  input.type = f.type;
  input.placeholder = f.placeholder;
  input.name = f.name;

  input.addEventListener("input", () => {
    input.classList.remove("input-error");
    const nextElement = input.nextElementSibling;
    if (nextElement && nextElement.classList.contains("error-message")) {
      nextElement.remove();
    }
  });

  form.appendChild(input);
});

const submitBtn = document.createElement("button");
submitBtn.type = "submit";
submitBtn.className = "claim-button";
submitBtn.textContent = "CLAIM YOUR FREE TRIAL";
form.appendChild(submitBtn);

container.appendChild(form);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  form.querySelectorAll(".error-message").forEach((el) => el.remove());
  form.querySelectorAll(".input-error").forEach((el) =>
    el.classList.remove("input-error")
  );

  let valid = true;
  const inputs = form.querySelectorAll("input");

  inputs.forEach((input) => {
    const value = input.value.trim();

    if (!value) {
      showError(input, `${input.placeholder} cannot be empty`);
      valid = false;
    } else if (input.type === "email" && !/\S+@\S+\.\S+/.test(value)) {
      showError(input, "Looks like this is not an email");
      valid = false;
    }
  });

  if (valid) {
    alert("Form submitted successfully!");
    form.reset();
  }
});

function showError(input, message) {
  input.classList.add("input-error");

  const existingError = input.nextElementSibling;
  if (existingError && existingError.classList.contains("error-message")) {
    existingError.remove();
  }

  const error = document.createElement("div");
  error.className = "error-message";
  error.textContent = message;
  input.insertAdjacentElement("afterend", error);
}