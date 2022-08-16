# Consignas
Modificar la capa de persistencia incorporando los conceptos de Factory, DAO, y DTO.
2. Los DAOs deben presentar la misma interfaz hacia la lógica de negocio de nuestro servidor.
3. El DAO seleccionado (por un parámetro en línea de comandos como lo hicimos anteriormente) será  devuelto por una Factory para que la capa de negocio opere con él.
4. Cada uno de estos casos de persistencia, deberán ser implementados usando el patrón singleton que  impida crear nuevas instancias de estos mecanismos de acceso a los datos.
5. Comprobar que si llamo a la factory dos veces, con una misma opción elegida, devuelva la misma instancia.
6. Implementar el patrón Repository para la persistencia de productos y mensajes.