const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
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
    let total = 0;
    let char = '';
    if(!numberChecker(exp[0]) || hasLetters(exp)){
        return `Enter a valid expression please`;
    }
    for(let i=0; i<exp.length; i++){
        console.log('In parseLoop', i, total);
        let h = i-1;
        console.log('h',h);
        let num = parseFloat(exp[i]);
        let numType = numberChecker(num);
        console.log('num',num,'numtype', numType);
        if(i === 0 && numType){
            console.log('in first index');
            total = num;
        }else if(numType && isNaN(exp[h]) && i != 0){
            console.log('in operators');
            char = exp[h];
            if(char === '*'){
                total *= num;
            }else if(char === '/'){
                total /= num;
            }else if(char === '+'){
                total += num;
            }else if(char === '-'){
                total -= num;
            }
        }else if(isNaN(exp[i])){
            console.log('continue');
        }
    }
    console.log('this is the total after evaluation:', total);
    let result = total.toString();
    let resultExpression = resultExp(expressions)
    let resultButton = `<button id="${resultExpression}"onclick="runExp(this.id)">${resultExpression} = ${result}</button><br>`
    storedExp.push(resultButton);
    return resultButton
}
function numberChecker(num){
    return !isNaN(num);
}
function hasLetters(string){
    let letters = false;
    for(let i=0; i<string.length;  i++){
        console.log('checkin letters on:', string);
        if(64<string[i].charCodeAt(0) && string[i].charCodeAt(0)<91 || 96<string[i].charCodeAt(0) && string[i].charCodeAt(0)<123){
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
        if((num != NaN || array[i] === '.')&& array[i] != '*' && array[i] != '/' && array[i] != '+' && array[i] != '-'){
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