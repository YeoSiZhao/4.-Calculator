let toCalculateHTML = "";
let string = "";
let previousResultExist = false;
let enterPrev = false;
let prevResult;

let array = []; // ["3", "+", "2"]
let values = []; // [3,2]
let ops = []; // ["+"]

const answer = document.querySelector(".js-answer");
const equation = document.querySelector(".js-equation");

document.querySelectorAll(".button").forEach((btn) => {
    btn.addEventListener('click', () => {
        const value = btn.dataset.value;
        toCalculateHTML += value;
        if (previousResultExist && isNaN(value)){
            array.push(Number(prevResult));
            equation.innerHTML = prevResult;
            previousResultBool = false;
            enterPrev = true;
        }
        previousResultExist = false;
        if(!isNaN(value) || value == ".") //is a number
        {
            string += value;
        }
        else // not a number
        {
            if (string != "")
            {
                array.push(string);
            }
            array.push(value);
            string = "";
        }
        for (let index = 0; index < array.length; index += 1)
        {   
            if (isNaN(array[index]) && (index + 1 < array.length && isNaN(array[index + 1]))) 
            {
                handleError();
                return;
            }
        }
        answer.innerHTML = toCalculateHTML;
    });
});

document.querySelector(".equals").addEventListener('click',() => {
    if (string != "")
    {
        array.push(string);
    }
    if (isNaN(array[array.length-1]))
    {
        handleError();
        return;
    }
    console.log(array);

    let result = calculate();
    if (result % 1 != 0)
    {
            result = result.toFixed(2);
    }
    array = [];
    previousResultExist = true;
    prevResult = result;
    if (enterPrev) {
        equation.innerHTML = prevResult.toString() + toCalculateHTML;
    }
    else 
    {
        equation.innerHTML = toCalculateHTML;
    }
    answer.innerHTML = result
    enterPrev = false;
    toCalculateHTML = "";
    string = "";

    values = [];
    ops = [];
});

document.querySelector(".clear").addEventListener('click', () => {
    answer.innerHTML = "0";
    clear();
});

const operators = {
    "+": function(a,b) {return a+b;},
    "-": function(a,b) {return a-b;},
    "/": function(a,b) {return a/b;},
    "*": function(a,b) {return a*b;}
};

function calculate() {
    array.forEach((thing) => {
        if (!isNaN(thing)) // a number 
        {
            values.push(parseFloat(thing));
            if (ops[ops.length-1] === "*" || ops[ops.length-1] === "/")
            {
                values.push(evaluate());
            }
        }
        else 
        {  
            ops.push(thing);
        }
    });

    while (values.length != 1)
    {
        values.push(evaluate());
    }
    return values[0];
}

function evaluate() {
    const b = values.pop();
    const a = values.pop();
    const op = ops.pop();
    return operators[op](a,b);
}

function handleError()
{
    answer.innerHTML = "Error";
    clear();
}

function clear(){
    equation.innerHTML = "";
    toCalculateHTML = "";
    previousResultExist = false;
    enterPrev = false;
    prevResult = "";
    string = "";
    array = [];
    values = [];
    ops = [];
}