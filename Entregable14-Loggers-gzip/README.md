# LOGGERS Y GZIP
## Consigna:
Incorporar al proyecto de servidor de trabajo la compresión gzip.
Verificar sobre la ruta /info con y sin compresión, la diferencia de cantidad de bytes devueltos en un caso y otro.
#### Resultado:
Sin usar compression
```
Comando:
node server.js 8081 FORK

En Inspeccionar -> Network:
11 requests | 462 kB transferred | 898 kB resources | Finish: 920 ms
```
Usando compression
```
Comando:
node server.js 8081 FORK

En Inspeccionar -> Network:
11 requests | 461 kB transferred | 898 kB resources | Finish: 1.10 s
```
Luego implementar loggueo (con alguna librería vista en clase) que registre lo siguiente:
- Ruta y método de todas las peticiones recibidas por el servidor (info)
- Ruta y método de las peticiones a rutas inexistentes en el servidor (warning)
- Errores lanzados por las apis de mensajes y productos, únicamente (error)
Considerar el siguiente criterio:
- Loggear todos los niveles a consola (info, warning y error)
- Registrar sólo los logs de warning a un archivo llamada warn.log
- Enviar sólo los logs de error a un archivo llamada error.log
#### Resultado:
```
COMANDO:
node server.js 8081 FORK
RESPONSE:
[2022-07-15T16:54:27.215] [INFO] infoCategory - EndPoint: / Method: GET
[2022-07-15T16:54:37.007] [INFO] infoCategory - EndPoint: /login Method: POST
[2022-07-15T16:54:37.393] [INFO] infoCategory - EndPoint: /main Method: GET
[2022-07-15T16:54:37.765] [ERROR] errorCategory - Error: ESTO ES UN ERROR
[2022-07-15T16:55:08.431] [INFO] infoCategory - EndPoint: / Method: GET
[2022-07-15T16:55:13.118] [WARN] warningsCategory - EndPonit: /qwe Method:GET
```

# ANÁLISIS COMPLETO DE PERFORMANCE
## Consigna: 
Luego, realizar el análisis completo de performance del servidor con el que venimos trabajando.
Vamos a trabajar sobre la ruta '/info', en modo fork, agregando ó extrayendo un console.log de la información colectada antes de devolverla al cliente. Además desactivaremos el child_process de la ruta '/randoms'
Para ambas condiciones (con o sin console.log) en la ruta '/info' OBTENER:
1. El perfilamiento del servidor, realizando el test con --prof de node.js. Analizar los resultados obtenidos luego de procesarlos con --prof-process.
Utilizaremos como test de carga Artillery en línea de comandos, emulando 50 conexiones concurrentes con 20 request por cada una. Extraer un reporte con los resultados en archivo de texto.
Luego utilizaremos Autocannon en línea de comandos, emulando 100 conexiones concurrentes realizadas en un tiempo de 20 segundos. Extraer un reporte con los resultados (puede ser un print screen de la consola)
2. El perfilamiento del servidor con el modo inspector de node.js --inspect. Revisar el tiempo de los procesos menos performantes sobre el archivo fuente de inspección.
3. El diagrama de flama con 0x, emulando la carga con Autocannon con los mismos parámetros anteriores.
Realizar un informe en formato pdf sobre las pruebas realizadas incluyendo los resultados de todos los test (texto e imágenes).
👉 Al final incluir la conclusión obtenida a partir del análisis de los datos.