/**
 * @author Mike T. <mikesbcmike@gmail.com>
 * @constant
 * @type {DOM SELECTION}
 * @default
 * @type {arrays}
 * @description: A Soduko puzzle I created with a FREE API off Rapid api I will link the creators in the repository
 */
const puzzle = document.querySelector('#puzzle');
const button = document.querySelector('button');
const difficulty = prompt("Enter Number a number beween 1 and 3 to select difficulty")
let numberArray = [];
let unsolvedArray;
let solvedArray;

/**
 * @forloop
 * @description: This will create 81 input squares and a mathematical equation that shades in the square 
 */
for(let i = 0; i < 81; i++){
    const input = document.createElement('input')
    input.setAttribute('type', 'number');
    input.setAttribute('min', 0)
    input.setAttribute('max', 9)
    if(
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
        ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && (i > 27 && i < 53)) ||
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)  
    )  {
        input.style.backgroundColor = '#e5e4e2'
    }
    puzzle.appendChild(input)
}

/**
 * @constructor
 * @functino {}
 * @description: An XMLHTTPREQUEST to utilize the API an input number values 
 */
function getPuzzle(){
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;


    xhr.onload = function(){
        if(this.status === 200){
            var user = JSON.parse(this.responseText);
            var unsolvedPuzzle = user["response"]["unsolved-sudoku"]
            var solvedPuzzle = user["response"]["solution"]
        
            unsolvedArray= [].concat(unsolvedPuzzle[0], unsolvedPuzzle[1],unsolvedPuzzle[2], 
            unsolvedPuzzle[3],unsolvedPuzzle[4],unsolvedPuzzle[5],
            unsolvedPuzzle[6],unsolvedPuzzle[7], unsolvedPuzzle[8]);
            
                
            solvedArray= [].concat( solvedPuzzle[0], solvedPuzzle[1],solvedPuzzle[2], 
            solvedPuzzle[3],solvedPuzzle[4],solvedPuzzle[5],
            solvedPuzzle[6],solvedPuzzle[7], solvedPuzzle[8]);
        
        /*Inputs unsolved puzzle */
        for(let i = 0; i< unsolvedArray.length; i++){
            const inputs = document.querySelectorAll("input")[i]
            
            inputs.value = unsolvedArray[i].toString().replace("0", "")            
            }

            /*Inputs solved puzzle qhen solved button is clicked  */
            button.addEventListener('click', ()=>{
                for(let i = 0; i< solvedArray.length; i++){
                    const inputs = document.querySelectorAll("input")[i]
                    
                    inputs.value = solvedArray[i]
                    
                    }
            })

        }
    }

    xhr.open("GET", `https://sudoku-board.p.rapidapi.com/new-board?diff=${+difficulty}&stype=list&solu=true`);
    xhr.setRequestHeader("x-rapidapi-host", "sudoku-board.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "13f69135b2msh658acea140bd912p12e773jsn94dd3bcd5afe");

    xhr.send(data);
}
/**
 * @constructor
 * @funtion getPuzzle()
 */
getPuzzle()