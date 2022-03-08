const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');
const symbolEl = document.getElementById('symbol');

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbols,
};

if (!generateEl) {
  let msg = 'Element with id #generate not found';
  alert(msg);
  throw new Error(msg);
}
generateEl.addEventListener('click', () => {
  const length = +document.getElementById('length').value;
  const hasLower = document.getElementById('lowercase').checked;
  const hasUpper = document.getElementById('uppercase').checked;
  const hasNumber = document.getElementById('number').checked;

  const hasSymbol = symbolEl.checked;

  document.getElementById('result').innerText = makePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

function makePassword(
  lower = 0,
  upper = 0,
  number = 0,
  symbol = 0,
  length = 0
) {
  const password_property = 1;
  // let pass = '';

  const typesArr = Object.entries({ lower, upper, number, symbol }).filter(
    ([key, _type]) => _type
  );

  if (!typesArr.length) throw new Error('password options invalid');
  return new Array(length)
    .fill(null)
    .map((value, index) => {
      return randomFunc[
        Object.entries(typesArr)[index % (typesArr.length - 1)][
          password_property
        ][0]
      ]();
    })
    .join('');
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbols() {
  const symbols = '!@#$%^&*(){}[]';
  return symbols[Math.floor(Math.random() * symbols.length)];
}
