# SuperTest

Proyecto de backend entrega con tests

El proyecto esta compuesto por las siguientes partes:
Carpeta src, la cual a su vez reune dentro suyo a:

1. Config, que guarda dentro suyo a config.js (donde se aloja dotenv y al environment), a los env de production, default, test y development, y tambien a logger.js.
2. Controllers, figuran aqui todos los controladores que trabajaran con los servicios (auth, cart, products, user, messages, reseteo de contraseña, sms y ticket).
3. Dao, gracias a esta gran carpeta podemos ver organizado todo lo siguiente:
A. Carpeta dtos donde se aloja a los archivos dto.factory, user.dto.js y user.response.js.
B. Carpeta fs donde estan los archivos file sistem.
C. Carpeta models, hay aqui todos los modelos necesarios para poder trabajar tanto con los usuarios como los mensajes, los carritos, los productos y los tickets.
D. Junto a estas carpetas tambien encontraremos en dao a todos los managers para trabajar con los modelos nombrados anteriormente y un archivo dbConfig.js donde esta la coneccion a MongoDB.
4. Carpeta Docs quien dentro suyo contiene a products.yaml quien trabaja con swagger tanto para los productos como para los carritos.
5. Memory quien contiene al archivo contactMemo.js.
6. MidsIngreso, quien alberga a bcrypt.js(proteccion de informacion), github.js(acceso con esta plataforma), passAuth.js(autorizacion para ingreso) y passport.js(trabaja con passport).
7. Carpeta Mocking quien concentra dentro suyo a todos los archivos necesesarios para poder realizar el mock de productos (mock.controller.js, mock.router.js y utils.mocking.js).
8. Carpeta Mongo donde se encuentra el archivo de contacto de mongo.
9. Public, la cual es otra gran carpeta que contiene a:
A. Carpeta css la cual contiene los estilos del proyecto.
B. Carpeta images solo contiene el logo del cliente.
C. Carpeta js, sostiene dentro de si a login.js y a restore js.
D. Por ultimo y no en importacia tambien aqui encontraremos a los archivos: cart.js, chat.js, realTimeProducts.js, register.js  y user.js.
10. Carpeta repository quien agrupa en su interior a los archivos contacts.repository.js, generic.repository e index.js.
11. Routes, por aqui pasaran todas las rutas para unir a la app con las vistas a los diferentes sectores de la pagina.
12. Services, quien aloja a todos los servicios que trabajaran con los controladores.
13. Carpeta test: queda alojada en ella los supertest de admin y de usuario.

Carpeta view donde estan las vistas de la pagina, la cual contiene a layouts(donde encontraremos a main.handlebars) y tambien a las vistas de cart, products, product detail, login, register, restore, profile, chat y real time products

Env., quien trabaja reservando las variables para dotenv.

App.js, donde confluyen todos para darle vida a la pagina, trabaja con express, handlebarss, socket.io, mongoose, morgan, cookie-parser, swagger y los enrutadores.

Errors.log a donde iran los errores de logger.

_Utils js, donde se encuentra al _dirname.
