# EJECUTAR SERVIDORES NODE
## Consigna:
Tomando con base el proyecto que vamos realizando, agregar un parámetro más en la ruta de comando que permita ejecutar al servidor en modo fork o cluster. Dicho parámetro será 'FORK' en el primer caso y 'CLUSTER' en el segundo, y de no pasarlo, el servidor iniciará en modo fork.
- Agregar en la vista info, el número de procesadores presentes en el servidor.
#### Comandos ejecutados:
Para modo FORK:
```
node server.js 8084 FORK
// RESPONSE:
Server HTTP escuchando en el puerto 8084 

http://localhost:8084/info // llamo al endponit de info
// RESPONSE:
Father PID 22016 
Child PID 2152
```
Para modo CLUSTER:
```
node server.js 8084 CLUSTER
// RESPONSE:
Primary PID 21652
Worker PID 1208 online
Worker PID 9492 online
Worker PID 17940 online
Worker PID 22232 online
Server HTTP escuchando en el puerto 8084
Server HTTP escuchando en el puerto 8084
Server HTTP escuchando en el puerto 8084
Server HTTP escuchando en el puerto 8084
```
- Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de
procesos tomados por node.
#### Comandos ejecutados:
Para modo FORK:
```
nodemon server.js 8084 FORK
// RESPONSE:
[nodemon] starting `node server.js 8084 FORK`
Server HTTP escuchando en el puerto 8084

http://localhost:8084/info // llamo al endponit de info
// RESPONSE:
Father PID 16368
Child PID 22088
```
Para modo CLUSTER:
```
nodemon server.js 8084 CLUSTER
// RESPONSE:
[nodemon] starting `node server.js 8084 CLUSTER`
Primary PID 2060
Worker PID 19020 online
Worker PID 22192 online
Worker PID 18620 online
Worker PID 19528 online
Server HTTP escuchando en el puerto 8084
Server HTTP escuchando en el puerto 8084
Server HTTP escuchando en el puerto 8084
Server HTTP escuchando en el puerto 8084
```
- Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su
correcta operación. Listar los procesos por Forever y por sistema operativo.
#### Comandos ejecutados:
```
(node:12124) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
```
- Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus
modos modo fork y cluster. Listar los procesos por PM2 y por sistema operativo.
#### Comandos ejecutados:
Para modo FORK:
```
pm2 start server.js --watch -- 8081 FORK
// RESPONSE
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 0  │ server             │ fork     │ 0    │ online    │ 23.4%    │ 32.7mb   │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
```
Para modo CLUSTER:
```
pm2 start server.js --watch -i 4 -- 8081
// RESPONSE
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 0  │ server             │ cluster  │ 0    │ online    │ 56.4%    │ 72.0mb   │
│ 1  │ server             │ cluster  │ 0    │ online    │ 53.1%    │ 70.4mb   │
│ 2  │ server             │ cluster  │ 0    │ online    │ 54.7%    │ 62.3mb   │
│ 3  │ server             │ cluster  │ 0    │ online    │ 57.8%    │ 54.2mb   │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
```
- Tanto en Forever como en PM2 permitir el modo escucha, para que la actualización del
código del servidor se vea reflejado inmediatamente en todos los procesos.
- Hacer pruebas de finalización de procesos fork y cluster en los casos que corresponda.
#### Comandos ejecutados:
Para PM2:
```
pm2 delete all
// RESPONSE
[PM2] Applying action deleteProcessId on app [all](ids: [ 0, 1, 2, 3 ])
[PM2] [server](0) ✓
[PM2] [server](1) ✓
[PM2] [server](2) ✓
[PM2] [server](3) ✓
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
```

# SERVIDOR NGINX
## Consigna:
Configurar Nginx para balancear cargas de nuestro servidor de la siguiente manera:
Redirigir todas las consultas a /api/randoms a un cluster de servidores escuchando en el puerto 8081. El cluster será creado desde node utilizando el módulo nativo cluster.
El resto de las consultas, redirigirlas a un servidor individual escuchando en el puerto 8080.
Verificar que todo funcione correctamente.
Luego, modificar la configuración para que todas las consultas a /api/randoms sean redirigidas a
un cluster de servidores gestionado desde nginx, repartiéndolas equitativamente entre 4
instancias escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente.

## Aspectos a incluir en el entregable:
Incluir el archivo de configuración de nginx junto con el proyecto.
Incluir también un pequeño documento en donde se detallen los comandos que deben
ejecutarse por línea de comandos y los argumentos que deben enviarse para levantar todas las
instancias de servidores de modo que soporten la configuración detallada en los puntos
anteriores.
Ejemplo:
- pm2 start ./miservidor.js -- --port=8080 --modo=fork
- pm2 start ./miservidor.js -- --port=8081 --modo=cluster
- pm2 start ./miservidor.js -- --port=8082 --modo=fork
- ...