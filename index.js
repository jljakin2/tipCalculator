const form = document.querySelector("form");
const resetBtn = document.querySelector(".btn");

const billAmount = document.getElementById("bill-amount");
const customTip = document.getElementById("custom-tip");
const numOfPeople = document.getElementById("num-people");
const tipRadios = document.querySelectorAll(".tip__radio");

const tipAmount = document.getElementById("tip-amount");
const totalAmount = document.getElementById("total-amount");

window.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    // check for errors
    checkErrors();

    // find tip amount
    findTipAmount();
  }
});

resetBtn.addEventListener("click", reset);
customTip.addEventListener("click", removePresetTip);
tipRadios.forEach(tipRadio =>
  tipRadio.addEventListener("click", () => (customTip.value = ""))
);

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

function reset() {
  form.reset();

  tipAmount.innerText = 0.0;
  totalAmount.innerText = 0.0;
}

function checkErrors() {
  return;
}
