const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.listen(PORT, () => {
    console.log(`PORT: ${PORT}`);
});

let expressions = [];
let storedExp = [];
app.post('/expression', (req,res) => {
    let expIn = req.body;
    arrayMaker(expIn.expression);
    console.log('stored',storedExp);
    console.log('this is req.body',expIn);
    console.log('This is the array in req.body:', expIn.expression)
    console.log('This is the array we made',expressions);
    res.send('Received Expression');
})
app.get('/expression', (req,res) => {
    res.send(expressionParse(expressions));
    expressions = [];
})
app.get('/fillexp', (req,res) => {
    let response = ''
    for(let i=0; i<storedExp.length; i++){
        response += storedExp[i];
    }
    res.send(response);
})
app.delete('/deleteHistory', (req,res) => {
    res.send('history of expressions was deleted');
    storedExp = [];
    console.log('storedExp:',storedExp,'history cleared');
})


function expressionParse(exp){
    console.log(exp);
    if(!numberChecker(exp[0]) || hasLetters(exp)){
        return `Enter a valid expression please`;
    }
    let result = evaluator(exp);
    console.log('this is the total after evaluation:', result[0]);
    let resultExpression = resultExp(expressions);
    let resultButton = `<div class="output" style="border: 2px solid black;"><p class="result">${result[0]}</p><button id="${resultExpression}" onclick="runExp(this.id)">${resultExpression}</button></div><br>`
    storedExp.push(resultButton);
    return resultButton
}
function numberChecker(num){
    return !isNaN(num);
}
function evaluator(exp){
    for(let i=0; i<exp.length; i++){
        if(exp[i] === '*' || exp[i] === '\/'){
            if(exp[i] === '*'){
                return multiplyIn(exp,i);
            }else if(exp[i] === '\/'){
                return divideIn(exp,i);
            }
        }
    }
    for(let i=0; i<exp.length; i++){
        if(exp[i] === '+' || exp[i] === '-'){
            if(exp[i] === '+'){
                return addIn(exp,i);
            }else if(exp[i] === '\/'){
                return minusIn(exp,i);
            }
        }
    }
    
}
function multiplyIn(expMult,index){
    console.log('in multIn');
    let n = index;
    let tempExp = [];
    for(let i=0; i<expMult.length; i++){
        tempExp.push(expMult[i]);
    }
    console.log('exp to be eval:', tempExp);
    let h = n-1;
    let j = n+1;
    let tempNum = parseFloat(tempExp[h]) * parseFloat(tempExp[j]);
    tempExp.splice(h,3,tempNum);
    console.log('exp after:', tempExp);
    for(let z=0; z<tempExp.length; z++){
        h = z-1;
        j = z+1;
        if(tempExp[z] === '\/'){
            tempExp = divideIn(tempExp,z);
        }else if(tempExp[z] === '+'){
            tempExp = addIn(tempExp,z);
        }else if(tempExp[z] === '-'){
            tempExp = minusIn(tempExp,z);
        }
    }
    console.log(tempExp,'after multiplyIn');
    return tempExp;
}
function divideIn(expDiv,index){
    console.log('in divIn');
    let n = index;
    let tempExp = [];
    for(let i=0; i<expDiv.length; i++){
        tempExp.push(expDiv[i]);
    }
    console.log('exp to be eval:', tempExp);
    let h = n-1;
    let j = n+1;
    let tempNum = parseFloat(tempExp[h]) / parseFloat(tempExp[j]);
    tempExp.splice(h,3,tempNum);
    for(let x=0; x<tempExp.length; x++){
        h = x-1;
        j = x+1;
        if(tempExp[x] === '*'){
            tempExp = multiplyIn(tempExp,x);
        }else if(tempExp[x] === '+'){
            tempExp = addIn(tempExp,x);
        }else if(tempExp[x] === '-'){
            tempExp = minusIn(tempExp,x);
        }
    }
    console.log(tempExp,'after divIn');
    return tempExp;
}
function addIn(expAdd,index){
    console.log('in addIn');
    let n = index;
    let tempExp = [];
    for(let i=0; i<expAdd.length; i++){
        tempExp.push(expAdd[i]);
    }
    console.log('exp to be eval:', tempExp);
    let h = n-1;
    let j = n+1;
    tempNum = parseFloat(tempExp[h]) + parseFloat(tempExp[j]);
    tempExp.splice(h,3,tempNum);
    for(let y=0; y<tempExp.length; y++){
        h = y-1;
        j = y+1;
        if(tempExp[y] === '-'){
            tempExp = minusIn(tempExp,y);
        }
    }
    console.log(tempExp,'after addIn');
    return tempExp;
}
function minusIn(expMin,index){
    console.log('in minusIn');
    let n = index;
    let tempExp = [];
    for(let i=0; i<expMin.length; i++){
        tempExp.push(expMin[i]);
    }
    console.log('exp to be eval:', tempExp);
    let h = n-1;
    let j = n+1;
    tempNum = parseFloat(tempExp[h]) - parseFloat(tempExp[j]);
    tempExp.splice(h,3,tempNum);
    for(let y=0; y<tempExp.length; y++){
        h = y-1;
        j = y+1;
        if(tempExp[y] === '+'){
            tempExp = addIn(tempExp,y);
        }
    }
    console.log(tempExp,'after minusIn');
    return tempExp;
}
function hasLetters(string){
    let letters = false;
    for(let i=0; i<string.length;  i++){
        console.log('checking letters on:', string[i]);
        if(string == '' || (64<string[i].charCodeAt(0) && string[i].charCodeAt(0)<91) || (96<string[i].charCodeAt(0) && string[i].charCodeAt(0)<123)){
            console.log(string[i].charCodeAt(0));
            letters = true;
        }
    }
    console.log('does it have letter?:', letters);
    return letters;
}
function resultExp(){
    let expression = '';
    for(let i=0; i<expressions.length; i++){
        expression += expressions[i];
    }
    return expression;
}
function arrayMaker(array){
    let numString = '';
    console.log('in arrayMaker:',array);
    for(let i=0; i<array.length; i++){
        let num = parseFloat(array[i]);
        console.log('this is the number', num);
        console.log('this is the array at i', array[i]);
        if((num != NaN || array[i] === '.')&& array[i] != '*' && array[i] != '\/' && array[i] != '+' && array[i] != '-'){
            numString += array[i];
            console.log('this is the numString:', numString);
        }else if(isNaN(array[i]) && i !=0){
            expressions.push(numString);
            numString = '';
            expressions.push(array[i]);
        }
    }
    expressions.push(numString);
}