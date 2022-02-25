const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numberEl = document.getElementById('number');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');
const symbolEl = document.getElementById('symbol');

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbols,
}

generateEl.addEventListener('click',()=>{
    const length = +lengthEl.value
    const hasLower = lowercaseEl.checked
    const hasUpper = uppercaseEl.checked
    const hasNumber = numberEl.checked
    
    const hasSymbol = symbolEl.checked

    resultEl.innerText = generatePassword(hasLower,hasUpper,hasNumber,hasSymbol,length)
})

function generatePassword(lower,upper,number,symbol,length){
 let pass = ''
 const typesCount = lower+upper+number+symbol
 const typesArr =[{lower},{upper},{number},{symbol}].filter(item=>Object.values(item)[0])
 if(typesCount === 0){
     return ''
 }

 for(let i=0;i<length;i+=typesCount){
     typesArr.forEach(type=>{
         const funcName = Object.keys(type)[0]
         pass +=randomFunc[funcName]()
     })
 }

  const finalPassword = pass.slice(0, length)
   return finalPassword
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
