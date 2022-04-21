    
    ENTREGABLE NUMERO 5 - PLANTILLAS

    Estudiante: Gonzalo Leonel Gramajo

Formato: link a un repositorio en Github con los tres proyectos en
carpetas separadas. No incluir los node_modules.

>> Consigna:
1) Utilizando la misma API de productos del proyecto entregable de la clase
anterior, construir un web server (no REST) que incorpore:
    a) Un formulario de carga de productos en la ruta raíz (conﬁgurar la ruta
    '/productos' para recibir el POST, y redirigir al mismo formulario).
    b) Una vista de los productos cargados (utilizando plantillas de
    handlebars) en la ruta GET '/productos'.
    c) Ambas páginas contarán con un botón que redirija a la otra.
2) Manteniendo la misma funcionalidad reemplazar el motor de plantillas
handlebars por pug.
3) Manteniendo la misma funcionalidad reemplazar el motor de plantillas
handlebars por ejs.
4) Por escrito, indicar cuál de los tres motores de plantillas preﬁeres para tu
proyecto y por qué.

>> Aspectos a incluir en el entregable:
- Realizar las plantillas correspondientes que permitan recorrer el array de productos y
representarlo en forma de tabla dinámica, siendo sus cabeceras el nombre de producto,
el precio y su foto (la foto se mostrará como un imágen en la tabla)
- En el caso de no encontrarse datos, mostrar el mensaje: 'No hay productos'.

>> Sugerencias:
- Utilizar iconﬁnder (https://www.iconﬁnder.com/free_icons) para obtener la url de las
imágenes de los productos (click derecho sobre la imagen -> copiar dirección de la
imagen)

>> Opcional:
● Utilizar bootstrap para maquetar la vista creada por dicho motor de plantillas y el
formulario de ingreso de productos.

DUDAS SURGIDAS DURANTE LA CODIFICACIÓN:

Querida Pame:
    ¿Como se hace para linkear el css usando handlebars? como no leía mi style css, usé una etiqueta style dentro del indes.hbs