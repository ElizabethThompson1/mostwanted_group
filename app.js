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
      searchResults = searchByMultiCriteria(people);
      
       // else if (..... = "multiple"){ 
         // searchResults = searchByCriteria(people)

      break;
    default:
      app(people); // restart app
      break;
  }
//alert(searchResults)
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

  let personIndex = choosePerson(person)



  let displayOption = promptFor(
    "Found " +
      personIndex.firstName +
      " " +
      personIndex.lastName +
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
    let firstCriteria = promptFor("Enter gender, dob, height, weight, eyeColor, occupation, ", autoValid);
    let specificTrait =prompt("Enter the "+firstCriteria)
    let foundOnlyCriteria = getSingleCriteria(people, firstCriteria, specificTrait)
  // let foundOnlyCriteria = people.filter(function(potentialMatch){
  //   if(potentialMatch.firstCriteria === specificTrait){
  //       return true;}
  //   else {
  //       return false;}
  //   });
     alert(foundOnlyCriteria)
     return foundOnlyCriteria
    }
  else {
   return mainMenu(person, people)}
}


function getSingleCriteria(people, firstCriteria, specificTrait){
  let foundOnlyCriteria;
   if(firstCriteria == "gender"){
    foundOnlyCriteria = people.filter(function(potentialMatch){
      if(potentialMatch.gender === specificTrait){
          return true;}
      else {
          return false;}
      });
  }else if(firstCriteria == "dob"){
    foundOnlyCriteria = people.filter(function(potentialMatch){
      if(potentialMatch.dob === specificTrait){
          return true;}
      else {
          return false;}
      });
  }else if(firstCriteria == "height"){
    foundOnlyCriteria = people.filter(function(potentialMatch){
      if(potentialMatch.height === parseInt(specificTrait)){
          return true;}
      else {
          return false;}
      });
  }else if(firstCriteria == "weight"){
    foundOnlyCriteria = people.filter(function(potentialMatch){
      if(potentialMatch.weight === parseInt(specificTrait)){
          return true;}
      else {
          return false;}
      });
  }else if(firstCriteria == "eyeColor"){
    foundOnlyCriteria = people.filter(function(potentialMatch){
      if(potentialMatch.eyeColor === specificTrait){
          return true;}
      else {
          return false;}
      });
  }else if(firstCriteria == "occupation"){
    foundOnlyCriteria = people.filter(function(potentialMatch){
      if(potentialMatch.occupation === specificTrait){
          return true;}
      else {
          return false;}
      });
  }
return foundOnlyCriteria

}





function searchByMultiCriteria(people) {

  let searchResults;
  let newEyeColor=""
  let newGender=""
  let newHeight=""
  let newWeight=""
  let newDateOfBirth=""
  let singleMulti = promptFor(
    "Do you know multiple traits, Yes or No", yesNo).toLowerCase();
    if (singleMulti === "yes"){
      newEyeColor = cycleThroughTraits("Eye Color")
      newGender=cycleThroughTraits("gender")
      newHeight=parseInt(cycleThroughTraits("height"))
      newWeight=parseInt(cycleThroughTraits("weight"))
      newDateOfBirth=cycleThroughTraits("Date of birth")
     let ans= people.filter(function(potentialMatch){
        if(
    
          (potentialMatch.eyeColor===newEyeColor || newEyeColor== "")&&
        (potentialMatch.gender===newGender || newGender == "") &&
        (potentialMatch.height===newHeight || newHeight == "" || isNaN(newHeight)) &&
        (potentialMatch.weight===newWeight || newWeight == "" || isNaN(newWeight)) &&
        (potentialMatch.dateOfBirth===newDateOfBirth || newDateOfBirth =="")
        
        )
        return potentialMatch 
      })

      searchResults = ans
    //showUsPerson(newEyeColor,newGender,newHeight,newWeight,newDateOfBirth)}
    //need to be sent to main menu 
    }else {
    searchResults =searchByCriteria(people)


  // let singleMulti = promptFor(
  //   "Do you know multiple traits, Yes or No", yesNo).toLowerCase();
  //   if (singleMulti === "yes"){
  //     multiSearch(people)}
  //   else; {
  //   searchByCriteria(people)
  // }

}
return searchResults

}

function choosePerson(foundOnlyCriteria){
  let newDialog = dialog(foundOnlyCriteria)
  let response = prompt("Which person do you want to choose?\n"+newDialog)
  return foundOnlyCriteria[response-1]
  
}

function dialog(foundOnlyCriteria){
  let newDialog=""
  for(let i= 0; i<foundOnlyCriteria.length; i++){
    newDialog +=((i+1)+". "+foundOnlyCriteria[i].firstName+ " "+foundOnlyCriteria[i].lastName + "\n")
  }
  return newDialog
}

 
function cycleThroughTraits(traits){
 let newSearch=prompt("Enter "+ traits)
 return newSearch
}

//the final answers need to be sent to the main menu to be shot back at the do you know the name function
//for descendents it need to grab the answers form both multi or single critiea and all people that have similarities