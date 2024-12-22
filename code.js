let toCalculateHTML = "";
let string = "";
let previousResult = false;
let enterPrev = false;
let prevResult;

let array = [];
let values = [];
let ops = [];

const answer = document.querySelector(".js-answer");
const equation = document.querySelector(".js-equation");

document.querySelectorAll(".button").forEach((btn) => {
    btn.addEventListener('click', () => {
        const value = btn.dataset.value;
        toCalculateHTML += value;
        if (previousResult && isNaN(value)){
            console.log(array);
            prevResult = localStorage.getItem("previous-result");
            array.push(Number(prevResult));
            console.log(array);
            equation.innerHTML = prevResult;
            previousResult = false;
            enterPrev = true;
        }
        previousResult = false;
        if(!isNaN(value) || value == ".") //is a number
        {
            string += value;
        }
        else // not is a number
        {
            if (string != "")
            {
                array.push(string);
            }
            array.push(value);
            string = "";
        }
        answer.innerHTML = toCalculateHTML;
    });
});

document.querySelector(".equals").addEventListener('click',() => {
    if (string != "")
    {
        array.push(string);
    }

    const result = calculate();
    array = [];
    previousResult = true;
    localStorage.setItem("previous-result",result.toString());
    if (enterPrev) {
        equation.innerHTML = prevResult.toString() + toCalculateHTML;
    }
    else 
    {
        equation.innerHTML = toCalculateHTML;
    }
    answer.innerHTML = result;
    enterPrev = false;
    toCalculateHTML = "";
    string = "";

    values = [];
    ops = [];
});

document.querySelector(".clear").addEventListener('click', () => {
    answer.innerHTML = "0";
    equation.innerHTML = "";
    toCalculateHTML = "";
    previousResult = false;
    localStorage.setItem("previous-result","");
    string = "";
    array = [];
    values = [];
    ops = [];
});

const operators = {
    "+": function(a,b) {return a+b;},
    "-": function(a,b) {return a-b;},
    "/": function(a,b) {return a/b;},
    "*": function(a,b) {return a*b;}
};

function calculate() {
    console.log(array);
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