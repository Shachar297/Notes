// selectors -------->

let addButton = document.getElementById("addButton");
let userInput = document.getElementById("userInput");
let timeInput = document.getElementById("timeInput");
let dateInput = document.getElementById("dateInput");
let notesContainer = document.getElementById("notesContainer");
let h4_guide = document.getElementById("H4-guide");
let errorsP = document.getElementById("errors");

// Event Listeners ---------->

addButton.addEventListener("click", addNewNote);
notesContainer.addEventListener("click", removeNote);

// timeout function ---->

    setTimeout(initH4, 5000);
    setTimeout(initErrors, 2500);
    setTimeout(initBorders, 2500);

   

// ------------ start ----->
let currentDay = new Date();
// global scoped variables --->
let noteContent;
let notes = [];
let counter = notes.length;

getFromLocalStorage(); // -> get content from local storage and display it on window load (if filled before). <-

// main function to display and control user usage of page -->
function addNewNote() {
    
    try {
        // validate for user inputs correctly usage ->
        validateUserInput();
        validateDateInput();
        validateTimeInput();
        validateYears();
        
        
        // validateForDoubleNotesField();
    } catch (e) {
        displayErrorToUser(e);  
              // display errors if happend. <-
       console.error(e);
        return;                         // STOP FUNCTION IF ^ TERMS ABOVE HAPPENS
    }
    counter++;
          // setting an object to control variable into a note. --- > NOTE CONTENT <-
    noteContent = {
        taskParagraph: userInput.value,
        taskDeadLine: dateInput.value + "<br>" + timeInput.value,
        timeWritten: "written on " + currentDay.getHours() + ":" + currentDay.getMinutes() + ":" + currentDay.getFullYear(),
        counter: counter
       
    };
    // pushing the content into an array (using specialy for the local storage)

    notes.push(noteContent);

// ----- functions controling what happends if got so far.
    initBorders();                  // initialize inputs borders
    createNewNote();            // draw the new note on DOM
    saveToLocalStorage();           // save the current note content to local storage
    clearNoteFields();              // every "ADD NOTE" click, clear all fields.
    spacingTheWrittenParagraph();
}

function saveToLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

// ------> function controlling on taking the content from the local storage. ------>

function getFromLocalStorage() {
    validateForDoubleNotesField();
    if (localStorage.getItem("notes") != null) {

        notes = JSON.parse(localStorage.getItem("notes"));
        for (let index = 0; index < notes.length; index++) {
            noteContent = notes[index];
            createNewNote();
        }
    }
    }



// -------> function controling on removing from local storage while removing an OBJ from DOM

function removeFromLocalStorage(id) {
    for (let index = 0; index < notes.length; index++) {
        if (id == notes[index].counter) {
            notes.splice(index, 1);
            localStorage.setItem("notes", JSON.stringify(notes));
            return;
        }
    }
}
// ---------> checking if user adding a note that already been written.

function validateForDoubleNotesField(){

    for(let i = 0; i < notes.length; i++){
        if(notes[i].taskParagraph == noteContent.taskParagraph){
return false;
        }
        return true;
    }
   
}
console.log(validateForDoubleNotesField);
// function cotroling on adding a new elements on DOM, (DIV, MAIN P, P, H4, BUTTON) ---->

function createNewNote() {

// add a new div to DOM --- >

    let currentNote = document.createElement("div");
    currentNote.id = noteContent.counter;
    currentNote.classList.add("currentNote");
    notesContainer.appendChild(currentNote);

    // adding main paragraph to new note
    let pFromUserInput = createParToNote();
    currentNote.appendChild(pFromUserInput);
    // adding time and date p to new note
    let dateAndTime = createParToTimeAndDate();
    currentNote.appendChild(dateAndTime);
    // adding header to new note
    let headerNote = createHeaderToNewNote();
    currentNote.appendChild(headerNote);
    // adding delete button to new note.
    let deleteBtn = createDeleteButtonToNote();
    currentNote.appendChild(deleteBtn);

    let writtenOn = createParForTimeNoteWritten();
    currentNote.appendChild(writtenOn);
}




// functions creating elements in DOM, callback to -> createNewNote() ->

/// ----> paragraph (main)
function createParToNote() {
    let p = document.createElement("p");
    p.innerHTML = noteContent.taskParagraph;
    p.id = "newParNote";
    p.classList.add = "newParNote";


    return p;

}



// -------> create new header for user name -->


//------> paragraph (for time and date)
function createParToTimeAndDate() {
    let dateAndTimeP = document.createElement("p");
    dateAndTimeP.innerHTML = noteContent.taskDeadLine;
    dateAndTimeP.id = "dateAndTimeNote";
    dateAndTimeP.classList.add = "dateAndTimeNote";
    return dateAndTimeP;

}

function createParForTimeNoteWritten() {
    let writtenDate = document.createElement("p");
    writtenDate.innerHTML = noteContent.timeWritten;
    writtenDate.id = "writtenDate";
    writtenDate.classList.add = "writtenDate";
    return writtenDate;

}
// header.
function createHeaderToNewNote() {

    let header = document.createElement("h4");
    header.innerHTML = "Note. " + noteContent.counter
    header.id = "noteHeader";
    header.classList.add("noteHeader");

    return header;
}


