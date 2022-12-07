//http://localhost/index.php/%20app.use(%22/static%22,%20express.static('./static/'));

const clock = document.getElementById("timerClock");
const listOfTimes = document.getElementById("listOfTimes")
// var avg = average
var sec = 0;
var myInterval; 
var myTimeout;
var spaceClicks = 1;
var keydown = 1
var currentTime; //Timer value
var currentTimesArray = [];
var timesInserted = 0;

var timeTable = []; //[Solve, Time, Avg5, Avg12]

correctCurrentTimesArrayValues() // MySQL data into js array
generateScramble(); //generates scramble
createTimeTable(); //Push times and averages to their arrays
getLowestAverage(); //Find lowest x amount of times i a row from Array
timeListPannelInnerHTML(); //Display time list innerHTML
averagePannelInnerHTML(); //Display averages innerHTML

function correctCurrentTimesArrayValues() {// MySQL data into js array
    for (i = 0; i < databaseTimeList.length; i++){
        currentTimesArray.push(+databaseTimeList[i].time)
    }
}
function insertDB(){
    //document.forms.saveTime.time.value = currentTime //set form value to current time
}
function generateScramble() {
    var move; //includes face to turn and how to turn it. Ex. 2F
    var face; //Face to turn. Either R, L, F, B, U, or D
    var faceNum; //1-6, corresponds to face R-D
    var lastFaceNum = 10; //The face of the previous turn
    var turn; //How to turn a face. Either ', 2, or nothing.
    var scramble = ""; //inlucdes 20 moves
    var output = document.getElementById("scramble");
    for (var x = 0; x < 20; x++) {
        do {
            faceNum = Math.floor(Math.random() * 6) + 1;
        } while (faceNum === lastFaceNum); //the same face can't appear in consecutive moves.
        lastFaceNum = faceNum;
        if (faceNum === 1) {
            face = "R";
        }
        if (faceNum === 2) {
            face = "L";
        }
        if (faceNum === 3) {
            face = "U";
        }
        if (faceNum === 4) {
            face = "D";
        }
        if (faceNum === 5) {
            face = "F";
        }
        if (faceNum === 6) {
            face = "B";
        }
        turn = Math.floor(Math.random() * 3) + 1;
        if (turn === 1) {
            move = face;
        }
        if (turn === 2) {
            move = face + "2";
        }
        if (turn === 3) {
            move = face + "'";
        }
        scramble += move + " ";
    }
    output.innerHTML = scramble;
}
const secCounter = () => { //Interval function
    sec++;
    clock.innerHTML = (sec / 100).toFixed(2);
} 
var addClick = () => { //Timeout function
    clock.innerHTML = "0.00";
    spaceClicks = 2;   
} 
function plainAverage(x){ //Calculate average of X
    var averageSum = 0;
    for (var i = 1; i <= x; i++){ //Create list from latest times
        averageSum += +currentTimesArray[currentTimesArray.length-i];
    }
    return (averageSum / x).toFixed(2);
} 
//Calculate avg from array
function calculateArrayAvg(myArray){
    var myArrayMedian = [];
    var averageSum = 0;
    fivePercent = myArray.length * 0.05;
    myArray.sort((a,b)=>a-b); //Sort
    //Remove higest and lowest time
    for (var i = 0; i < fivePercent; i++){ 
        myArrayMedian = myArray.slice(1, -1);
    }
    //Create sum of times in our current list
    for (var i = 0; i < myArrayMedian.length; i++){
        averageSum += +myArrayMedian[i];
    }
    //Only return when all times are completed / not undefined in array
    if (myArray.includes(undefined) === false){
        return (averageSum / myArrayMedian.length).toFixed(2);
    }
}
function  insertAvgToTimeTable(x){ //Calculate average of X without highet and lowest 5%
    var startIndex = 0;
    
    for (var n = (x-1); n < currentTimesArray.length; n++){
        var timesInAverage = [];
        for (var i=0; i < x; i++){ //Create list from latest times
            timesInAverage.push(currentTimesArray[startIndex]);
            startIndex++
        }
        startIndex -= (x-1)
        if (currentTimesArray.length >= x && timesInAverage.length == 5){
            timeTable[n][2] = calculateArrayAvg(timesInAverage);
        }else if(currentTimesArray.length >= x && timesInAverage.length == 12){
            timeTable[n][3] = calculateArrayAvg(timesInAverage); 
        }
    }
} 
function getAverageOfXLatestTimes(x){ //Calculate average of X without highet and lowest 5%
    var timesInAverage = [];
    for (var i = 1; i <= x; i++){ //Create list from latest times
        timesInAverage.push(currentTimesArray[currentTimesArray.length-i]);
    }
    return calculateArrayAvg(timesInAverage);
} 

