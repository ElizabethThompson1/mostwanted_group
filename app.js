"use strict";

//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region

// app is the function called to start the entire application
function app(people) {
  let searchType = promptFor(
    "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  let searchResults;
  switch (searchType) {
    case "yes":
      searchResults = searchByName(people);
      break;
    case "no":
      searchResult = searchByMultiCriteria(people);
      
       // else if (..... = "multiple"){ 
         // searchResults = searchByCriteria(people)

      break;
    default:
      app(people); // restart app
      break;
  }

  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people) {
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor(
    "Found " +
      person.firstName +
      " " +
      person.lastName +
      " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'",
    autoValid
  );

  switch (displayOption) {
    case "info":
      // TODO: get person's info
      break;
    case "family":
      // TODO: get person's family
      break;
    case "descendants":
      // TODO: get person's descendants
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);
  
  let foundPerson = people.filter(function (potentialMatch) {
    if (
      potentialMatch.firstName === firstName &&
      potentialMatch.lastName === lastName
    ) {
      return true;
    } else {
      return false;
    }
    
  });
  // TODO: find the person single person object using the name they entered.
  // return foundPerson;
    return foundPerson
}


//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people) {}

//TODO: add other trait filter functions here.

//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region

// alerts a list of people
function displayPeople(people) {
  alert(
    people
      .map(function (person) {
        return person.firstName + " " + person.lastName;
      })
      .join("\n")
  );
}

function displayPerson(person) {
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
}

//#endregion

//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid) {
  let isValid;
  let response
  do {
    response = prompt(question.trim());
    isValid = valid(response);
  } while (response === "" || isValid === false);
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input) {
  if (input.toLowerCase() == "yes" || input.toLowerCase() == "no") {
    return true;
  } else {
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input) {
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input) {}

//#endregion
function critieraVerification(){
  let whenComplete = false;
  while(whenComplete === false){
    let question = prompt("do you know anymore criteria? yes or no?", autoValid);
        if (question === "no"){ 
            whenComplete = true;   
         multiSearch(people)
         }  
        else {(question === "yes");
            return mainMenu(person,people)
      
    }
  }
}



function searchByCriteria(people) {
  let singleMulti=promptFor( "Do you know a single criteria, Yes or No",yesNo).toLowerCase();
  if (singleMulti==="yes") {
    let firstCriteria = promptFor("Enter single search criteria.", autoValid);
    let foundOnlyCriteria = people.filter(function(potentialMatch){
    if(potentialMatch.firstCriteria === firstCriteria){
        return true;}
    else {
        return false;}
    });
    return foundOnlyCriteria
    }
  else {
   return mainMenu(person, people)}
}

function searchByMultiCriteria(people) {
  let singleMulti = promptFor(
    "Do you know multiple traits, Yes or No", yesNo).toLowerCase();
    if (singleMulti === "yes"){
      multiSearch(people)}
    else; {
    searchByCriteria(people)
  }
}
 

function multiSearch(people){
  let multiQuestion = promptFor("what critiera would you like first? occupation,eye color,date of birth,gender,height,weight",autoValid).toLowerCase();
  switch(multiQuestion){
    case "occupation":
      occupationFunction(people)
    break;
    case "eye color":
      eyeColorFunction(people)
    break;
    case "date of birth":
      dateOfBirthFunction(people)
    break;
    case "gender":
      genderFunction(people)
    break;
    case "height":
      heightFunction(people)
    break;
    case "weight":
      weightFunction(people)
      break;
    default:
      multiQuestion
  }    
}

function occupationFunction(people){
  let occupationQuestion = promptFor("Enter Occupation",autoValid).toLowerCase();
  let foundOccupation =people.filter(function(potentialMatch){
    if (potentialMatch.occupationQuestion === occupationQuestion){
      return true;}
    else{
      return false;}
    });
    {
    return [foundOccupation,multiSearch(people)]
  };
}

function eyeColorFunction(people){
  let questionEyeColor = promptFor("Enter Eye Color",autoValid).toLowerCase();
  let foundEyeColor =people.filter(function(potentialMatch){
    if (potentialMatch.questionEyeColor === questionEyeColor){
      return true;}
    else{
      return false;}
    });
    {
    return [foundEyeColor,multiSearch(people)]
  };
}

function dateOfBirthFunction(people){
  let questionDateOfBirth = promptFor("Enter Date of Birth",autoValid).toLowerCase();
  let foundDateOfBirth =people.filter(function(potentialMatch){
    if (potentialMatch.questionDateOfBirth === questionDateOfBirth){
      return true;}
    else{
      return false;}
    });
    {
    return [foundDateOfBirth,multiSearch(people)]
  };
}

function genderFunction(people){
  let questionGender = promptFor("Enter Gender",autoValid).toLowerCase();
  let foundGender =people.filter(function(potentialMatch){
    if (potentialMatch.questionGender === questionGender){
      return true;}
    else{
      return false;}
    });
    {
    return [foundGender,multiSearch(people)]
  };
}

function heightFunction(people){
  let questionHeight= promptFor("Enter Height",autoValid).toLowerCase();
  let foundHeight =people.filter(function(potentialMatch){
    if (potentialMatch.questionHeight === questionHeight){
      return true;}
    else{
      return false;}
    });
    {
    return [foundHeight,multiSearch(people)]
  }; 
}

function weightFunction(people){
  let questionWeight = promptFor("Enter weight",autoValid).toLowerCase();
  let foundWeight =people.filter(function(potentialMatch){
    if (potentialMatch.questionWeight === questionWeight){
      return true;}
    else{
      return false;}
    });
    {
    return [foundWeight,whenComplete]
  }
}

