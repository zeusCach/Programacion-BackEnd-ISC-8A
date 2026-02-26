/*
REFLEXIÓN - EJERCICIO 1.3

1. Diferencia entre un módulo nativo y un módulo de NPM:

Un módulo nativo (por ejemplo, 'fs') forma parte de Node.js.
Está disponible sin necesidad de instalación adicional.

Un módulo de NPM (por ejemplo, 'sillyname') es un paquete externo
publicado en el registro de NPM. Para utilizarlo es necesario
instalarlo con `npm install nombre-paquete`. Esta acción crea la
carpeta node_modules y actualiza el archivo package.json.

En síntesis:
- Módulo nativo → incluido en Node.js.
- Módulo NPM → paquete externo que requiere instalación.


2. Diferencia entre 'require' (CommonJS) e 'import' (ES Modules):

'require' pertenece al sistema CommonJS.
- La carga se realiza en tiempo de ejecución.
- Puede utilizarse en cualquier parte del archivo.
- Es el sistema tradicional en Node.js.

'import' pertenece a ES Modules.
- La carga es estática y se analiza antes de ejecutar el código.
- Debe declararse en la parte superior del archivo.
- Es el estándar actual de JavaScript.

La diferencia principal es el momento en que se realiza la carga:
'require' lo hace durante la ejecución, mientras que 'import'
se procesa previamente.


3. Sobre el archivo package.json:

a) Es necesario compartir el archivo package.json porque contiene
las dependencias y la configuración del proyecto. No se recomienda
incluir la carpeta node_modules en el repositorio porque:
- Ocupa mucho espacio.
- Puede generarse nuevamente con npm.
- Aumenta innecesariamente el tamaño del proyecto.

b) Si se ejecuta `npm install` en una carpeta que contiene
únicamente package.json, NPM instalará automáticamente todas
las dependencias declaradas y recreará la carpeta node_modules,
restableciendo el entorno del proyecto.
*/