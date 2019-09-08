for(let i=0; i<exp.length; i++){
    if(i = 0){
        parseExp += exp[i].val;
    }else if(isNaN(exp[i].val)){
        char = exp[i].val
    }else if(typeof exp[i].val === 'number' && isNaN(exp[i-1].val)){
        if(char === '+'){
            parseExp += exp[i].val;
        }else if(char === '-'){
            parseExp -= exp[i].val;
        }else if(char === '*'){
            parseExp *= exp[i].val;
        }else if(char === '/'){
            parseExp /= exp[i].val;
        }else if(char === '.'){
            let string = parseExp.toString();
            string += exp[i].val;
            parseExp = parseFloat(string);
        }
    }else if(typeof exp[i].val === 'number' && typeof exp[i-1].val === 'number'){
        let string = parseExp.toString();
        string += exp[i].val;
        parseExp = parseFloat(string);
    }
}