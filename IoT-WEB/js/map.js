var apiKey = 'AIzaSyDqUlHzADhlgmGodUiDGlvSc0ZlPCkivUM';


// Initialize and add the map
function initMap() {

  //Ubicación inicial del mapa
  const pos = { lat: 20.683226, lng: -103.337436, };

  // Mapa centrado a la ubicacion inicial
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17,
    center: pos,
  });

  // Agrega marcador a posición inicial
  const marker = new google.maps.Marker({
    position: pos,
    map: map,
  });
}

//Función llamada desde el suscriptor MQTT JavaScript para dibujar marcadores en nuevas ubicaciones
function nuevoMarcador(puntoA,puntoB){
  console.log(puntoA);
  console.log(puntoB);

  var myLatlng = new google.maps.LatLng(puntoA,puntoB);
  
  var marker = new google.maps.Marker({
    position: myLatlng,
    draggable: false
  });

  marker.setMap(map);
}

