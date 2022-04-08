import time
import paho.mqtt.client as paho
from paho import mqtt
import random
import time
import json
import threading

#Inicializamos valores para la simulacion de los sensores
velocidades = 0
long = -103.337436 
latid = 20.683226
movimiento = 0.000700 

#Funcion que se ejecuta cuando se logra la conexion
def on_connect(client, userdata, flags, rc, properties=None): #Funcion ejecutada por paho cuando se conecte al Broker
    print("CONNACK received with code %s." % rc)
    client.subscribe("IoT/Led", qos=1)
    print('Hilo: ', threading.current_thread().ident)

#Funcion que se ejecuta cuando se recibe un mensaje del Broker
def on_message(client, userdata, msg): #Funcion ejecutada cuando llega un mensaje al Broker
    if msg.payload == b'ON':
        encenderLed()
    else:
        apagarLed()

#Funcion que se ejecuta cuando se consigue la conexion al broker MQTT
def on_subscribe(client, userdata, mid, granted_qos, properties=None):
    print("Suscripcion Exitosa")

#Se crea la instancia del cliente MQTT y se mencionan las funciones que se ejecutaran al utilizar metodos del cliente
client = paho.Client(client_id="sebastian", userdata=None, protocol=paho.MQTTv5) #Instancia del cliente MQTT
client.on_connect = on_connect
client.on_message = on_message
client.on_subscribe = on_subscribe

#Funcion inicializada por el subproceso "hiloConexion"
def conexion():
    client.tls_set(tls_version=mqtt.client.ssl.PROTOCOL_TLS) # enable TLS for secure connection
    client.username_pw_set("sarrazate", "Last990702") # set username and password
    client.connect("9a3d19b43038457cab037734cb0f9e35.s1.eu.hivemq.cloud", 8883) # connect to HiveMQ Cloud on port 8883 (default for MQTT)

#Creamos hilo manejador de conexion y suscripcion
hiloConexion = threading.Thread(name="hiloConexion", target=conexion)
hiloConexion.start()

def publicarDatos(coordenadasToJSON, velocidades):
    #Publicamos los mensajes
    client.publish("IoT/Velocidad", payload=velocidades, qos=1)
    client.publish("IoT/Coord", payload=coordenadasToJSON, qos=1)
    print(coordenadasToJSON)
    time.sleep(3)

def encenderLed():
    print("LED ENCENDIDO")

def apagarLed():
    print("LED APAGADO")

while True:
    velocidades = random.randrange(0,200,1)
    long = long - movimiento
    latid = latid + movimiento
    coordenadasNuevas = {'lat':latid, 'lng':long}
    coordenadasToJSON = json.dumps(coordenadasNuevas)
    publicarDatos(coordenadasToJSON, velocidades)
    #Creamos hilo manejador de publicaciones
    #hiloPublicador = threading.Thread(name="hiloPublicador", target=publicarDatos, args=(coordenadasToJSON, velocidades))
    #hiloPublicador.start()
    #hiloPublicador.join()
    client.loop()
