const http = require("http"); // Importation du package http pour la créaion du serveur
const app = require("./app");

// Fonction permettant de renvoyer un port valide, que ce soit un Number ou un String
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// Le serveur écoute soit la variable d'environnement du port ou le port 3000
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// Fonction pour gèrer les erreurs
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// L'application est passée comme paramètre dans la fonction de création du serveur.
const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(port);
