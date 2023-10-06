const {app, connectDB} = require("./app");
const https=require("https")
const fs=require("fs");
const { builtinModules } = require("module");

const server = https.createServer({
    cert:fs.readFileSync("backend.cer"),
    key:fs.readFileSync("backend.key"),
},
app).listen(1337, ()=>{
    connectDB();
    console.log("Servidor escuchando en puerto 1337")
})

module.exports = server;