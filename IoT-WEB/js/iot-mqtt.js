// Create a client instance
var client = new Paho.MQTT.Client("9a3d19b43038457cab037734cb0f9e35.s1.eu.hivemq.cloud", 8884, "ARRAZATE");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({
	onSuccess: onConnect, 
	userName : "sarrazate",
	password : "Last990702",
    useSSL: true
});

Velocidad = 0;
Long = 0;
Lat = 0;


// called when the client connects
function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Conectado MQTT-WebSocket");
    client.subscribe("IoT/Velocidad");
    client.subscribe("IoT/Long");
    client.subscribe("IoT/Lat");
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}

// called when a message arrives
function onMessageArrived(message) {
    console.log(message.destinationName + ":" + message.payloadString);
    if (message.destinationName == 'IoT/Velocidad') {
        Velocidad = parseInt(message.payloadString);
    }
    if (message.destinationName == 'IoT/Long') {
        Long = parseFloat(message.payloadString);
    }
    if (message.destinationName == 'IoT/Lat') {
        Lat = parseFloat(message.payloadString);
    }
}