var apiKey = 'AIzaSyDqUlHzADhlgmGodUiDGlvSc0ZlPCkivUM';
var map;
var marker;
const pos = { lat: 20.683226, lng: -103.337436, }; //Coordenada inicial
var viejaCoordenada = [pos]; //Inicializa el arreglo con la primer coordenada de todas
var newCoordenada; //Variable que manejará nuestras nuevas coordenadas
const image = "https://img.icons8.com/ios-filled/50/000000/truck.png"; //Icono del Marcador

// Inicializa y agrega el mapa
function initMap() {

  // Mapa centrado a la ubicacion inicial
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17,
    center: pos,
  });

  // Agrega marcador a posición inicial
  marker = new google.maps.Marker({
    position: pos,
    map: map,
    icon:image,
  });
}

//Función llamada desde el suscriptor MQTT JavaScript para dibujar marcadores en nuevas ubicaciones
function nuevoMarcador(coordenadas){
  //Elimina el marcador anterior
  if (marker != null) {
    marker.setMap(null);
  }


  newCoordenada = JSON.parse(coordenadas);
  
  //console.log(newCoordenada);

  var myLatlng = new google.maps.LatLng(newCoordenada);

  map.panTo(myLatlng);

  //DESCOMENTAR EN CASO DE QUERER QUE SE MUESTREN MARCADORES EN CADA NUEVA POSICIÓN
  marker = new google.maps.Marker({
    position: myLatlng,
    draggable: false,
    map:map,
    icon:image,
  });

  var options = {
    map:map,
    position:myLatlng,
  }

  map.setCenter(options.position);
  dibujarLineas(); 
}

function dibujarLineas(){

  var oldCoord = viejaCoordenada.pop();
  //Se imprimen las coordenadas utilizadas como puntos de inflexión para las polilíneas 
  console.log("La nueva coordenada es:");
  console.log(newCoordenada);
  console.log("La vieja coordenada es:");
  console.log(oldCoord);

  //Creamos los dos puntos de inflexión de las líeas
  const puntos = [
    newCoordenada,
    oldCoord,
  ];

  //Se dibuja la líea entre las dos ultimas coordenadas
  const nuevaLinea = new google.maps.Polyline({
    path: puntos,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  nuevaLinea.setMap(map)

  //Se agrega la nueva coordenada al arreglo "VIEJACOORDENADA", de este modo siempre tendremos actualizada nuestro punto de inicio
  //de la polilínea
  viejaCoordenada.push(newCoordenada);
}
