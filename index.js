// grab all elements
const form = document.querySelector("form");
const resetBtn = document.querySelector(".btn");

const billAmount = document.getElementById("bill-amount");
const customTip = document.getElementById("custom-tip");
const numOfPeople = document.getElementById("num-people");
const tipRadios = document.querySelectorAll(".tip__radio");
const textFields = document.querySelectorAll(".input--text");

const tipAmount = document.getElementById("tip-amount");
const totalAmount = document.getElementById("total-amount");
// >>>>>>>>>>

// listen for when the user presses "enter"
window.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    // check for errors
    const billError = checkInputErrors(billAmount);
    const peopleError = checkInputErrors(numOfPeople);
    const customError = checkRadioErrors(tipRadios, customTip);

    // if there are any errors, stop the function
    if (billError || customError || peopleError) {
      return;
      // otherwise calculate tip amount
    } else {
      findTipAmount();
    }
  }
});

// reset form
resetBtn.addEventListener("click", reset);
// when the user tries to use "custom tip", unselect preset tip radio buttons
customTip.addEventListener("click", removePresetTip);
// watch each preset tip radio buttons and when they are pressed:
// 1. clear custom tip input
// 2. remove error border on custom tip, if there is one
// 3. remove error label
tipRadios.forEach(tipRadio =>
  tipRadio.addEventListener("click", () => {
    customTip.value = "";
    customTip.classList.remove("error--border");
    customTip.nextElementSibling.style.display = "none";
  })
);
// when the text fields are typed into, remove any error messages for that input
textFields.forEach(field => {
  field.addEventListener("input", removeErrorStyling);
});

// function definitions
function findTipAmount() {
  // find tip
  const billVal = +billAmount.value;
  let tipVal;
  const numOfPeopleVal = +numOfPeople.value;

  if (customTip.value) {
    tipVal = customTip.value / 100;
  } else {
    tipVal =
      +[...tipRadios].filter(tipRadio => tipRadio.checked)[0].value / 100; // get the value for the only radio button that is checked
  }

  const tipAmountVal = ((billVal * tipVal) / numOfPeopleVal).toFixed(2);
  const totalAmountVal = (billVal / numOfPeopleVal).toFixed(2);

  // change text for totals
  tipAmount.innerText = "$" + tipAmountVal;
  totalAmount.innerText = "$" + totalAmountVal;
}

function removePresetTip() {
  tipRadios.forEach(tipRadio => {
    tipRadio.checked = false;
  });
}

// reset the entire form and totals
function reset() {
  form.reset();

  tipAmount.innerText = 0.0;
  totalAmount.innerText = 0.0;
}

function checkInputErrors(node) {
  /**
   * @params text input
   * @return boolean
   * check if text inputs are:
   * 1. empty
   * 2. a number
   * 3. not zero
   * add error classes and display styling as needed
   */
  const errorType = {
    empty: "Can't be empty",
    isZero: "Can't be zero",
    notNum: "Must be a number",
  };

  let errorsExist = false;
  const errorLabel = node.nextElementSibling;

  if (node.value === "") {
    errorLabel.innerText = errorType.empty;
    errorLabel.style.display = "block";
    node.classList.add("error--border");
    errorsExist = true;
    return errorsExist;
  }

  if (!/^\d+$/.test(node.value)) {
    errorLabel.innerText = errorType.notNum;
    errorLabel.style.display = "block";
    node.classList.add("error--border");
    errorsExist = true;
    return errorsExist;
  }

  if (node.value == 0) {
    errorLabel.innerText = errorType.isZero;
    errorLabel.style.display = "block";
    node.classList.add("error--border");
    errorsExist = true;
    return errorsExist;
  }

  errorsExist && node.classList.add("error--border");

  return errorsExist;
}

function checkRadioErrors(radios, custom) {
  /**
   * @params preset tip radio buttons, custom tip input
   * @return boolean
   * 1. check if any radio buttons are selected and if custom tip is empty. if so signal error
   * 2. check if any radio buttons are selected and if custom tip is a number. if not, signal error
   */
  let errorsExist = false;
  let isChecked = [...radios].filter(radio => radio.checked);
  const errorLabel = custom.nextElementSibling;

  if (isChecked.length === 0 && custom.value === "") {
    errorsExist = true;
    errorLabel.innerText = "Select a percentage";
    errorLabel.style.display = "block";

    return errorsExist;
  }

  if (isChecked.length === 0 && !/^\d+$/.test(custom.value)) {
    errorsExist = true;
    errorLabel.innerText = "Must be a number";
    errorLabel.style.display = "block";
    custom.classList.add("error--border");
    return errorsExist;
  }

  return errorsExist;
}

function removeErrorStyling() {
  this.classList.remove("error--border");
  this.nextElementSibling.style.display = "none";
}