function getLowestAverage(){ //Find lowest x amount of times i a row from Array
    currentTimesArrayLowest = Math.min(...currentTimesArray).toFixed(2);
} 

function createTimeTable(){ //Push times and averages to their arrays
    var currentTimesArrayRow = [];
    timeTable = [];
    if (timesInserted > 0){
        currentTimesArray.push(Number(currentTime));
    }
    timesInserted++
    document.getElementById("timeTable").innerHTML = null;
    for (i=0; i<currentTimesArray.length; i++){

        currentTimesArrayRow = [i+1, currentTimesArray[i], "-", "-"];
        timeTable.push(currentTimesArrayRow);
    }
    insertAvgToTimeTable(5);
    insertAvgToTimeTable(12);
    for (i=0; i<currentTimesArray.length; i++){
        document.getElementById("timeTable").innerHTML += "<tr>" + timeTable[i] + "</tr>"
    }
} 

//Pushing times + avg to html
function averagePannelInnerHTML(){ //Display averages innerHTML
    document.getElementById("currentTime").innerHTML = currentTimesArray[currentTimesArray.length-1];
    if(currentTimesArray.length >= 5) document.getElementById("averageOf5").innerHTML = getAverageOfXLatestTimes(5);
    if(currentTimesArray.length >= 12) document.getElementById("averageOf12").innerHTML = getAverageOfXLatestTimes(12);
    if(currentTimesArray.length >= 100) document.getElementById("averageOf100").innerHTML = getAverageOfXLatestTimes(100);
    document.getElementById("bestTime").innerHTML = currentTimesArrayLowest;
}

function timeListPannelInnerHTML(){ //Display time list innerHTML
    document.getElementById("timePannelHeader").innerHTML = "Solve: " + (currentTimesArray.length) + "<br>" + "Mean: " + plainAverage(currentTimesArray.length);
    
}

  
document.addEventListener('keydown', (spaceDown) => { //Spacebar down
    if(spaceDown.code === 'Space' && spaceClicks == 1 && keydown == 1){ //Starting timer
        myTimeout = setTimeout(addClick, 10); 
    }else  if(spaceDown.code === 'Space' && spaceClicks == 3){ //Stopping timer
        clearInterval(myInterval);
        spaceClicks++;
        currentTime = clock.innerHTML;
        generateScramble();
        createTimeTable(); //Push times and averages to their arrays
        getLowestAverage(); //Find lowest x amount of times i a row from Array
        timeListPannelInnerHTML(); //Display time list innerHTML
        averagePannelInnerHTML(); //Display averages innerHTML

        insertDB()

    }keydown++
}); 


document.addEventListener('keyup', (spaceUp) => { //Spacebar up
    if(spaceUp.code === 'Space' && spaceClicks == 1){
        clearTimeout(myTimeout);
    }

    if(spaceUp.code === 'Space' && spaceClicks == 2){ //Starting timer
        myInterval = setInterval(secCounter, 10);
        spaceClicks++
    }else if(spaceUp.code === 'Space' && spaceClicks == 4){ //Stopping Timer
        sec = 0;
        spaceClicks = 1; 
    } keydown = 1;
}); 

document.addEventListener('keyup', function (event) { //Alt + Z Delete last time
    if (event.key == "z" && event.altKey){
        console.log("Alt + Z pressed!")

        currentTimesArray.pop();
        timeListPannelInnerHTML()
    }
}) 