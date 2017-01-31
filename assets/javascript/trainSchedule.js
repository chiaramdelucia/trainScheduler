var config = {
    apiKey: "AIzaSyAfm-Ir2GBSDxKvN6IZ9zs9pUaQCYN9svw",
    authDomain: "train-scheduler-32f77.firebaseapp.com",
    databaseURL: "https://train-scheduler-32f77.firebaseio.com",
    storageBucket: "train-scheduler-32f77.appspot.com",
    messagingSenderId: "616388559735"
};

firebase.initializeApp(config);

var database = firebase.database();

var connectionsRef = database.ref("/schedules");

$("#add-train-btn").on("click", function (){
	var name = $("#train-name-input").val().trim();
	var destination = $("#destination-input").val().trim();
	var firstTrain = $("#firstTrain-input").val().trim();
	var frequency = $("#frequency-input").val().trim();


	connectionsRef.push({
		name:name,
		destination:destination,
		firstTrain:firstTrain,
		frequency:frequency

	});

	return false;
});

connectionsRef.on("child_added", function(childSnapshot) {
	
	var trainName = childSnapshot.val().name;
	var trainDest = childSnapshot.val().destination;
	var trainFirst = childSnapshot.val().firstTrain;
	var trainFreq = childSnapshot.val().frequency;

	var firstTimeConverted = moment(trainFirst, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();

    var diffTime = moment().diff(moment(firstTimeConverted), 'minutes');
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trainFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));



	$("tbody").append("<tr>" + "<td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq 
		+ "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});









