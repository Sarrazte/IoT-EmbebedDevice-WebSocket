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

var Velocidad = 0;
var LongitudArray = [];
var LatitudArray = [];
var longi = 0;
var lati = 0;
var coordenadas;
var Gasolina = 0;


// called when the client connects
function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Conectado MQTT-WebSocket");
    client.subscribe("IoT/Velocidad");
    client.subscribe("IoT/Gasolina");
    client.subscribe("IoT/Coord");
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}

// called when a message arrives
function onMessageArrived(message) {
    if (message.destinationName == 'IoT/Velocidad') {
        Velocidad = parseInt(message.payloadString);
    }else if (message.destinationName == 'IoT/Gasolina') {
        Gasolina = parseInt(message.payloadString);
    }else{
        coordenadas = message.payloadString;
        nuevoMarcador(coordenadas);
    }
}

//Control de Switch Publicador 
const toggle = document.querySelector('.toggle input')

toggle.addEventListener('click', () => {
    const onOff = toggle.parentNode.querySelector('.onoff')
    onOff.textContent = toggle.checked ? 'ON' : 'OFF'

    // Publicación de mensaje con switch "ENCENDER LUZ"
    var luz = onOff.textContent;
    console.log(luz);

    var message = new Paho.MQTT.Message(luz);
    message.destinationName = "IoT/Led";
    message.qos = 0;

    console.log(message);

    client.send(message);
})