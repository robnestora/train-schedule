


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCil9VGyXirqlvaPpFx-KXks6fTXNOi1lg",
    authDomain: "trains-995f2.firebaseapp.com",
    databaseURL: "https://trains-995f2.firebaseio.com",
    projectId: "trains-995f2",
    storageBucket: "trains-995f2.appspot.com",
    messagingSenderId: "908148107639"
  };
  firebase.initializeApp(config);

 
  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainFirst = moment($("#first-train-input").val().trim(), "HH:mm").format("HH:mm");
    var trainFrequency = $("#frequency-input").val().trim();

    console.log(trainFirst);
var train1st = moment(trainFirst).format("HH:mm");
console.log(trainFirst);
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      first: trainFirst,
      frequency: trainFrequency
    };

    database.ref().push(newTrain);
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.first);
    console.log(newTrain.frequency);

    alert(" New Train successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
  });

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFirst = childSnapshot.val().first;
    var trainFrequency= childSnapshot.val().frequency;
  
    // Employee Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainFirst);
    console.log(trainFrequency);
  
    // Prettify the 
    var trainFirstPretty = moment.unix(trainFirst).format("HH:mm");
  
  

    
        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(trainFirst, "HH:mm").subtract(1, "days");
        console.log(firstTimeConverted);
    
        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
    
        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
    
        // Time apart (remainder)
        var tRemainder = diffTime % trainFrequency;
        console.log(tRemainder);
    
        // Minutes Until Train
        var tMinutesTillTrain = trainFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    
        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm")); 

        var trainArrival = moment(nextTrain).format("HH:mm");
   
  
    // Add each train's data into the table
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainFirst);
    console.log(trainArrival);
    console.log(trainFrequency);
    console.log(nextTrain);
    console.log(tMinutesTillTrain);
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    trainFirst + "</td><td>" + trainFrequency + "</td><td>" + trainArrival + "</td><td>" + tMinutesTillTrain + "</td></tr>");
  });