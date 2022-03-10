var apiKey = 'AIzaSyDqUlHzADhlgmGodUiDGlvSc0ZlPCkivUM';
var map;
var marker;

// Initialize and add the map
function initMap() {

  //Ubicación inicial del mapa
  const pos = { lat: 20.683226, lng: -103.337436, };

  // Mapa centrado a la ubicacion inicial
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17,
    center: pos,
  });

  // Agrega marcador a posición inicial
  const marker = new google.maps.Marker({
    position: pos,
    map: map,
    animation: google.maps.Animation.Drop,
  });
}

//Función llamada desde el suscriptor MQTT JavaScript para dibujar marcadores en nuevas ubicaciones
function nuevoMarcador(coordenadas){
  var newCoordenada = JSON.parse(coordenadas);
  
  console.log(newCoordenada);
  //console.log(latitud);
  //console.log(longitud);

  var myLatlng = new google.maps.LatLng(newCoordenada);

  map.panTo(myLatlng);
  
  var marker = new google.maps.Marker({
    position: myLatlng,
    draggable: false,
    map:map,
  });

  var options = {
    map:map,
    position:myLatlng,
  }

  map.setCenter(options.position);
}

