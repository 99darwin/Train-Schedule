// Initialize Firebase
var config = {
  apiKey: "AIzaSyBXGpjcqJVy5TkdxSXYhAIKijZZDZqAtZI",
  authDomain: "train-scheduler-82ac8.firebaseapp.com",
  databaseURL: "https://train-scheduler-82ac8.firebaseio.com",
  projectId: "train-scheduler-82ac8",
  storageBucket: "",
  messagingSenderId: "552415230112"
};

firebase.initializeApp(config);

var database = firebase.database();

$('#addTrain').on('click', function(event){
  event.preventDefault();

  var name = $('#nameInput').val().trim();
  var destination = $('#destInput').val().trim();
  var firstTime = $('#firstTimeInput').val().trim();
  var frequency = $('#frequencyInput').val().trim();

  $('#nameInput').val('');
  $('#destInput').val('');
  $('#firstTimeInput').val('');
  $('#frequencyInput').val('');
  
  database.ref().push({
    name: name,
    destination: destination,
    firstTime: firstTime,
    frequency: frequency

  });
});

database.ref().on('child_added', function(childSnapshot, prevChildKey){
  // --- Define variables ---
  // Train name
  var name = childSnapshot.val().name;
  // Destination
  var destination = childSnapshot.val().destination;
  // Frequency of arrivals
  var frequency = childSnapshot.val().frequency;
  // First arrival time
  var firstTime = childSnapshot.val().firstTime;
  var firstTimeFormat = moment(firstTime, 'hh:mm');

  // Find current time
  var cur = moment();
  
  // Difference between current time and first arrival time
  var diffTime = moment().diff(moment(firstTimeFormat), 'minutes');
  console.log(diffTime);
  
  // Time apart
  var apart = diffTime % frequency;
  console.log(apart);
  
  // Minutes until train arrives
  var tillTrain = frequency - apart;
  console.log(tillTrain);

  // Next arrival
  var arrival = moment().add(tillTrain, 'minutes');
  var arrivalFormat = moment(arrival).format('hh:mm');

  

  // Display info in table on page
  $('#trainInfo').append(
    '<tr>' + '<td id="name">' + name + 
    '<td id="destination">' + destination + 
    '<td id="frequency">' + frequency + 
    '<td id="arrival">' + arrivalFormat + 
    '<td id="away">' + tillTrain);

});
