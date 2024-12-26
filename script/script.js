var displayElement = document.querySelector(".displaySpace");
var displayAmbientElement = document.querySelector(".displayAmbient");
var histDisplay = document.querySelector(".historyElement");
var empty = '';
var space = ' ';
var equalSymbol = '=';
var lineBreak = '<br>';
var negate = -1;
var operator = empty;
var prevNum = empty;
var currentNum = empty;
var zero = '0';
var equalflag=0;
var symbolflag=0;
let calculate = {
        '+': (prevNum,currentNum) => Number(prevNum) + Number(currentNum),
        '-': (prevNum,currentNum) => Number(prevNum) - Number(currentNum),
        '*': (prevNum,currentNum) => Number(prevNum) * Number(currentNum),
        '/': (prevNum,currentNum) => Number(prevNum) / Number(currentNum),
        '%': (prevNum,currentNum) => Number(prevNum) % Number(currentNum),

};
function getNumber(current){
        var currentVal = current.textContent.trim();
        if(equalflag==1){
            displayAmbientElement.textContent = empty;
            prevNum = empty;
            currentNum = empty;
            equalflag = 0;

    }
    (displayElement.textContent == zero || currentNum == empty) ? displayElement.textContent = currentVal : displayElement.append(currentVal);
    currentNum += currentVal;
    symbolflag=0;
}
function getSymbols(current){
        var currentSymbol = current.textContent.trim();
        if(symbolflag==1 || equalflag==1){operator = currentSymbol;}
    else{
            prevNum==empty ? null : pushToHistory(prevNum,operator,currentNum);
            prevNum = prevNum==empty ? currentNum : calculate[operator](prevNum,currentNum);
            currentNum = empty;
            operator = currentSymbol;
            displayElement.textContent = prevNum;

    }
    displayAmbientElement.textContent = prevNum + space + operator;
    equalflag=0;
    symbolflag=1;
}
function equal(){
        displayAmbientElement.append(space + currentNum + space + equalSymbol);
        pushToHistory(prevNum, operator, currentNum);
        prevNum = calculate[operator](prevNum,currentNum);
        displayElement.textContent = prevNum;
        currentNum=empty;
        operator=empty;
        equalflag=1;

}
function pushToHistory(prevNum, operator, currentNum){
        var result = calculate[operator](prevNum, currentNum);
        histDisplay.innerHTML += prevNum + space + operator + space + currentNum + space + equalSymbol + space + result + lineBreak;

}
function clearScreen(){
        displayElement.textContent = zero;
        displayAmbientElement.textContent = empty;
        histDisplay.textContent = empty;
        prevNum = empty;
        currentNum = empty;
        operator = empty;

}
function bkspc(){
        if(symbolflag==1){return}
    displayElement.lastChild.remove();
    displayElement.textContent==empty ? displayElement.textContent='0' : null;
    currentNum = displayElement.textContent;
}
function reciprocal(){
        var val = displayElement.textContent;
        displayAmbientElement.textContent = '1/'+val;
        val = 1/(Number(val));
        displayElement.textContent = val;
        prevNum = val;
        currentNum = empty;   

}
function square(){
        var val = displayElement.textContent;
        val = Number(val)*Number(val);
        displayElement.textContent = val;
        prevNum = val;
        currentNum = empty;

}
function sqrt(){
        var val = Number(displayElement.textContent);
        var guess = Number(val)/2;
        var result = findSqrt(val,guess);
        displayElement.textContent = result;
        prevNum = result;
        currentNum = empty;

}
function findSqrt(val,guess){
        var newGuess = (guess + val/guess)/2;
        return newGuess===guess ? newGuess : findSqrt(val,newGuess);

}
function plusOrminus(){
        var val = Number(displayElement.textContent)*(negate);
        displayElement.textContent = val
        currentNum = val;

}
function deleteHistory(){
        histDisplay.textContent = empty;

}
var modal = document.getElementById("myModal");
var btn = document.getElementById("historyBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function(){
      modal.classList.add("show");
      modal.classList.remove("hide");

}
function hideModal(){
        modal.classList.add("hide");
        modal.classList.remove("show");

}
span.onclick = function (){hideModal();}
window.onclick = function(event){if (event.target == modal){hideModal();}}