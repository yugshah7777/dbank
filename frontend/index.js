import { backend } from "../src/declarations/backend";

window.addEventListener("load", async function() {
  // console.log("Finished Loading");
  const currentAmount = await backend.checkBalance();
  document.getElementById("value").innerText = Math.round(currentAmount * 100)/100;
});

document.querySelector("form").addEventListener("submit", async function(event) {
  event.preventDefault();
  // console.log("Submitted.");

  const button = event.target.querySelector("#submit-btn");

  const inputAmt = parseFloat(document.getElementById("input-amount").value);
  const outputAmt = parseFloat(document.getElementById("withdrawal-amount").value);

  button.setAttribute("disabled", true);

  if(document.getElementById("input-amount").value.length != 0) {
    await backend.topUp(inputAmt); 
  }
  if(document.getElementById("withdrawal-amount").value.length != 0) {
    await backend.withdraw(outputAmt); 
  }

  await backend.compound();

  const currentAmount = await backend.checkBalance();
  document.getElementById("value").innerText = Math.round(currentAmount * 100)/100;

  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";
  button.removeAttribute("disabled");
})