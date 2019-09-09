for(let i=0; i<exp.length; i++){
    console.log('In parseLoop', i, total);
    let h = i-1;
    let j = i+1;
    let leftNum = null;
    console.log('This is the leftNum:', leftNum);
    console.log('h',h);
    let num = parseFloat(exp[i]);
    let numType = numberChecker(num);
    console.log('num',num,'numtype', numType);
    if(exp[i] === '*'){
        if(leftNum === null){
            leftNum = exp[h] * exp[j];
        }else if(leftNum !=== null){
            leftNum *= exp[j];
        }
    }else if(exp[i] === '/'){
        if(leftNum === null){
            leftNum = exp[h] / exp[j];
        }else if(leftNum /=== null){
            leftNum /= exp[j];
        }
    }else if(exp[i] === '+'){
        if(leftNum === null){
            leftNum = exp[h] + exp[j];
        }else if(leftNum !=== null){
            leftNum += exp[j];
        }
    }else if(exp[i] === '-'){
        if(leftNum === null){
            leftNum = exp[h] - exp[j];
        }else if(leftNum !=== null){
            leftNum -= exp[j];
        }
    }else if(numpType){
        continue;
    }



    // existing expression evaluater
    // for(let i=0; i<exp.length; i++){
    //     console.log('In parseLoop', i, total);
    //     let h = i-1;
    //     console.log('h',h);
    //     let num = parseFloat(exp[i]);
    //     let numType = numberChecker(num);
    //     console.log('num',num,'numtype', numType);
    //     if(i === 0 && numType){
    //         console.log('in first index');
    //         total = num;
    //     }else if(numType && isNaN(exp[h]) && i != 0){
    //         console.log('in operators');
    //         char = exp[h];
    //         if(char === '*'){
    //             total *= num;
    //         }else if(char === '/'){
    //             total /= num;
    //         }else if(char === '+'){
    //             total += num;
    //         }else if(char === '-'){
    //             total -= num;
    //         }
    //     }else if(isNaN(exp[i])){
    //         console.log('continue');
    //     }
    // }