// ----------> delete button. ->
function createDeleteButtonToNote() {
    let deleteButton = document.createElement("button");
    deleteButton.classList.add = "deleteButton";
    deleteButton.className = "deleteButton";
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.id = "deleteButton";

    return deleteButton;

}
// <--------- end

// function to control a callback to click event, removing a specific note from the DOM (and from the local storage).

function removeNote(e) {
    let currentNote = e.target;
    let parent = currentNote.parentElement;
    if (currentNote.classList[0] === "deleteButton") {
        removeFromLocalStorage(parent.id);
        
        parent.remove(e);
       
    }
   
   
}

// ------ functions to control validation to user inputs (main, time and date) ---->

function validateUserInput() {
    if (userInput.value == "") {
        userInput.style.border = "solid red 1px";
        setTimeout(initErrors, 2500);
        setTimeout(initBorders, 2500);
        throw new Error("Note can not remain empty .");
    }
}

function validateTimeInput() {
    if (timeInput.value == "") {
        timeInput.style.border = "solid red 1px";
        setTimeout(initErrors, 2500);
        setTimeout(initBorders, 2500);
        throw new Error("Please select a dead-line");
    }
}

function validateDateInput() {
    
    if (dateInput.value == "") {
        dateInput.style.border = "solid red 1px";
        setTimeout(initErrors, 2500);
        setTimeout(initBorders, 2500);
        throw new Error("Please select a dead-line");
    }
    if(dateInput.value.length > 12){
       
        dateInput.style.border = "solid red 1px";
        setTimeout(initErrors, 2500);
        setTimeout(initBorders, 2500);
        throw new Error("we are not that far by years...");
    }

  
    }

    // function checking if year that user inputs is future time (2020 and above...) ->
function validateYears(){
    let thisYear = currentDay.getFullYear();
    let newAr = [];


let year = dateInput.value;
let onlyYear = year.split("-");

newAr.push(onlyYear);
for(let i = 0; i<newAr.length; i++){
    newAr[i] = parseInt(newAr[i]);
}

if(thisYear >newAr[0] ){
    setTimeout(initErrors, 2500);
    setTimeout(initBorders, 2500);
    throw new Error("Note Must be saved for future time ");
             }
        }


// ----------> validating for length of the P no the cross the border.
function spacingTheWrittenParagraph(){
    let arrayOfWords = [];
   

    if(userInput.value.length > 100){
       let newPar = noteContent.taskParagraph.split(noteContent.counter);
      
arrayOfWords.push(newPar);
for(let i = 0; i<arrayOfWords.length; i++){
    let space = arrayOfWords[i].indexOf(" ");
    if(space == 2){
        space = "<br>";
        
    }
}
    }
   
}


// <----------- end

// function controling on initialization elements in DOM ---->

function clearNoteFields() {
    userInput.value = "";
    timeInput.value = "";
    dateInput.value = "";
}

function initBorders() {
    userInput.style.borderColor = "black";
    timeInput.style.borderColor = "black";
    dateInput.style.borderColor = "black";
}



function initErrors() {
    errorsP.innerHTML = "";
    errorsP.style.border = "none";
}

function initH4() {
    h4_guide.innerHTML = "";
    h4_guide.style.border = "none";

}



// <----------- end

// -------> function displaying errors to user ->
function displayErrorToUser(e) {
    errorsP.innerHTML = e;
    errorsP.style.border = "solid black 1px";
}

// function displayDoubleNoteError(){
//     errorsP.innerHTML = "this current note already exsited.";
//     errorsP.style.border = "solid black 1px";
//     userInput.style.border = "solid red 1px";
//     timeInput.style.border = "solid red 1px";
//     dateInput.style.border = "solid red 1px";
// }

// ----function callbacking to window load, guidding user for his convenience, to fill all inputs --->

function guideUser() {
    h4_guide.innerHTML = "For your convenience, before submiting note, please be sure to fill all fields below. <br> thank you !";
    
    // h4_guide.style.backgroundColor = "black";
    h4_guide.style.color = "black";

}

function cleanPage(){
   let askUser = window.confirm("are you sure you want to clean page and remove all notes ?");
   if(askUser == true){
    for (let index = 0; index < notes.length; index++) {
     
           localStorage.removeItem("notes");
           location.reload();
        }
            
        }else{
            return;
        }
    
    
}

function disableScrollUpBtn(){
    if(notes.length == 0){
    let displayBottom = document.getElementById("displayBottom");
    displayBottom.disabled = true;
}
}

function getDay(){

//.toTimeString().slice(0,8
let hours = currentDay.getHours();
let minutes = currentDay.getMinutes();
let seconds = currentDay.getSeconds();
seconds--;
if(seconds == 0){
    minutes--;
    if(minutes == 0){
hours--;
    }
}

let thisDay = document.getElementById("thisDay").innerHTML = hours + ":" + minutes + ":"+ seconds;

}

setInterval(getDay(1000));
getDay();
// <------------ end
