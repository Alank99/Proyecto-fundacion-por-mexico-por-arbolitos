# Manual de Instalación

### Instalacion del proyecto:
Mediante la liga https://github.com/Alank99/hackerlocos/tree/main acceder al repositorio.

![Parte de git](./Entregables/Imagenes/Captura%20de%20pantalla%202023-10-13%20135150.png)

Una vez dentro hacer clic en el botón "<> Code":  

![Parte de git](./Entregables/Imagenes/imagen2.png)

Se desplegaran diferentes opciones. Seleccione la opcion "download ZIP"

![Parte de git](./Entregables/Imagenes/imagen3.png) 

Una vez descargado se debe de descomprimir el zip dando clic derecho en el y seleccionando la opción "Extraer todo...". 

Una vez descomprimido continuar con la creacion del servidor de MongoDB

### Creación del servidor de MongoDB
    Iniciar una conexión a mongodb://localhost:27017/
    Crear una base de datos llamada "PorMexico"
    Crear una collección llamada "Usuarios"}


#### Pegar la siguiente información a la nueva collección
Una vez seleccionado la colección de usuarios, darle click en la parte de "ADD DATA" y luego en "insert document" copiary pegar lo siguiente

    ,
    "usuario": "root",
    "password": "$2b$10$Wm1gWY2Sgs0SGXAd2m.f7up8r/6cFQ0DSDQ0PcplzhhKKp6rl5TJm",
    "fullName": "root",
    "nivel": "ejecutivo",
    "region": "cdmx",
    "id": 1
pegarlo en la parte de abajo del los segundos corchetes de _id
    

  *La contraseña del usuario es:* root

### Instalación 

    cd backend
    npm install package.json
    cd ..
    cd frontend
    npm install package.json
    cd ..

### Ejecución

    cd backend
    npm start
    cd ..
    cd frontend
    npm start
    cd ..

Una vez que tanto el servidor del backend como el de frontend están corriendo la página se puede abrir utilizando la siguiente liga:

http://localhost:3000/#/login
