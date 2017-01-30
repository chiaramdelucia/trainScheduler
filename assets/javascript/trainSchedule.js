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
	console.log(childSnapshot)
	var trainName = childSnapshot.val().name;
	var trainDest = childSnapshot.val().destination;
	var trainFirst = childSnapshot.val().firstTrain;
	var trainFreq = childSnapshot.val().frequency;

	$("tbody").append("<tr>" + 
		"<td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFirst +
		"</td><td>" + trainFreq + "</td></tr>");
});