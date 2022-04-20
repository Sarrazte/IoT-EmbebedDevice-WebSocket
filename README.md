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
pip install paho-mqtt
o para Python 3
pip3 install paho-mqtt
```
## WebSocket-JavaScript

Es necesario mencionar que el broker de HiveMQ sólo permite conexiones seguras TLS por lo que es posile que encuentre ejemplos que no hacen uso de estas conexiones por lo que deberá buscar la documentación adecuada para esto. En el caso de este proyecto la documentación para conexiones seguras (TLS) con JavaScript la encontrará en https://www.hivemq.com/blog/mqtt-client-library-encyclopedia-paho-js/

Para el index web unicamente hacemos uso de las apis de JavaScript para MQTT haciendo una implementación de su script que es encuentra en https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.js su implementación se encuentra en el código iot-mqtt.js 

#### Publicación desde WebSocket

Para publicar hacia nuestro Broker MQTT desde nuestro WebSocket basta con agregar las siguientes líeas de código dentro de nuestro scrip de JS con el que hacemos el manejo de MQTT

```
var message = new Paho.MQTT.Message(payload); //Declara un objeto de tipo mensaje que contiene el mensaje a eviar
    message.destinationName = "Your/Topic"; //Define el Topic sore el cual se hará la publicación del mensaje
    message.qos = 0; //Define la calidad del mensaje (1, 2 o 3)
```

#### Suscripcion al Broker Python

Para la suscripcion es un poco mas complicado, debido a que en este proyecto manejamos publicacion y suscripcion dentro del mismo código nos encontramos con el problema de que, cuando nos suscribimos a cierto topic nuestro programa estará escuchando y no podrá relizar ninguna otra tarea hasta que la suscripcion termine, es decir, mientras escuchamos al broker no podremos enviarle mensajes y de la misma forma al contrario.

Para solucionar esto, es necesario hacer el manejo de subprocesos (HILOS). Para ello debemos importar la las dependencas que python nos proporciona para poder realizar esta tarea.

```
import threading
```

Para comprender mejor el funcionamiento recomendamos uscar documentación sobre "Threadign", puedes encontrar algo en el siguiente link: https://realpython.com/intro-to-python-threading/

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

* Maps JavaScript API
 - https://developers.google.com/maps/documentation/javascript
* Roads API 
 - https://developers.google.com/maps/documentation/roads

Puedes leer la documentación para agregar mayores funcionalidades a tu mapa.

## Integrando Bootstrap

En este proyecto bootstrap está incluido como herramienta para el desarrollo de front-end en nuestro WebSocket.

Para hacer uso de esta herramienta existen diferentes maneras de implementarlo en nuestro proyecto, las cuales puedes consultar en: 	https://getbootstrap.com/docs/5.1/getting-started/download/ en donde encontraras la documentación pertinente para su uso.

En este caso y para este proyeccto utilizamos nmp como medio de implementación, basta con ejecutar el siguiente comando dentro de la carpeta de nuestro proyecto.

```
npm install bootstrap
```

## Uso de GPIO BeagleBone Black con Python

En este proyecto la GPIO se utiliza para poder encender el led enviando el mensaje de encendido desde nuestro WebSocket. El proyecto realiza esta tarea con ayuda de la libreria de "ADAFRUIT". Esta libreria es instalada directamente sobre nuestra placa de embebidos (BeagleBone Black) a traves de una conexión SSH.

Puedes encontrar una guía para la instalación de la libreria aquí: https://learn.adafruit.com/setting-up-io-python-library-on-beaglebone-black/installation

#### Diagrama de Pines BeagleBone Black

<img src="IoT-WEB/Imagenes/beaglebone-black-pinout.jpg" alt="Pinout"/>

#### Adafruit con Python 

Para las pruebas hemos comentado las líneas correspondientes al manejo de GPIO en el archivo mqtt_client.py ya que la libreria no se instaló en la computadora en donde se realizó el código y son reconocidas como errores por el interprete.

Una vez montado el programa en nuestra BeagleBone Black es necesario descomentar esas líneas para que funcione la GPIO. La importación de la libreria se hace de la siguiente manera:

```
import Adafruit_BBIO.GPIO as GPIO
```

Definimos el o los pines de la beaglebone a utilizar:

```
outPin  = "P9_12"
GPIO.setup(outPin, GPIO.OUT)
```

Creamos las funciones para ecender o apagar el pin correspondiente de la GPIO

```
def encenderLed():
    GPIO.output(outPin, GPIO.HIGH)

def apagarLed():
    GPIO.output(outPin, GPIO.LOW)
    GPIO.cleanup()
```
