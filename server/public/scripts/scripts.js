$(document).ready(readyNow);
let expression = [];
function readyNow(){
    $('#oneBtn').on('click', function(){
        addValue(1);
    });
    $('#twoBtn').on('click', function(){
        addValue(2);
    });
    $('#threeBtn').on('click', function(){
        addValue(3);
    });
    $('#fourBtn').on('click', function(){
        addValue(4);
    });
    $('#fiveBtn').on('click', function(){
        addValue(5);
    });
    $('#sixBtn').on('click', function(){
        addValue(6);
    });
    $('#sevenBtn').on('click', function(){
        addValue(7);
    });
    $('#eightBtn').on('click', function(){
        addValue(8);
    });
    $('#nineBtn').on('click', function(){
        addValue(9);
    });
    $('#zeroBtn').on('click', function(){
        addValue(0);
    });
    $('#dotBtn').on('click', function(){
        addValue('.');
    });
    $('#plusBtn').on('click', function(){
        addValue('+');
    });
    $('#minusBtn').on('click', function(){
        addValue('-');
    });
    $('#multiplyBtn').on('click', function(){
        addValue('*');
    });
    $('#divideBtn').on('click', function(){
        addValue('/');
    });
    $('#evalBtn').on('click', evaluate);
    resultOfExpressions();
}
function addValue(value){
    expression .push(value);
    console.log(expression);
    $('#calcIn').val($('#calcIn').val() + value)
}
function evaluate(){
    $('#calcIn').val('');
    $.ajax({
        type: "POST",
        url: "/expression",
        data: {expression}
    }).then( function(response){
        console.log('This is the response from the server:', response);
    })
    $.ajax({
        type: 'GET',
        url: "/expression"
    }).then(function(response){
        console.log(response);
        $('#results').append(response)
        expression = [];
    })
}
function resultOfExpressions(){
    $.ajax({
        type: 'GET',
        url: "/fillexp"
    }).then(function(response){
        console.log(response);
        $('#results').append(response)
    })
}
function runExp(which){
    
}
