# IoT-EmbebedDevice-WebSocket
Prototipo IoT sobre BeagleBone Black con Python y Mqtt mas WebSocket JavaScript

Este es un prototipo de proyecto IoT que incorpora las tecnologías: Python, JavaScript, HTML, CSS, Protocolo de red MQTT; este ultimo montado sobre broker MQTT de HiveMQ que proporciona instancias gratuitas bajo ciertas restricciones y límites de solicitudes. El broker de HiveMQ nos permite seleccionar sobre que servidores montarlo, por ejemplo, AWS o AZURE.

## MQTT y HiveMQ

Los intermediarios de MQTT reciben mensajes publicados y envían el mensaje a los clientes de MQTT suscritos. Un mensaje MQTT contiene un tema de mensaje al que se suscriben los clientes MQTT (TOPICS) y los intermediarios MQTT utilizan estas listas de suscripción para determinar los clientes MQTT que recibirán el mensaje.
HiveMQ ofrece un corredor MQTT comercial y de código abierto.

## Configuración BROKER HiveMQ

El broker que usamos para este prototipo es en la nube por lo que no es necesario hacer configuraciones de servidor, para esto entramos al siguiente link: 

https://www.hivemq.com/downloads/

Aquí se ecuentran las dos opciones con las que podemos hacer uso del broker, en este caso el ejemplo es en la nube por lo que no mostramos como montarlo dentro de servidores propios. En caso de que desees usar el boker de esta manera debes descargar HiveMQ y seguir las indicaciones oficiales de configuración.

En este caso basta con loggearnos dentro de "HiveMQ CLOUD" y seguir las indicaciones para crear nuestra propia instancia dentro de sus servidores en donde debemos agregar un usuario y contraeña que serán nuestras credenciales para acceder al broker de las distintas maneras que neceitemos.

Dentro de los detalles de uestro CLUSTER encontramos información importante para su uso como: Hostname, Port(TLS), Port(Websocket + TLS). Estos datos los usamos dentro de nuestro código de Python y JavaScript respectivamente.

## Publicador con Python

Un publicador de mensajes MQTT es aquel que envía mensajes a nustro broker especificando el Topic sobre el cual será publicado el mensaje.

Dentro de los detalles del CLUSTER de HiveMQ se encuentra el apartado "GETTING STARTED" en donde se describen diferentes formas de hacer uso de MQTT sobre este broker.

#### Requisitos previos 

Para el manejo de MQTT con Python se usa la libreria de eclipse Paho. Aquí encontrarás más documentación: https://www.eclipse.org/paho/index.php?page=clients/python/index.php

Cree una nueva carpeta de proyecto llamada python-paho-hivemq-cloud y abra una consola dentro de ella.

###### Paho python se puede instalar a través del administrador de paquetes pip ejecutando el siguiente comando:
```
pip instalar paho-mqtt
o para Python 3
pip3 instalar paho-mqtt
```
## WebSocket-JavaScript

Es necesario mencionar que el broker de HiveMQ sólo permite conexiones seguras TLS por lo que es posile que encuentre ejemplos que no hacen uso de estas conexiones por lo que deberá buscar la documentación adecuada para esto. En el caso de este proyecto la documentación para conexiones seguras (TLS) con JavaScript la encontrará en https://www.hivemq.com/blog/mqtt-client-library-encyclopedia-paho-js/

Para el index web unicamente hacemos uso de las apis de JavaScript para MQTT haciendo una implementación de su script que es encuentra en https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.js su implementación se encuentra en el código iot-mqtt.js 


###### NOTA:
Para la implementació de JavaScript para el suscriptor en el websocket hay que tomar muy en cuenta y verificar que nuestro código haga la conexión TLS, de lo contrario no lograremos suscribirnos, aquí un ejemplo de como lograr la conexión segura con TLS:
```
client.connect({
	onSuccess: onConnect, 
	userName : "Your_Username",
	password : "Your_Password",
    useSSL: true
});
```
## Graficas

Para la gráficas se usa la libreria de AMCHARTS implementada con JavaScript, podemos encontrar la gráfica en https://www.amcharts.com/demos/animated-gauge/. Puedes acceder a la documentación de estos gráficos en https://www.amcharts.com/docs

## Pubicar con BeagleBone Black

Para publicar desde nuestra BeagleBone Black es necesario instalar la libreria PahoMQTT de eclipse, la podemos encuntrar en el siguiente link:
https://github.com/eclipse/paho.mqtt.python

Será imposible instalar la libreria con el manejador de paquetes de python desde nuestra BeagleBone, para solucionar esto deberás descargar el repositorio de la libreria directamente desde el link anterior. Una vez tengas el repositorio en tu dispositivo de embebidos, basta con hacer:

```
cd paho.mqtt.python
python setup.py install
```

Para ejecutar código de python basta con escribir en la terminar algo como esto:
```
C:\Users\Barto\Documents\LMSGI Barto\Python\pruebas>python prueba.py
```
## Google Maps API

Para comenzar a utilizar la api de Google Maps principalmente es necesario crear una cuenta de desarrollador en google y con esto conseguir nuestra "API KEY" que nos permitirá hacer uso de la API.

Para este proyecto de utilizó la documentación de:

*Maps JavaScript API
 -https://developers.google.com/maps/documentation/javascript
*Roads API 
 -https://developers.google.com/maps/documentation/roads

Puedes leer la documentación para agregar mayores funcionalidades a tu mapa.