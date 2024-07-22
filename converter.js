const baseUrl = "https://2024-03-06.currency-api.pages.dev/v1/currencies";
let dropdown = document.querySelectorAll("#dropdown select");
let btn = document.querySelector("form button");
let fromCurrCode = document.querySelector("#from select");
let toCurrCode = document.querySelector("#to select");
let msg = document.querySelector("#msg");

dropdown.forEach((el) => {
  for (let key in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = key;
    newOption.value = key;
    if (el.name === "from" && key === "USD") {
      newOption.selected = "selected";
    } else if (el.name === "to" && key === "INR") {
      newOption.selected = "selected";
    }
    el.append(newOption);
  }
  el.addEventListener("click", (evnt) => {
    updateFlag(evnt.target);
  });
});
let updateFlag = (evnt) => {
  let code = evnt.value;
  let countryCode = countryList[code];
  let img = evnt.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

btn.addEventListener("click", (event) => {
  event.preventDefault();
  updateExchangeRate();
});
let updateExchangeRate = async () => {
  let amount = document.querySelector("#amount input");
  let amountValue = amount.value;
  if (amountValue == "" || amountValue < 1) {
    amount.value = "1";
    amountValue = 1;
  }
  let URL = `${baseUrl}/${fromCurrCode.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let fromCurrencyValue = fromCurrCode.value.toLowerCase();
  let toCurrencyValue = toCurrCode.value.toLowerCase();
  let fromValue = data[fromCurrencyValue];
  let toValue = fromValue[toCurrencyValue];

  let finalAmount = amount.value * toValue;
  msg.innerText = `${amountValue} ${fromCurrCode.value} = ${finalAmount} ${toCurrCode.value}`;
};

let interchangeBtn = document.querySelector("#i");
interchangeBtn.addEventListener("click", () => {
  let temp = fromCurrCode.value;
  fromCurrCode.value = toCurrCode.value;
  toCurrCode.value = temp;

  updateFlag(fromCurrCode);
  updateFlag(toCurrCode);

  updateExchangeRate();
});
