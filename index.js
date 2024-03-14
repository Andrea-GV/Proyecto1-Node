// 1.IMPORTS
// 1.1 librerias npm
const express = require("express");
const cors = require("cors");
// 1.2 documentos del proyecto
const { connectMongo } = require("./src/utils/db");

// 1.3 las rutas:
const movieRouter = require("./src/api/routes/movie.routes");
// const miSeed = require("./src/seeds/movie.seeds");
const { setError } = require("./src/utils/error.util");

// 2. CONFIG
// 2.1 configuración de la app
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // convierte palabras, tiles, espacios, simbolos... en un lenguaje q entienda el navegador. Recomendable usar
connectMongo();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
// 2.3 cors  // CORS es una librería que filtra los datos   

app.use(cors()); // no hay restricciones
/*
 * La linea inferior sería un ejemplo de uso de cors, en el que solo
 * permitimos peticiones de esas dos direcciones IP
 * Este concepto se conoce como whitelisting
 */

// ***  LA SEMILLA LA HE COMENTADO DESPUÉS DE SU PRIMER USO, ya que me daba errores en Postman  ***
// app.use(cors({
//   origin: ['http://localhost:3000', 'http://localhost:4200'],
//   credentials: true,
// }));

// 3. ENDPOINTS

// 3.1 endpoint para test básico
app.get("/", (req, res) => {
  res.send("Server is up");
});
// 3.2 las rutas de mis datos
//app.use("/user", UserRoutes);
app.use("/movie", movieRouter);

// 3.3  cualquier ruta que no haya definido pasa por aquí
// app.use("*", (req, res, next) => next(setError(404, "The route you requested is not part of this API")));
// si no se especifica el return, será implícito

// 4. MANEJO DE ERRORES
app.use((error, req, res, next) => res.status(error.status || 500).json(error.message || "Unexpected error"));


// 4. MANEJO DE ERRORES
app.use((error, req, res, next) => res.status(error.status || 500).json(error.message || "Unexpected error"));

app.use((err, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

// 5. "ARRANCAR" EL SERVIDOR
app.listen(PORT, () => {
  console.log(`Server listening on port : ${PORT}`);
});
// app.get('/semilla', (req, res) => {
//   res.send(miSeed);
// });
